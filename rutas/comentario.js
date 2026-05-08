const express = require('express');
const router  = express.Router();
const pool    = require('../db');

router.post ('/', async (req, res) => {
  const {nombre, telefono, mensaje} = req.body;

  if(!nombre || !telefono || !mensaje) {
    return res.status(400).json({error: 'Todos los campos son requeridos'});
  }

  try{
    const resultado = await pool.query(
      'INSERT INTO comentario_usuario (nombre, telefono, mensaje) VALUES ($1, $2, $3) RETURNING id',
      [nombre, telefono, mensaje] 
     
    );
    res.status(201).json({
      ok: true,
      mensaje: 'Comentario enviado exitosamente',
      id: resultado.rows[0].id
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Error al guardar el comentario'});
  }

});

router.get('/total', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM comentario_usuario');
    res.json({ total: parseInt(result.rows[0].count) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener el total' });
  }
});

module.exports = router;