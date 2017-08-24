'use strict';

const Glue = require('glue');
const manifest = require('./config/manifest');
const { connectDatabase } = require('./src/database');

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
        throw `error on server.register: ${err}`;
    }
    server.log(['test', 'error'], 'Test event');
    
    server.start(async () => {
        try {
            const databaseConnection = await connectDatabase();
            console.log('database connected');
        } catch (error) {
            console.error('unable to connect to database');
            process.exit(1);
        }

        console.log(`server listening on ${server.info.uri.toLowerCase()}`);
    });
});
