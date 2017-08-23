'use strict';

const Glue = require('glue');
const manifest = require('./config/manifest');

if (!process.env.PRODUCTION) {
    manifest.registrations.push({
        plugin: {
            register: 'blipp',
            options: {}
        }
    });
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
    if (err) {
        return console.log(`error on server.register: ${err}`);
    }

    server.start(() => {
        console.log(`server listening on ${server.info.uri.toLowerCase()}`);
    });
});
