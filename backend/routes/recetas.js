const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /recetas — lista recetas activas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.id_receta, r.nombre, r.descripcion, r.tiempo_preparacion,
             r.fecha_creacion, c.nombre AS categoria
      FROM receta r
      JOIN categorias c ON r.id_categoria = c.id_categoria
      WHERE r.activo = 1
      ORDER BY r.fecha_creacion DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /recetas/:id — detalle de una receta
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, c.nombre AS categoria
      FROM receta r
      JOIN categorias c ON r.id_categoria = c.id_categoria
      WHERE r.id_receta = ? AND r.activo = 1
    `, [req.params.id]);

    if (rows.length === 0) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /recetas — crear receta
router.post('/', async (req, res) => {
  const { nombre, descripcion, ingredientes, pasos, tiempo_preparacion, id_categoria } = req.body;

  if (!nombre || !id_categoria) {
    return res.status(400).json({ error: 'El nombre y la categoría son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO receta (nombre, descripcion, ingredientes, pasos, tiempo_preparacion, id_categoria)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, ingredientes, pasos, tiempo_preparacion || null, id_categoria]
    );
    res.status(201).json({ id_receta: result.insertId, mensaje: 'Receta creada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /recetas/:id — editar receta
router.put('/:id', async (req, res) => {
  const { nombre, descripcion, ingredientes, pasos, tiempo_preparacion, id_categoria } = req.body;

  if (!nombre || !id_categoria) {
    return res.status(400).json({ error: 'El nombre y la categoría son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `UPDATE receta
       SET nombre = ?, descripcion = ?, ingredientes = ?, pasos = ?,
           tiempo_preparacion = ?, id_categoria = ?
       WHERE id_receta = ? AND activo = 1`,
      [nombre, descripcion, ingredientes, pasos, tiempo_preparacion || null, id_categoria, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json({ mensaje: 'Receta actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /recetas/:id/baja — baja lógica
router.put('/:id/baja', async (req, res) => {
  try {
    const [result] = await db.query(
      'UPDATE receta SET activo = 0 WHERE id_receta = ? AND activo = 1',
      [req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Receta no encontrada o ya dada de baja' });
    res.json({ mensaje: 'Receta dada de baja correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;