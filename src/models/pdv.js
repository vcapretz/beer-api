const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = new mongoose.Schema({
    trading_name: {
        type: String,
        required: true,
    },
    owner_name: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
        unique: true
    },
    coverage_area: {
        type: Object,
    },
    address: {
        type: Object,
    },
    deliver_capacity: {
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
