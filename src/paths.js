import audio from './routes/audio.js';
import content from './routes/content.js';
import login from './routes/login.js';
import page from './routes/page.js';
import static_ from './routes/static.js';

export default [
    {
        match: /(.*?)\.(png|jpg|jpeg|svg|webm|ico|gif|ttf|otf|atlas)/,
        name: 'content',
        handler: content
    },
    {
        match: /(.*?)\.(mp3|mp4|m4a)/,
        name: 'audio',
        handler: audio
    },
    {
        match: /(.*?)\.(js|json|css)(.*?)/,
        name: 'static',
        handler: static_
    },
    {
        match: /(pages|api)\/(.*?)/,
        name: 'static',
        handler: static_
    },
    {
        match: /\/login(.*?)/,
        name: 'login',
        handler: login
    },
    {
        match: /(\/|)/,
        name: 'static',
        handler: page
    }
];