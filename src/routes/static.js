export default async (req, res, path) => {
    try {
        const fetchOptions = {
            method: req.method,
            headers: {
                accept: '*/*',
                'accept-encoding': 'deflate',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
                'connection': 'keep-alive',
                'content-type': Object.keys(req.body).length < 1 ? undefined : 'application/json',
                cookie: req.headers.cookie,
                host: 'www.gimkit.com',
                origin: 'https://www.gimkit.com',
                pragma: 'no-cache',
                referer: 'https://www.gimkit.com/',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="134", "Google Chrome";v="134"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'upgrade-insecure-requests': '1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
            },
            body: Object.keys(req.body).length < 1 ? undefined : JSON.stringify(req.body),
            redirect: 'manual'
        };

        const response = await fetch(`https://www.gimkit.com${path}`, fetchOptions);

        ['content-type', 'set-cookie'].forEach((header) => {
            if (response.headers.has(header))
                res.setHeader(header, response.headers.get(header));
        });

        const data = await response.text();
        res.status(response.status).send(data);
    } catch (e) {
        console.error(e, path);
    }
};