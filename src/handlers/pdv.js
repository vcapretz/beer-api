const Joi = require('joi');
const { Pdv } = require('../models');

module.exports.getAll = {
    handler: async (request, reply) => {
        const getAllPdv = await Pdv.find();

        return reply({ itens: getAllPdv });
    }
};

module.exports.getById = {
    handler: (request, reply) => {
        return reply({});
    }
};

module.exports.create = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await Pdv.create(request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to create your document', err })
                .code(404);
        }

        return reply({ result: { message: 'success on creating new document', data } }).code(201);
    },
    validate: {
        payload: {
            tradingName: Joi.string().required(),
            ownerName: Joi.string().required(),
            document: Joi.string().required(),
            coverageArea: Joi.object().required().keys({
                type: Joi.string().required(),
                coordinates: Joi.array().required(),
            }),
            address: Joi.object().required().keys({
                type: Joi.string().required(),
                coordinates: Joi.array().required(),
            }),
            deliveryCapacity: Joi.number().required(),
        }
    }
};
