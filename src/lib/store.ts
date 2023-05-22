import { writable, readable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { data } from './data';

let raf = (fn: FrameRequestCallback) => {
    return 0;
};

let caf = (number: number) => {
    // no-op
};

if (browser) {
    raf = requestAnimationFrame;
    caf = cancelAnimationFrame;
}

const createApplicationState = function () {
    const { subscribe, set } = writable('paused');

    return {
        subscribe,
        update: (applicationState: 'started' | 'paused' | 'clear') => {
            set(applicationState);
        }
    };
};

export const applicationState = createApplicationState();

const currentTime = readable(0, (set) => {
    let rafId: number;

    const update = () => {
        set(+new Date());
        rafId = raf(update);
    };

    update();

    return () => caf(rafId);
});

export const startTime = writable(0);

export const offsetEllapsedTime = writable(0);

export const ellapsedTime = derived(
    [currentTime, startTime, offsetEllapsedTime],
    ([$currentTime, $startTime, $offsetEllapsedTime]) => {
        if ($startTime === 0) {
            return 0;
        }

        return $offsetEllapsedTime + $currentTime - $startTime;
    }
);

const createImageId = function () {
    const imageIds: string[] = data;

    let step = 0;

    const { subscribe, set } = writable(imageIds[step]);

    return {
        subscribe,
        next: () => {
            step++;
            step = step % imageIds.length;
            set(imageIds[step]);
        }
    };
};

export const imageId = createImageId();

export const secondTiming = derived(
    [applicationState, ellapsedTime, offsetEllapsedTime],
    ([$applicationState, $ellapsedTime, $offsetEllapsedTime], set) => {
        let t = $ellapsedTime / 1000;

        if ($applicationState === 'paused') {
            t = $offsetEllapsedTime / 1000;
        }

        set(Math.floor(t));
    }
);

export const mm = derived(secondTiming, ($secondTiming) => {
    return Math.floor($secondTiming / 60)
        .toString()
        .padStart(2, '0');
});

export const ss = derived(secondTiming, ($secondTiming) => {
    return ($secondTiming % 60).toString().padStart(2, '0');
});

export const poseDuration = writable(60);

export const completionRate = derived(
    [secondTiming, poseDuration],
    ([$secondTiming, $poseDuration]) => {
        if (Math.floor($secondTiming) % $poseDuration === 0) {
            imageId.next();
        }

        return ($secondTiming % $poseDuration) / $poseDuration;
    }
);
