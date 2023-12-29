import { writable, readable, derived, type Readable } from 'svelte/store';
import { raf, caf, animate } from '$lib/utils';
import { data } from '$lib/data';

const createApplicationState = function () {
    const { subscribe, set } = writable('paused');

    return {
        subscribe,
        update: (applicationState: 'started' | 'paused' | 'clear') => {
            if (applicationState === 'clear') {
                image.next();
                applicationState = 'paused';
            }
            set(applicationState);
        }
    };
};

export const applicationState = createApplicationState();

const createImage = function () {
    const images = data;

    let step = 0;

    const { subscribe, set } = writable(images[step]);

    return {
        subscribe,
        next: () => {
            step++;
            step = step % images.length;
            set(images[step]);
        }
    };
};

export const image = createImage();

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
            return $offsetEllapsedTime;
        }

        return $offsetEllapsedTime + Math.max(0, $currentTime - $startTime);
    }
);

const createPoseDuration = function () {
    const { subscribe, set } = writable(60);

    return {
        subscribe,
        set: (seconds: number) => {
            animate(() => {
                set(seconds);
            })
        }
    };
};

export const poseDuration = createPoseDuration();

const secondTiming: Readable<number> = derived(
    [applicationState, ellapsedTime, offsetEllapsedTime],
    ([$applicationState, $ellapsedTime, $offsetEllapsedTime], set) => {
        let t = $ellapsedTime / 1000;

        if ($applicationState === 'paused') {
            t = $offsetEllapsedTime / 1000;
        }

        set(Math.floor(t));
    }
);

const milliSecondTiming: Readable<number> = derived(
    [applicationState, ellapsedTime, offsetEllapsedTime],
    ([$applicationState, $ellapsedTime, $offsetEllapsedTime], set) => {
        let t = $ellapsedTime;

        if ($applicationState === 'paused') {
            t = $offsetEllapsedTime;
        }

        set(t);
    }
);

export const mm = derived(secondTiming, ($secondTiming) => {
    return Math.floor($secondTiming / 60)
        .toString()
        .padStart(2, '0');
});

export const ss = derived([secondTiming, poseDuration], ([$secondTiming, $poseDuration]) => {
    if ($secondTiming > 0 && $secondTiming % $poseDuration === 0) {
        image.next();
    }

    return ($secondTiming % 60).toString().padStart(2, '0');
});

export const completionRate = derived(
    [milliSecondTiming, poseDuration],
    ([$milliSecondTiming, $poseDuration]) => {
        return (($milliSecondTiming / 1000) % $poseDuration) / $poseDuration;
    }
);
