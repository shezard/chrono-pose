set dotenv-load := true

get_data theme:
    #!/bin/bash
    curl "https://api.unsplash.com/photos/random?count=100&orientation=portrait&query={{theme}}" \
        --header "Authorization: Client-ID $ACCESS_KEY" | \
        jq '[.[] | {alt: .alt_description, url: .urls.small, author: .user.username}]'

get_test theme:
    #!/bin/bash
    echo -e '[{\n
        "alt": "brown and gray houses",\n
        "url": "https://images.unsplash.com/photo-1575065413697-c30c41266187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIwNzl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc1ODEyMTF8&ixlib=rb-4.0.3&q=80&w=400",\n
        "author": "cajeo"\n
    }]'

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

build theme:
    #!/bin/bash
    just make_unique {{theme}} > ./data/{{theme}}-tmp.json && mv ./data/{{theme}}-tmp.json ./data/{{theme}}.json
