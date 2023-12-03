import data from './src/lib/data.json' assert { type: 'json' };

const indexedData = data.reduce((indexedData, item) => {
    const key = new URL(item.url);
    indexedData[key.pathname] = item;
    return indexedData;
}, {});

console.log(JSON.stringify(Object.values(indexedData), null, 4));

