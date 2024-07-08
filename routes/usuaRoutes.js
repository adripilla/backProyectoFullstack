const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');


// Ruta para verificar usuario por email y contraseña
router.post('/usuarios/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email, password });
        if (usuario) {
            res.json({ success: 1 });
        } else {
            const usuarioExistente = await Usuario.findOne({ email });
            if (usuarioExistente) {
                res.json({ success: 2 });
            } else {
                res.json({ success: 0 });
            }
        }
    } catch (err) {
        res.status(500).json({ success: 0, message: err.message });
    }
});


// Middleware para obtener un usuario por su ID
async function getUsuario(req, res, next) {
    let usuario;
    try {
        usuario = await Usuario.findById(req.params.id);
        if (usuario == null) {
            return res.status(404).json({ message: 'No se pudo encontrar al usuario' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.usuario = usuario;
    next();
}

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener un usuario por su ID
router.get('/usuarios/:id', getUsuario, (req, res) => {
    res.json(res.usuario);
});

// Ruta para crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
    const usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        edad: req.body.edad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        password: req.body.password
    });
    try {
        const nuevoUsuario = await usuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para actualizar un usuario
router.patch('/usuarios/:id', getUsuario, async (req, res) => {
    if (req.body.nombre != null) {
        res.usuario.nombre = req.body.nombre;
    }
    if (req.body.email != null) {
        res.usuario.email = req.body.email;
    }
    if (req.body.edad != null) {
        res.usuario.edad = req.body.edad;
    }
    if (req.body.direccion != null) {
        res.usuario.direccion = req.body.direccion;
    }
    if (req.body.telefono != null) {
        res.usuario.telefono = req.body.telefono;
    }
    if (req.body.password != null) {
        res.usuario.password = req.body.password;
    }
    try {
        const usuarioActualizado = await res.usuario.save();
        res.json(usuarioActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para eliminar un usuario
router.delete('/usuarios/:id', getUsuario, async (req, res) => {
    try {
        await res.usuario.remove();
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
