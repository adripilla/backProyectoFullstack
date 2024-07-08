const mongoose = require('mongoose');

const celularSchema = new mongoose.Schema({
  modelo: { type: String, required: true },
  marca: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: Buffer, required: true },
  stock: { type: Number, required: true },
  ano:{ type:Number,required:true},
  disponibilidad: { type: Boolean, required: true },
});

const Celular = mongoose.model('Celular', celularSchema);

module.exports = Celular;
