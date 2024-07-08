const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;
