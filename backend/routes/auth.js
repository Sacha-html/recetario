// backend/routes/auth.js
const express = require('express');
const router  = express.Router();
const db      = require('../db');

// POST /auth/login — Validar credenciales directamente en MySQL
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Extraemos (We extract) los datos enviados por React

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  try {
    // 1. Buscamos al usuario en la base de datos
    const [users] = await db.query(
      'SELECT id_usuario, email, password FROM usuarios WHERE email = ? AND activo = 1', 
      [email]
    );

    // Si no hay resultados (Empty results), el correo no existe
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const usuario = users[0];

    // 2. Comparamos la contraseña en texto plano (Plain text comparison)
    if (password !== usuario.password) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // 3. Respuesta de éxito (Success response) sin tokens
    res.json({ 
      mensaje: 'Login exitoso', 
      usuario: { id: usuario.id_usuario, email: usuario.email } 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;