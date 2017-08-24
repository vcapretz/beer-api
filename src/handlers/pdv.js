const Joi = require('joi');
const rp = require('request-promise');

const { Pdv } = require('../models');

const pdvPostPayloadValidation = {
    /*  eslint-disable camelcase */
    trading_name: Joi.string().required(),
    owner_name: Joi.string().required(),
    document: Joi.string().required(),
    coverage_area: Joi.object().required().keys({
        type: Joi.string().required(),
        coordinates: Joi.array().required()
    }),
    address: Joi.object().required().keys({
        type: Joi.string().required(),
        coordinates: Joi.array().required()
    }),
    delivery_capacity: Joi.number().required()
    /*  eslint-enable camelcase */
};

module.exports.getAll = {
    handler: async (request, reply) => {
        const getAllPdv = await Pdv.find();

        return reply({ items: getAllPdv });
    }
};

module.exports.getById = {
    handler: async (request, reply) => {
        const getPdv = await Pdv.findById(request.params.id);

        return reply({ items: getPdv });
    }
};

module.exports.create = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await Pdv.create(request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to create your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on creating new document', data } }).code(201);
    },
    validate: {
        payload: pdvPostPayloadValidation
    }
};

module.exports.createList = {
    handler: async (request, reply) => {
        let data;
        let list;

        if (!request.payload.items && !request.payload.url) {
            return reply({ result: 'you should provide a url or an array of items to be imported' })
                .code(400);
        }

        if (request.payload.url && !request.payload.url.endsWith('.json')) {
            return reply({ result: 'the import url needs to be a json file' })
                .code(400);
        }

        if (request.payload.url) {
            const externalData = await rp.get(request.payload.url, { encoding: 'utf-8', json: true });

            if (!externalData) {
                return reply({ result: 'it was extract your json file from the provided url' })
                    .code(400);
            }

            if (!Array.isArray(externalData) && !externalData.pdvs) {
                return reply({
                    result: 'the url should contain an array of items or an object with the key "pdvs"'
                })
                    .code(400);
            }

            list = Array.isArray(externalData) ? externalData : externalData.pdvs;

            const validateImportedJson = Joi.validate(list, Joi.array().items(pdvPostPayloadValidation));

            if (validateImportedJson.error !== null) {
                return reply({ result: 'the imported json doesn\'t match requirements ', err: validateImportedJson.error })
                    .code(400);
            }
        }

        if (request.payload.items) {
            list = request.payload.items;
        }

        try {
            data = await Pdv.create(list);
        } catch (err) {
            return reply({ result: 'it was not possible to create your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on import new documents', data } }).code(201);
    },
    validate: {
        payload: {
            items: Joi.array().optional().items(pdvPostPayloadValidation),
            url: Joi.string().optional()
        }
    }
};
