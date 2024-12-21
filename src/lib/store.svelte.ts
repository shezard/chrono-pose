import { animate } from '$lib/utils';

type Image = {
    alt: string,
    url: string,
    author: string,
}

const themeFiles = import.meta.glob('../data/*.json');
const themeData: Record<string, Image[]> = {};

function formatPath(path: string) {
    return path.replace('../data/', '').replace('.json', '');
}

await Promise.all(
    Object.entries(themeFiles).map(async ([path, content]) => {
        const imported = await content();
        themeData[formatPath(path)] = imported.default;
    })
);

export const themes = $state(Object.keys(themeFiles).map(formatPath));

export const createApplicationState = function (step) {
    let applicationState = $state('paused');

    return {
        get value() { return applicationState },
        update: (nextApplicationState: 'started' | 'paused' | 'clear') => {
            if (applicationState === 'clear') {
                step.next();
                applicationState = 'paused';
            }
            applicationState = nextApplicationState;
        }
    };
};

export const createStep = function (getCurrentTheme : () => string) {

    const currentTheme = getCurrentTheme();
    const length = themeData[currentTheme].length;
    let step = $state(~~(Math.random() * length));

    return {
        get value() { return step},
        get stepNumber() {
            const images = themeData[currentTheme]
            return images.length;
        },
        get image() {
            const images = themeData[currentTheme]
            return images[step];
        },
        next: () => {
            const length = themeData[currentTheme].length;
            step = ~~(Math.random() * length)
        }
    };
};

export const createPoseDuration = function () {
    let poseDuration = $state(60);

    return {
        get value() { return poseDuration },
        set: (seconds: number) => {
            animate(() => {
                poseDuration = seconds
            });
        }
    };
};
