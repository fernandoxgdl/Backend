const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await conexion.query('SELECT * FROM productos');
    res.json(rows);
    } catch (error) {
        console.log(error); 
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

module.exports = router;