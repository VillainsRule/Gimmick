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
            <meta name="robots" content="noindex, nofollow">
            <script>
                (function enableExtraHacks() {
                    const preferredSkin = 'galaxy';
                    let attempts = 0;
                    const interval = setInterval(() => {
                        const buttons = Array.from(document.querySelectorAll('button'));
                        const autoAnswerButton = buttons.find(el => el.textContent?.trim() === 'Start auto answering');
                        const autoPurchaseButton = buttons.find(el => el.textContent?.trim() === 'Auto Purchase Upgrades');

                        if (autoAnswerButton && !autoAnswerButton.disabled) {
                            autoAnswerButton.click();
                        }

                        if (autoPurchaseButton && !autoPurchaseButton.disabled) {
                            autoPurchaseButton.click();
                        }

                        const select = Array.from(document.querySelectorAll('select')).find(sel =>
                            Array.from(sel.options).some(option => option.value === preferredSkin)
                        );

                        if (select) {
                            const option = Array.from(select.options).find(option => option.value === preferredSkin) ?? select.options[0];
                            if (option && select.value !== option.value) {
                                select.value = option.value;
                                select.dispatchEvent(new Event('change', { bubbles: true }));
                            }

                            const applyButton = buttons.find(el => el.textContent?.trim() === 'Apply');
                            if (applyButton && !applyButton.disabled) {
                                applyButton.click();
                            }
                        }

                        attempts += 1;
                        if (attempts >= 80) clearInterval(interval);
                    }, 600);
                })();
            </script>`
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