//
// Created by m on 10/26/15.
//

#pragma once
#include <iostream>
#include <math.h>


#define MAX_CHANNELS 63
#define ABS_THRES    -70            ///< silence gate: we discard anything below this absolute (LUFS) threshold
#define ABS_UP_THRES  10            ///< upper loud limit to consider (ABS_THRES being the minimum)
#define HIST_GRAIN   100            ///< defines histogram precision
#define HIST_SIZE  ((ABS_UP_THRES - ABS_THRES) * HIST_GRAIN + 1)

/**
 * A histogram is an array of HIST_SIZE hist_entry storing all the energies
 * recorded (with an accuracy of 1/HIST_GRAIN) of the loudnesses from ABS_THRES
 * (at 0) to ABS_UP_THRES (at HIST_SIZE-1).
 * This fixed-size system avoids the need of a list of energies growing
 * infinitely over the time and is thus more scalable.
 */
struct hist_entry {
    int count;                      ///< how many times the corresponding value occurred
    double energy;                  ///< E = 10^((L + 0.691) / 10)
    double loudness;                ///< L = -0.691 + 10 * log10(E)
};

struct integrator {
    double *cache[MAX_CHANNELS];    ///< window of filtered samples (N ms)
    int cache_pos;                  ///< focus on the last added bin in the cache array
    double sum[MAX_CHANNELS];       ///< sum of the last N ms filtered samples (cache content)
    int filled;                     ///< 1 if the cache is completely filled, 0 otherwise
    double rel_threshold;           ///< relative threshold
    double sum_kept_powers;         ///< sum of the powers (weighted sums) above absolute threshold
    int nb_kept_powers;             ///< number of sum above absolute threshold
    struct hist_entry *histogram;   ///< histogram of the powers, used to compute LRA and I
};

struct rect {
    int x, y, w, h;
};

typedef struct {

    /* peak metering */
    int peak_mode;                  ///< enabled peak modes
    double *true_peaks;             ///< true peaks per channel
    double *sample_peaks;           ///< sample peaks per channel
    double *true_peaks_per_frame;   ///< true peaks in a frame per channel
#if CONFIG_SWRESAMPLE
    SwrContext *swr_ctx;            ///< over-sampling context for true peak metering
    double *swr_buf;                ///< resampled audio data for true peak metering
    int swr_linesize;
#endif

    /* video  */
    int do_video;                   ///< 1 if video output enabled, 0 otherwise
    int w, h;                       ///< size of the video output
    struct rect text;               ///< rectangle for the LU legend on the left
    struct rect graph;              ///< rectangle for the main graph in the center
    struct rect gauge;              ///< rectangle for the gauge on the right
    int meter;                      ///< select a EBU mode between +9 and +18
    int scale_range;                ///< the range of LU values according to the meter
    int y_zero_lu;                  ///< the y value (pixel position) for 0 LU
    int *y_line_ref;                ///< y reference values for drawing the LU lines in the graph and the gauge

    /* audio */
    int nb_channels;                ///< number of channels in the input
    double *ch_weighting;           ///< channel weighting mapping
    int sample_count;               ///< sample count used for refresh frequency, reset at refresh

    /* Filter caches.
     * The mult by 3 in the following is for X[i], X[i-1] and X[i-2] */
    double x[MAX_CHANNELS * 3];     ///< 3 input samples cache for each channel
    double y[MAX_CHANNELS * 3];     ///< 3 pre-filter samples cache for each channel
    double z[MAX_CHANNELS * 3];     ///< 3 RLB-filter samples cache for each channel

#define I400_BINS  (48000 * 4 / 10)
#define I3000_BINS (48000 * 3)
    struct integrator i400;         ///< 400ms integrator, used for Momentary loudness  (M), and Integrated loudness (I)
    struct integrator i3000;        ///<    3s integrator, used for Short term loudness (S), and Loudness Range      (LRA)

    /* I and LRA specific */
    double integrated_loudness;     ///< integrated loudness in LUFS (I)
    double loudness_range;          ///< loudness range in LU (LRA)
    double lra_low, lra_high;       ///< low and high LRA values

    /* misc */
    int loglevel;                   ///< log level for frame logging
    int metadata;                   ///< whether or not to inject loudness results in frames
} EBUR128Context;

enum {
    PEAK_MODE_NONE = 0,
    PEAK_MODE_SAMPLES_PEAKS = 1 << 1,
    PEAK_MODE_TRUE_PEAKS = 1 << 2,
};


