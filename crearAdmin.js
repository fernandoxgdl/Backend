require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("./db");

async function crearAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO usuarios (email, password_hash) VALUES ($1, $2)",
    [email, hash],
  );

  console.log("Admin creado con éxito");
  process.exit();
}

crearAdmin();
