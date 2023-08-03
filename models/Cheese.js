let { Schema, model } = require('mongoose');

let CheeseSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    avalaible: {
        type: Boolean,
        default: true
    }
});



module.exports = model( 'Cheese', CheeseSchema );