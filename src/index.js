const indexRoutes = require('./handlers/index');

exports.register = (plugin, options, next) => {
    plugin.route([
        { method: 'GET', path: '/', config: indexRoutes.indexRoute },
        { method: 'GET', path: '/{path*}', config: indexRoutes.notFound }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};
