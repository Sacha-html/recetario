import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getReceta, bajaReceta } from '../services/api';
import ModalConfirmar from '../components/ModalConfirmar';

export default function DetalleReceta() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const [receta,   setReceta]   = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    getReceta(id)
      .then(setReceta)
      .finally(() => setCargando(false));
  }, [id]);

  const handleBaja = async () => {
    await bajaReceta(id);
    navigate('/');
  };

  const toLineas = texto =>
    texto ? texto.split('\n').filter(l => l.trim()) : [];

  if (cargando) return <div className="mt-4">Cargando...</div>;

  return (
    <>
      <h1 className="mt-4">{receta.nombre}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item"><Link to="/">Recetas</Link></li>
        <li className="breadcrumb-item active">Detalle</li>
      </ol>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>
            <span className="badge bg-secondary me-2">{receta.categoria}</span>
            {receta.tiempo_preparacion && `⏱ ${receta.tiempo_preparacion} min`}
          </span>
          <div className="d-flex gap-2">
            <Link to={`/editar/${id}`} className="btn btn-outline-primary btn-sm">Editar</Link>
            <button className="btn btn-outline-danger btn-sm" onClick={() => setMostrarModal(true)}>
                Dar de baja
            </button>
          </div>
        </div>
        <div className="card-body">

          {receta.descripcion && (
            <p className="text-muted mb-4">{receta.descripcion}</p>
          )}

          <div className="row g-4">
            <div className="col-md-4">
              <h5 className="fw-bold border-bottom pb-2">Ingredientes</h5>
              {toLineas(receta.ingredientes).length > 0 ? (
                <ul className="list-group list-group-flush">
                  {toLineas(receta.ingredientes).map((ing, i) => (
                    <li key={i} className="list-group-item px-0">{ing}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Sin ingredientes cargados.</p>
              )}
            </div>

            <div className="col-md-8">
              <h5 className="fw-bold border-bottom pb-2">Preparación</h5>
              {toLineas(receta.pasos).length > 0 ? (
                <ol className="ps-3">
                  {toLineas(receta.pasos).map((paso, i) => (
                    <li key={i} className="mb-2">{paso.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted">Sin pasos cargados.</p>
              )}
            </div>
          </div>

          <p className="text-muted small mt-4">
            Creada el {new Date(receta.fecha_creacion).toLocaleDateString('es-AR')}
          </p>
        </div>
      </div>
      {mostrarModal && (
        <ModalConfirmar
            mensaje={`¿Dar de baja la receta "${receta.nombre}"?`}
            onConfirmar={handleBaja}
            onCancelar={() => setMostrarModal(false)}
        />
        )}
    </>
  );
}
