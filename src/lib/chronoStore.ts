import { writable } from 'svelte/store';

function createState() {
    const { subscribe, set } = writable('paused');

    return {
        subscribe,
        update: (state: 'started' | 'paused' | 'clear') => {
            set(state);
        }
    };
}

export const state = createState();
