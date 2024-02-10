set dotenv-load := true

init theme:
    #!/bin/bash
    test -f ./data/{{theme}}.json || echo '[]' > ./data/{{theme}}.json

get_data theme:
    #!/bin/bash
    curl "https://api.unsplash.com/photos/random?count=100&orientation=portrait&query={{theme}}" \
        --header "Authorization: Client-ID $ACCESS_KEY" | \
        jq '[.[] | {alt: .alt_description, url: .urls.small, author: .user.username}]'

make_unique theme:
    #!/usr/bin/env bash
    ":" //# comment; exec /usr/bin/env node --no-warnings --input-type=module - "$@" < "$0"
    import { readFileSync } from 'node:fs';
    import { promisify } from 'node:util';
    import { exec } from 'node:child_process';
    import existingData from './data/{{theme}}.json' assert { type: 'json' };

    const pexec = promisify(exec);

    const {stdout: newData } = await pexec('just get_data {{theme}}');

    const data = JSON.parse(newData).concat(existingData);

    const indexedData = data.reduce((indexedData, item) => {
        const key = new URL(item.url);
        indexedData[key.pathname] = item;
        return indexedData;
    }, {});

    console.log(JSON.stringify(Object.values(indexedData), null, 4));

build theme: (init theme)
    #!/bin/bash
    just make_unique {{theme}} > ./data/{{theme}}-tmp.json && mv ./data/{{theme}}-tmp.json ./data/{{theme}}.json
