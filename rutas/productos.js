const express = require("express");
const router = express.Router();
const conexion = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await conexion.query("SELECT * FROM productos ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

module.exports = router;
