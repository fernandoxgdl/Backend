const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña requeridos" });
  }

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "contraseña incorrecta" });
    }

    const usuario = result.rows[0];
    const passwordcorrecta = await bcrypt.compare(
      password,
      usuario.password_hash,
    );

    if (!passwordcorrecta) {
      return res.status(401).json({ error: "contraseña incorrecta" });
    }

    res.json({
      ok: true,
      email: usuario.email,
      rol: usuario.rol,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});
module.exports = router;
