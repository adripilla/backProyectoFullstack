const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    imagen: {
        type: String, // URL de la imagen
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    disponibilidad: {
        type: Boolean,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
        default: 1,
    }
});

const Pedido = mongoose.model('Pedido', orderSchema);

module.exports = Pedido;
