const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  valoracion: { type: Number, required: true }, // Suponiendo que la valoración es un número
  marca: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
