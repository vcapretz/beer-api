const indexRoutes = require('./handlers/index');
const pdvRoutes = require('./handlers/pdv');

exports.register = (plugin, options, next) => {
    plugin.route([
        { method: 'GET', path: '/', config: indexRoutes.indexRoute },
        { method: 'GET', path: '/pdv', config: pdvRoutes.getAll },
        { method: 'GET', path: '/pdv/nearby', config: pdvRoutes.getNearby },
        { method: 'GET', path: '/pdv/{id}', config: pdvRoutes.getById },
        { method: 'POST', path: '/pdv', config: pdvRoutes.create },
        { method: 'POST', path: '/pdv/import', config: pdvRoutes.createList },
        { method: 'GET', path: '/{path*}', config: indexRoutes.notFound }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};
