export default function ModalConfirmar({ mensaje, onConfirmar, onCancelar }) {
  return (
    <>
      {/* Fondo oscuro */}
      <div className="modal-backdrop fade show" />

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Confirmar acción</h5>
              <button className="btn-close" onClick={onCancelar} />
            </div>

            <div className="modal-body">
              <p>{mensaje}</p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCancelar}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={onConfirmar}>
                Confirmar
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}