#define ENERGY(loudness) (pow(10, ((loudness) + 0.691) / 10.))
#define LOUDNESS(energy) (-0.691 + 10 * log10(energy))
#define DBFS(energy) (20 * log10(energy))

static struct hist_entry *get_histogram(void) {
    int i;
    struct hist_entry *h = (hist_entry *) calloc(HIST_SIZE, sizeof(*h));

    if (!h)
        return NULL;
    for (i = 0; i < HIST_SIZE; i++) {
        h[i].loudness = i / (double) HIST_GRAIN + ABS_THRES;
        h[i].energy = ENERGY(h[i].loudness);
    }
    return h;
}


#define HIST_POS(power) (int)(((power) - ABS_THRES) * HIST_GRAIN)

static inline const int av_clip(int a, int amin, int amax) {
    if (a < amin) return amin;
    else if (a > amax) return amax;
    else return a;
}


/* loudness and power should be set such as loudness = -0.691 +
 * 10*log10(power), we just avoid doing that calculus two times */
static int gate_update(struct integrator *integ, double power,
                       double loudness, int gate_thres) {


    int ipower;
    double relative_threshold;
    int gate_hist_pos;

    /* update powers histograms by incrementing current power count */
    ipower = av_clip(HIST_POS(loudness), 0, HIST_SIZE - 1);
    integ->histogram[ipower].count++;

    /* compute relative threshold and get its position in the histogram */
    integ->sum_kept_powers += power;
    integ->nb_kept_powers++;
    relative_threshold = integ->sum_kept_powers / integ->nb_kept_powers;
    if (!relative_threshold)
        relative_threshold = 1e-12;
    integ->rel_threshold = LOUDNESS(relative_threshold) + gate_thres;
    gate_hist_pos = av_clip(HIST_POS(integ->rel_threshold), 0, HIST_SIZE - 1);

    return gate_hist_pos;
}

static int filter_frame(EBUR128Context *ebur128, double loudness_400, double loudness_3000) {

    int i = 0;


    double power_400 = 1e-12, power_3000 = 1e-12;


    /* Integrated loudness */
#define I_GATE_THRES -10  // initially defined to -8 LU in the first EBU standard

    if (loudness_400 >= ABS_THRES) {
        double integrated_sum = 0;
        int nb_integrated = 0;
        int gate_hist_pos = gate_update(&ebur128->i400, power_400,
                                        loudness_400, I_GATE_THRES);

        /* compute integrated loudness by summing the histogram values
         * above the relative threshold */
        for (i = gate_hist_pos; i < HIST_SIZE; i++) {
            const int nb_v = ebur128->i400.histogram[i].count;
            nb_integrated += nb_v;
            integrated_sum += nb_v * ebur128->i400.histogram[i].energy;
        }
        if (nb_integrated)
            ebur128->integrated_loudness = LOUDNESS(integrated_sum / nb_integrated);
    }

    /* LRA */
#define LRA_GATE_THRES -20
#define LRA_LOWER_PRC   10
#define LRA_HIGHER_PRC  95

    /* XXX: example code in EBU 3342 is ">=" but formula in BS.1770
     * specs is ">" */
    if (loudness_3000 >= ABS_THRES) {
        int nb_powers = 0;
        int gate_hist_pos = gate_update(&ebur128->i3000, power_3000,
                                        loudness_3000, LRA_GATE_THRES);

        for (i = gate_hist_pos; i < HIST_SIZE; i++)
            nb_powers += ebur128->i3000.histogram[i].count;
        if (nb_powers) {
            int n, nb_pow;

            /* get lower loudness to consider */
            n = 0;
            nb_pow = LRA_LOWER_PRC * nb_powers / 100. + 0.5;
            for (i = gate_hist_pos; i < HIST_SIZE; i++) {
                n += ebur128->i3000.histogram[i].count;
                if (n >= nb_pow) {
                    ebur128->lra_low = ebur128->i3000.histogram[i].loudness;
                    break;
                }
            }

            /* get higher loudness to consider */
            n = nb_powers;
            nb_pow = LRA_HIGHER_PRC * nb_powers / 100. + 0.5;
            for (i = HIST_SIZE - 1; i >= 0; i--) {
                n -= ebur128->i3000.histogram[i].count;
                if (n < nb_pow) {
                    ebur128->lra_high = ebur128->i3000.histogram[i].loudness;
                    break;
                }
            }

            // XXX: show low & high on the graph?
            ebur128->loudness_range = ebur128->lra_high - ebur128->lra_low;
        }

    }

    return 0;
}
