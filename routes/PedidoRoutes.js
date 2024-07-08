const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

// Middleware para obtener un pedido por su ID
async function getPedido(req, res, next) {
    let pedido;
    try {
        pedido = await Pedido.findById(req.params.id);
        if (pedido == null) {
            return res.status(404).json({ message: 'No se pudo encontrar el pedido' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.pedido = pedido;
    next();
}

// Ruta para obtener todos los pedidos
router.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener un pedido por su ID
router.get('/pedidos/:id', getPedido, (req, res) => {
    res.json(res.pedido);
});

// Ruta para crear un nuevo pedido
router.post('/pedidos', async (req, res) => {
    const pedido = new Pedido({
        usuario: req.body.usuario,
        productos: req.body.productos,
        total: req.body.total,
        estado: req.body.estado,
        fecha: req.body.fecha
    });
    try {
        const nuevoPedido = await pedido.save();
        res.status(201).json(nuevoPedido);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para actualizar un pedido
router.patch('/pedidos/:id', getPedido, async (req, res) => {
    if (req.body.usuario != null) {
        res.pedido.usuario = req.body.usuario;
    }
    if (req.body.productos != null) {
        res.pedido.productos = req.body.productos;
    }
    if (req.body.total != null) {
        res.pedido.total = req.body.total;
    }
    if (req.body.estado != null) {
        res.pedido.estado = req.body.estado;
    }
    if (req.body.fecha != null) {
        res.pedido.fecha = req.body.fecha;
    }
    try {
        const pedidoActualizado = await res.pedido.save();
        res.json(pedidoActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para eliminar un pedido
router.delete('/pedidos/:id', getPedido, async (req, res) => {
    try {
        await res.pedido.remove();
        res.json({ message: 'Pedido eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
