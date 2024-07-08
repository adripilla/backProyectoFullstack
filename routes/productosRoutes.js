const express = require('express');
const Producto = require('../models/Productos');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();  // Configura el almacenamiento de multer
const upload = multer({ storage: storage });  // Define el middleware de multer


// Obtener un producto por nombre
router.get('/producto/nombre/:nombre', async (req, res) => {
  try {
    const producto = await Producto.findOne({ nombre: req.params.nombre });
    if (!producto) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }
    res.send(producto);
  } catch (error) {
    res.status(500).send(error);
  }
});




// Crear un nuevo producto
router.post('/producto', upload.single('imagen'), async (req, res) => {
  try {
    const productoData = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
      stock: req.body.stock,
      disponibilidad: req.body.disponibilidad,
      imagen: req.file.buffer, // Almacena la imagen como un buffer
    };

    const producto = new Producto(productoData);
    await producto.save();
    res.status(201).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los productos
router.get('/producto', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.send(productos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener un producto por nombre
router.get('/producto/nombre/:nombre', async (req, res) => {
  try {
    const producto = await Producto.findOne({ nombre: req.params.nombre });
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener un producto por ID
router.get('/producto/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un producto
router.patch('/producto/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Actualizar un producto con PUT
router.put('/producto/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Eliminar un producto
router.delete('/producto/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
