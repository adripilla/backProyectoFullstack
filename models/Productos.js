const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: Buffer, required: true },
  stock: { type: Number, required: true },
  disponibilidad: { type: Boolean, required: true },
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
