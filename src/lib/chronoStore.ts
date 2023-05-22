import { writable } from 'svelte/store';

const createState = function() {
    const { subscribe, set } = writable('paused');

    return {
        subscribe,
        update: (state: 'started' | 'paused' | 'clear') => {
            set(state);
        }
    }
}

export const state = createState();


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
