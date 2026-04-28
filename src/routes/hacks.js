import fs from 'fs';
import npath from 'path';

export default async (_req, res, _path) => {
    try {
        const hacksPage = fs.readFileSync(npath.join(import.meta.dirname, '..', 'app', 'hacks.html'), 'utf8');
        res.send(hacksPage);
    } catch (e) {
        console.error(e);
        res.status(500).send('Unable to load hacks page');
    }
};
