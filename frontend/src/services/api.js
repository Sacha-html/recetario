const BASE = 'http://localhost:3001';

export async function getCategorias() {
    const res = await fetch(`${BASE}/categorias`);
    if(!res.ok) {
        throw new Error('Error al obtener las categorías');
    }
    return res.json();
}

export async function getRecetas() {
    const res = await fetch(`${BASE}/recetas`);
    if(!res.ok) {
        throw new Error('Error al obtener las recetas');
    }
    return res.json();
}

export async function getReceta(id) {
  const res = await fetch(`${BASE}/recetas/${id}`);
  if (!res.ok) throw new Error('Receta no encontrada');
  return res.json();
}

export async function crearReceta(data) {
  const res = await fetch(`${BASE}/recetas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear receta');
  return res.json();
}

export async function editarReceta(id, data) {
  const res = await fetch(`${BASE}/recetas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al editar receta');
  return res.json();
}

export async function bajaReceta(id) {
  const res = await fetch(`${BASE}/recetas/${id}/baja`, { 
    method: 'PUT' 
});
  if (!res.ok) throw new Error('Error al dar de baja la receta');
  return res.json();
}