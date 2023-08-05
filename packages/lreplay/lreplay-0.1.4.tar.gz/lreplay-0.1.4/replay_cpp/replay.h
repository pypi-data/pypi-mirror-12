//
// Created by m on 10/26/15.
//

#pragma once

#include "defines.h"

class Replay {
protected:
    EBUR128Context ctx;
    bool _verbose;

public:

    Replay(bool verbose = false) {

        _verbose = verbose;
        memset(&ctx, 0, sizeof ctx);

        ctx.i400.histogram = get_histogram();
        ctx.i3000.histogram = get_histogram();
        ctx.integrated_loudness = ABS_THRES;
        ctx.loudness_range = 0;

        if (_verbose) {
            printf("Replay()\n");
        }
    }

    virtual ~Replay() {
        free(ctx.i400.histogram);
        free(ctx.i3000.histogram);
        if (_verbose) {
            printf("~Replay()\n");
        }
    }

    void add(double loudness_400, double loudness_3000) {
        filter_frame(&ctx, loudness_400, loudness_3000);

        if (_verbose) {
            dump();
        }
    }

    double get_loudness_range() const {
        return ctx.loudness_range;
    }

    double get_integrated_loudness() const {
        return ctx.integrated_loudness;
    }

    //helper
    void dump() {
        printf("integrated_loudness=%.2f | loudness_range=%.2f\n", get_integrated_loudness(), get_loudness_range());
    }


};

