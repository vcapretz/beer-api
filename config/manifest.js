const envKey = key => {
    const env = process.env.NODE_ENV || 'development';

    const configuration = {
        development: {
            host: 'localhost',
            port: 8000
        },
        uat: {
            host: 'localhost',
            port: 8010
        },
        production: {
            host: process.env.HOST,
            port: process.env.PORT
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
    registrations: [
        {
            plugin: './src',
            options: { routes: { prefix: '/api' } }
        }
    ]
};
