import fs from 'fs';
import npath from 'path';

export default async (req, res, path) => {
    try {
        if (path.endsWith('/post')) {
            const checkEmailResponse = await fetch('https://www.gimkit.com/api/users/register/email-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: req.body.email })
            });
            const checkEmail = await checkEmailResponse.json();

            if (!checkEmail.accountExists) return res.send({ error: 'email does not exist' });
            if (checkEmail.noPassword) return res.send({ error: 'you cannot sign in with a google-based email - add a password from the gimkit settings (gimkit.com/settings)' });

            const loginResponse = await fetch('https://www.gimkit.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: req.body.email,
                    password: req.body.password,
                    googleToken: ''
                })
            });
            const actuallyLogin = await loginResponse.json();

            if (actuallyLogin.message) return res.send({ error: actuallyLogin.message.text });
            if (!actuallyLogin.user?._id) {
                console.log('couldn\'t login', actuallyLogin);
                return res.send({ error: 'unknown error' });
            }

            const setCookie = loginResponse.headers.get('set-cookie');
            if (setCookie) res.setHeader('set-cookie', setCookie);

            return res.send({ success: true });
        }

        if (path.endsWith('/whoami')) {
            const authReq = await fetch('https://www.gimkit.com/pages/general', {
                headers: { cookie: req.headers.cookie || '' }
            });

            const authRes = await authReq.json();

            if (!authRes.userData) return res.send({ email: null });
            return res.send({ email: authRes.userData.email });
        }

        if (path.endsWith('/logout')) {
            res.setHeader('set-cookie', 'connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
            return res.send({ success: true });
        }

        const loginPage = fs.readFileSync(npath.join(import.meta.dirname, '..', 'app', 'login.html'), 'utf8');
        res.send(loginPage);
    } catch (e) {
        console.error(e, path);
    }
};