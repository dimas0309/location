const mongoose = require('mongoose');
const User = require('./person');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    geometry: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})

module.exports = mongoose.model(
    'Person', PersonSchema
);