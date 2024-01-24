const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    build: {
        type : String,
        required: true
    },

    meter: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true
    },

    Owner: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    project: {
        type: String
    }

});

module.exports = mongoose.model("Apartments", ApartmentSchema);
