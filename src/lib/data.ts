import shuffle from 'lodash/shuffle';
import { browser } from '$app/environment';
import json from '$lib/data.json';

export interface Image {
    alt: string;
    url: string;
    author: string;
}

const doShuffle = function <T>(data: Array<T>): Array<T> {
    if (!browser) {
        return [];
    }

    return shuffle(data);
};

export const data: Image[] = doShuffle(json);
