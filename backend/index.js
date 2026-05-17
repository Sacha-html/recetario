const express = require('express');
const cors    = require('cors');
const categorias = require('./routes/categorias');
const recetas = require('./routes/recetas');

const app  = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/categorias', categorias);
app.use('/recetas', recetas);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API recetario funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});