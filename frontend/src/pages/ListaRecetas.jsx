import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRecetas, getCategorias, bajaReceta } from '../services/api';
import ModalConfirmar from '../components/ModalConfirmar';


export default function ListaRecetas() {
  const [recetas,    setRecetas]    = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro,     setFiltro]     = useState('');
  const [cargando,   setCargando]   = useState(true);
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

  const cargar = async () => {
    setCargando(true);
    const [r, c] = await Promise.all([getRecetas(), getCategorias()]);
    setRecetas(r);
    setCategorias(c);
    setCargando(false);
  };

  useEffect(() => { cargar(); }, []);

  const abrirModal = (id, nombre) => {
    setRecetaSeleccionada({ id, nombre });
    setMostrarModal(true);
};

  const handleBaja = async () => {
    await bajaReceta(recetaSeleccionada.id);
    setMostrarModal(false);
    cargar();
 };

  const recetasFiltradas = filtro
    ? recetas.filter(r => r.categoria === filtro)
    : recetas;

  if (cargando) return <div className="mt-4">Cargando...</div>;

  return (
    <>
      
      
      <h1 className="mt-4">Recetas</h1>
      <ol className="breadcrumb mb-4">
     </ol>

      <div className="card mb-4 bg-transparent border-1">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Listado de recetas</span>
          <Link to="/nueva" className="btn btn-sm fw-bold shadow-sm bg-success-subtle text-success-emphasis border-success-subtle px-3 py-2">+ Nueva receta</Link>
        </div>
        <div className="card mb-4 bg-transparent border-0">

          {/* Filtro por categoría */}
          <div className="mb-3" style={{ maxWidth: 280 }}>
            <select
              className="form-select form-select-sm bg-transparent border-0 text-dark fw-semibold"
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map(c => (
                <option key={c.id_categoria} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
          </div>


          {/* Tabla */}
          {recetasFiltradas.length === 0 ? (
            <p className="text-muted">No hay recetas para mostrar.</p>
          ) : (
            <table className="table table-hover align-middle"style={{ '--bs-table-bg': 'transparent' }}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Tiempo (min)</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recetasFiltradas.map(r => (
                  <tr key={r.id_receta}>
                    <td>
                      <Link to={`/receta/${r.id_receta}`}className="text-dark fw-bold text-decoration-none">{r.nombre}</Link>
                    </td>
                    <td><span className="badge bg-secondary">{r.categoria}</span></td>
                    <td>{r.tiempo_preparacion ?? '—'}</td>
                    <td className="text-center">
                      <button
className="btn btn-sm me-2 fw-bold shadow-sm bg-primary-subtle text-primary-emphasis border-primary-subtle"                        onClick={() => navigate(`/editar/${r.id_receta}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm fw-bold shadow-sm bg-danger-subtle text-danger-emphasis border-danger-subtle"
                        onClick={() => abrirModal(r.id_receta, r.nombre)}
                      >
                        Dar de baja
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {mostrarModal && (
        <ModalConfirmar
            mensaje={`¿Dar de baja la receta "${recetaSeleccionada.nombre}"?`}
            onConfirmar={handleBaja}
            onCancelar={() => setMostrarModal(false)}
        />
        )}
    </>
  );
}