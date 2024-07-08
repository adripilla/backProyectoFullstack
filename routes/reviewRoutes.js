const express = require('express');
const Review = require('../models/Review');  // Asegúrate que la ruta sea correcta

const router = express.Router();

// Obtener todas las reseñas
router.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Crear una nueva reseña
router.post('/review', async (req, res) => {
  try {
    const reviewData = {
      descripcion: req.body.descripcion,
      valoracion: req.body.valoracion,
      marca: req.body.marca,
    };

    const review = new Review(reviewData);
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener una reseña por ID
router.get('/review/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar una reseña
router.patch('/review/:id', async (req, res) => {
  try {
    const updateData = {
      descripcion: req.body.descripcion,
      valoracion: req.body.valoracion,
      marca: req.body.marca,
    };

    const review = await Review.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar una reseña
router.delete('/review/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
