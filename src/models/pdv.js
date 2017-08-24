const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = new mongoose.Schema({
    tradingName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
        unique: true
    },
    coverageArea: {
        type: Object,
    },
    address: {
        type: Object,
    },
    deliveryCapacity: {
        type: Number,
    },
}, {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
        collection: 'pdv',
    });

Schema.plugin(uniqueValidator);

module.exports = mongoose.model('Pdv', Schema);
