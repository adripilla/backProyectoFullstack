const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno desde el archivo .env
const cors = require("cors"); // Importa el paquete cors

const userRoutes = require("./routes/userRoutes");
const prodRoutes = require("./routes/productosRoutes");
const pediRoutes = require("./routes/PedidoRoutes");
const usuaRoutes = require("./routes/usuaRoutes");
const celRoutes = require("./routes/celularesRoutes");
const revRoutes = require("./routes/reviewRoutes");



const app = express();
const port = 3000;

// Middleware
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); // Para manejar formularios


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// Configuración detallada de CORS
const corsOptions = {
  origin: "http://localhost:8080", // Origen permitido
  credentials: true,
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  optionSuccessStatus:200,
};


app.use(cors(corsOptions)); // Habilita CORS con opciones específicas

// Verificar que la URI esté definida
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error(
    "Error: La variable MONGODB_URI no está definida en el archivo .env"
  );
  process.exit(1); // Salir del proceso si no está definida
}

console.log("MongoDB URI:", mongoUri); // Para depuración, puedes eliminar esta línea después

// Conectar a MongoDB Atlas
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB Atlas", error);
  });

// Usar rutas
app.use("/api", userRoutes);
app.use("/api", prodRoutes);
app.use("/api", pediRoutes);
app.use("/api", usuaRoutes);
app.use("/api", celRoutes);
app.use("/api", revRoutes);



// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
