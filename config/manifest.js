const envKey = key => {
    const env = process.env.NODE_ENV || 'development';

    const configuration = {
        development: {
            host: 'localhost',
            port: 5000,
            log: ['error'],
        },
        production: {
            host: process.env.HOST,
            port: process.env.PORT,
            log: false,
        }
    };

    return configuration[env][key];
};

module.exports = {
    connections: [
        {
            host: envKey('host'),
            port: envKey('port'),
            routes: {
                cors: true
            },
            router: {
                stripTrailingSlash: true
            }
        }
    ],
    server: {
        debug: {
            log: envKey('log'),
            request: envKey('log')
        }
    },
    registrations: [
        {
            plugin: './src',
            options: { }
        }
    ]
};
