import { useNavigate, Link } from 'react-router-dom'; // 💡 Cambiamos las etiquetas <a> por <Link>
import fondo3 from '../assets/fondo3.jpeg';
import Sacha2 from '../assets/Sacha2.jpeg';

export default function Layout({ children }) {
  const navigate = useNavigate(); // Hook para controlar el redireccionamiento

  // 💡 MANEJADOR DE EVENTOS (Event handler) para el cierre de sesión
  const handleLogout = () => {
    // Eliminamos la credencial de la memoria local del navegador
    localStorage.removeItem('usuarioAutenticado');
    
    // Mandamos al usuario de patitas a la pantalla de ingreso
    navigate('/login');
  };

  return (
    <>
      {/* 1. TOP NAVBAR */}
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          
          {/* Bloque Izquierdo: Logo */}
          <Link className="navbar-brand d-flex align-items-center gap-2 m-0" to="/">
            <img 
              src={Sacha2} 
              alt="Logo La Cocina de Sacha" 
              className="img-fluid"
              style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} 
            />
            <span className="fw-bold h5 m-0 text-white">La Cocina de Sacha</span>
          </Link>

          {/* Bloque Derecho: Menú y Botón de Salida */}
          <div className="navbar-nav d-flex align-items-center gap-3">
            <Link className="nav-link fw-semibold px-2 text-white-50" to="/">
              <i className="fas fa-utensils me-2"></i>Recetas
            </Link>
            <Link className="nav-link fw-semibold px-2 text-white-50" to="/nueva">
              <i className="fas fa-plus me-2"></i>Nueva receta
            </Link>
            
            {/* 💡 BOTÓN DE LOGOUT: Estilo rojo pastel integrado */}
            <button 
              className="btn btn-sm fw-bold shadow-sm bg-danger-subtle text-danger-emphasis border-danger-subtle ms-2 px-3"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt me-1"></i> Salir
            </button>
          </div>

        </div>
      </nav>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 247, 235, 0.70), rgba(255, 247, 235, 0.70)), url(${fondo3})`,
          backgroundSize: 'cover',     
          backgroundRepeat: 'no-repeat',  
          backgroundPosition: 'center',  
          backgroundAttachment: 'fixed', 
          minHeight: 'calc(100vh - 76px)', 
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <main className="flex-grow-1">
          <div className="container-fluid px-4 mt-4">
            {children}
          </div>
        </main>
        
        {/* Footer fijo al final */}
        <footer className="py-1 bg-dark mt-auto border-top border-secondary">
          <div className="container-fluid px-4 d-flex align-items-center" style={{ minHeight: '30px' }}>
            <span className="text-white-50 fw-semibold" style={{ fontSize: '0.9rem' }}>
              Recetario &copy; 2026 — La Cocina de Sacha
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}