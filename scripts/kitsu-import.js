const https = require('https');
const fs = require('fs/promises');
const path = require("path");

function request(urlString) {
    return new Promise((resolve) => {
        const url = new URL(urlString);

        const options = {
            host: url.host,
            path: url.pathname + url.search
        };

        let responseBody = '';

        const callback = (response) => {
            response.on('data', (chunk) => responseBody += chunk);
            response.on('end', () => resolve(JSON.parse(responseBody)));
        };

        https.request(options, callback).end();
    });
}

async function load({ url, outPath, transform }) {
    const doTransform = new Function('data', 'return ' + transform);
    let datalist = [];
    let nextUrl = url;

    while (nextUrl) {
        const { links, data } = await request(nextUrl);
        datalist = datalist.concat(data.map(data => doTransform(data)));
        nextUrl = links.next;
    }

    await fs.writeFile(path.resolve(process.cwd(), `${outPath}.json`), JSON.stringify(datalist, null, 2));
}

load({
    url: process.argv[2],
    outPath: process.argv[3],
    transform: process.argv[4] || 'data.attributes'
});
