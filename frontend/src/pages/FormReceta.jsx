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
  const [errores,    setErrores]    = useState({});

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
  
  if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: false }));
    }
  
  };
  const handleSubmit = async e => {
    e.preventDefault();
    
    
    const nuevosErrores = {};
    
    if (!form.nombre.trim()) nuevosErrores.nombre = true;
    if (!form.id_categoria) nuevosErrores.id_categoria = true;
    if (!form.descripcion.trim()) nuevosErrores.descripcion = true;
    if (!String(form.tiempo_preparacion).trim()) nuevosErrores.tiempo_preparacion = true;
    if (!form.ingredientes.trim()) nuevosErrores.ingredientes = true;
    if (!form.pasos.trim()) nuevosErrores.pasos = true;

    
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
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

      <div className="card mb-4 bg-transparent border-1 shadow-sm">
        <div className="card-header">{esEdicion ? 'Modificar datos de la receta' : 'Completá los datos de la receta'}</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre *</label>
              <input
                type="text"
                className={`form-control bg-transparent text-dark fw-semibold border-secondary ${errores.nombre ? 'is-invalid' : ''}`}
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                maxLength={200}
              />
              {errores.nombre && <div className="text-danger small mt-1">Campo obligatorio</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Categoría *</label>
              <select
                className={`form-select bg-transparent text-dark fw-semibold border-secondary ${errores.id_categoria ? 'is-invalid' : ''}`}
                name="id_categoria"
                value={form.id_categoria}
                onChange={handleChange}
              >
                <option value="">Seleccioná una categoría...</option>
                {categorias.map(c => (
                  <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>
                ))}
              </select>
              {errores.id_categoria && <div className="invalid-feedback">Campo obligatorio</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea
                className={`form-control bg-transparent text-dark fw-semibold border-secondary ${errores.descripcion ? 'is-invalid' : ''}`}
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={2}
              />
              {errores.descripcion && <div className="invalid-feedback">Campo obligatorio</div>}
            </div>

            <div className="mb-3" style={{ maxWidth: 200 }}>
              <label className="form-label fw-semibold">Tiempo de preparación (min)</label>
              <input
                type="number"
                className={`form-control bg-transparent text-dark fw-semibold border-secondary ${errores.tiempo_preparacion ? 'is-invalid' : ''}`}
                name="tiempo_preparacion"
                value={form.tiempo_preparacion}
                onChange={handleChange}
                min={1}
              />
              {errores.tiempo_preparacion && <div className="invalid-feedback">Campo obligatorio</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Ingredientes</label>
              <textarea
                className={`form-control bg-transparent text-dark fw-semibold border-secondary ${errores.ingredientes ? 'is-invalid' : ''}`}
                name="ingredientes"
                value={form.ingredientes}
                onChange={handleChange}
                rows={4}
                placeholder="Un ingrediente por línea"
              />
              {errores.ingredientes && <div className="invalid-feedback">Campo obligatorio</div>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Pasos de preparación</label>
              <textarea
                className={`form-control bg-transparent text-dark fw-semibold border-secondary ${errores.pasos ? 'is-invalid' : ''}`}
                name="pasos"
                value={form.pasos}
                onChange={handleChange}
                rows={5}
                placeholder="1. Paso uno&#10;2. Paso dos..."
              />
              {errores.pasos && <div className="invalid-feedback">Campo obligatorio</div>}
            </div>

            <div className="d-flex gap-2">
              <button type="submit"  className="btn btn-sm fw-bold shadow-sm bg-success-subtle text-success-emphasis border-success-subtle px-3 py-2" disabled={guardando}>
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
