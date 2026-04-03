import fs from 'fs';
import npath from 'path';

export default async (_req, res, path) => {
    try {
        if (path !== '/join') return res.redirect('/join');

        const response = await fetch(`https://www.gimkit.com/join`);
        let html = await response.text();

        ['content-type', 'set-cookie'].forEach((header) => {
            if (response.headers.has(header))
                res.setHeader(header, response.headers.get(header));
        });

        html = html.replace(
            `<head>`,
            `<head>
            <script>${fs.readFileSync(npath.join(import.meta.dirname, '..', 'bundle.txt'), 'utf-8')}</script>
            <meta name="robots" content="noindex, nofollow">`
        );

        html = html.replace(
            `content="https://www.gimkit.com">`,
            `content="https://www.gimkit.com"><script>document.querySelector('meta[property="cdn-map-assets-url"]').content = location.origin</script>`
        );

        res.send(html);
    } catch (e) {
        console.error(e, path);
    }
};