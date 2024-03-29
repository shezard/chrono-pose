import { browser } from '$app/environment';

export function animate(cb: () => void) {
    if (!document.startViewTransition) {
        cb();
        return;
    }
    document.startViewTransition(cb);
}

function makeRaf() {
    // eslint-disable-next-line
    let raf = (fn: FrameRequestCallback) => {
        return 0;
    };

    if (browser) {
        raf = requestAnimationFrame;
    }

    return raf;
}

function makeCaf() {
    // eslint-disable-next-line
    let caf = (number: number) => {
        // no-op
    };

    if (browser) {
        caf = cancelAnimationFrame;
    }

    return caf;
}

export const raf = makeRaf();
export const caf = makeCaf();
