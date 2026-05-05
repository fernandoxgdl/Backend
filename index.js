require("dotenv").config();
const express = require("express");
const cors = require("cors");

const productosRoutes = require("./rutas/productos");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/productos", productosRoutes);
app.use("/imagenes", express.static("public/imagenes"));

app.get("/", (req, res) => {
  res.send("API funcionando");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
