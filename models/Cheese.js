let {Schema, model} = require('mongoose');

let CheeseSchema= Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status:{
        type: Boolean,
        default: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    avaible:{
        type:Boolean,
        default: true
    }
})

module.exports = model('Cheese', CheeseSchema);