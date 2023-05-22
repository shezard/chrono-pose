import { writable } from 'svelte/store';

const { subscribe, set } = writable('paused');

export const state = {
    subscribe,
    update: (state: 'started' | 'paused' | 'clear') => {
        set(state);
    }
};
