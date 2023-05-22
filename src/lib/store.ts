import { writable } from 'svelte/store';
import { data } from './data';

const createApplicationState = function() {
    const { subscribe, set } = writable('paused');

    return {
        subscribe,
        update: (applicationState: 'started' | 'paused' | 'clear') => {
            set(applicationState);
        }
    }
}

export const applicationState = createApplicationState();

const createCompletionRate = function() {
    const { subscribe, set } = writable(0);

    return {
        subscribe,
        update: (completionRate : number) => {
            set(completionRate);
        }
    }
}

export const completionRate = createCompletionRate();

const createImageId = function() {

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
}

export const imageId = createImageId();
