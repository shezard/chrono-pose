import { writable } from 'svelte/store';
import { data } from './data';

const imageIds: string[] = data;

let step = 0;

const { subscribe, set } = writable(imageIds[step]);

export const imageId = {
    subscribe,
    next: () => {
        step++;
        step = step % imageIds.length;
        set(imageIds[step]);
    }
};
