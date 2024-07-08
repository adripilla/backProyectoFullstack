const express = require('express');
const Celular = require('../models/ProyectoCelulares');  // Asegúrate que la ruta sea correcta
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();  // Configura el almacenamiento de multer
const upload = multer({ storage: storage });  // Define el middleware de multer

// Obtener un producto por modelo
router.get('/celular/modelo/:modelo', async (req, res) => {
  try {
    const celular = await Celular.findOne({ modelo: req.params.modelo });
    if (!celular) {
      return res.status(404).send({ message: 'Celular no encontrado' });
    }
    res.send(celular);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Crear un nuevo producto
router.post('/celular', upload.single('imagen'), async (req, res) => {
  try {
    const celularData = {
      modelo: req.body.modelo,
      marca: req.body.marca,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
      stock: req.body.stock,
      ano: req.body.ano,
      disponibilidad: req.body.disponibilidad,
      imagen: req.file.buffer, // Almacena la imagen como un buffer
    };

    const celular = new Celular(celularData);
    await celular.save();
    res.status(201).send(celular);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los productos
router.get('/celular', async (req, res) => {
  try {
    const celulares = await Celular.find();
    res.send(celulares);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener un producto por ID
router.get('/celular/:id', async (req, res) => {
  try {
    const celular = await Celular.findById(req.params.id);
    if (!celular) {
      return res.status(404).send();
    }
    res.send(celular);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un producto
router.patch('/celular/:id', upload.single('imagen'), async (req, res) => {
  try {
    const updateData = {
      modelo: req.body.modelo,
      marca: req.body.marca,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
      stock: req.body.stock,
      ano: req.body.ano,
      disponibilidad: req.body.disponibilidad,
    };

    if (req.file) {
      updateData.imagen = req.file.buffer; // Actualiza la imagen si se proporciona una nueva
    }

    const celular = await Celular.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!celular) {
      return res.status(404).send();
    }
    res.send(celular);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un producto
router.delete('/celular/:id', async (req, res) => {
  try {
    const celular = await Celular.findByIdAndDelete(req.params.id);
    if (!celular) {
      return res.status(404).send();
    }
    res.send(celular);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
