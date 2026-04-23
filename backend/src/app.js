require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarioRoutes");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/usuarios", usuarioRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Recurso no encontrado",
    message: "La ruta " + req.method + " " + req.originalUrl + " no esta implementada en este servidor."
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:" + PORT);
});