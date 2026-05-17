import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategorias, getReceta, crearReceta, editarReceta } from '../services/api';

const FORM_VACIO = {
  nombre: '',
  descripcion: '',
  ingredientes: '',
  pasos: '',
  tiempo_preparacion: '',
  id_categoria: '',
};

export default function FormReceta() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const esEdicion  = Boolean(id);

  const [form,       setForm]       = useState(FORM_VACIO);
  const [categorias, setCategorias] = useState([]);
  const [cargando,   setCargando]   = useState(true);
  const [guardando,  setGuardando]  = useState(false);

  useEffect(() => {
    const init = async () => {
      const cats = await getCategorias();
      setCategorias(cats);

      if (esEdicion) {
        const receta = await getReceta(id);
        setForm({
          nombre:             receta.nombre             ?? '',
          descripcion:        receta.descripcion        ?? '',
          ingredientes:       receta.ingredientes       ?? '',
          pasos:              receta.pasos              ?? '',
          tiempo_preparacion: receta.tiempo_preparacion ?? '',
          id_categoria:       receta.id_categoria       ?? '',
        });
      }
      setCargando(false);
    };
    init();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.id_categoria) {
      alert('El nombre y la categoría son obligatorios.');
      return;
    }
    setGuardando(true);
    const payload = {
      ...form,
      tiempo_preparacion: form.tiempo_preparacion === '' ? null : Number(form.tiempo_preparacion),
      id_categoria: Number(form.id_categoria),
    };
    esEdicion ? await editarReceta(id, payload) : await crearReceta(payload);
    navigate('/');
  };

  if (cargando) return <div className="mt-4">Cargando...</div>;

  return (
    <>
      <h1 className="mt-4">{esEdicion ? 'Editar receta' : 'Nueva receta'}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">{esEdicion ? 'Edición' : 'Alta'}</li>
      </ol>

      <div className="card mb-4">
        <div className="card-header">{esEdicion ? 'Modificar datos de la receta' : 'Completá los datos de la receta'}</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre *</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                maxLength={200}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Categoría *</label>
              <select
                className="form-select"
                name="id_categoria"
                value={form.id_categoria}
                onChange={handleChange}
              >
                <option value="">Seleccioná una categoría...</option>
                {categorias.map(c => (
                  <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={2}
              />
            </div>

            <div className="mb-3" style={{ maxWidth: 200 }}>
              <label className="form-label fw-semibold">Tiempo de preparación (min)</label>
              <input
                type="number"
                className="form-control"
                name="tiempo_preparacion"
                value={form.tiempo_preparacion}
                onChange={handleChange}
                min={1}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Ingredientes</label>
              <textarea
                className="form-control"
                name="ingredientes"
                value={form.ingredientes}
                onChange={handleChange}
                rows={4}
                placeholder="Un ingrediente por línea"
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Pasos de preparación</label>
              <textarea
                className="form-control"
                name="pasos"
                value={form.pasos}
                onChange={handleChange}
                rows={5}
                placeholder="1. Paso uno&#10;2. Paso dos..."
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? 'Guardando...' : (esEdicion ? 'Guardar cambios' : 'Crear receta')}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                Cancelar
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}