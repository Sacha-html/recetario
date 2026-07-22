import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo3 from '../assets/fondo3.jpeg';
import Sacha2 from '../assets/Sacha2.jpeg';

export default function Login() {
  // 1. Estados para guardar lo que el usuario escribe
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });

  // 2. Estado para manejar el mensaje de error rojo
  const [errorLogin, setErrorLogin] = useState('');

  // 3. Estado para deshabilitar el botón mientras "piensa" (cargando)
  const [cargando, setCargando] = useState(false);

  // 4. Herramienta para redireccionar de página
  const navigate = useNavigate();

  // 5. Manejador de cambios (Change Handler) para los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales(prev => ({ ...prev, [name]: value }));
  };

  // 6. Función de envío real al backend (Submit Handler)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLogin('');
    setCargando(true);

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos la marca de éxito en el navegador
        localStorage.setItem('usuarioAutenticado', 'true');
        // Redirigimos al listado principal
        navigate('/');
      } else {
        // Mostramos el error exacto que manda el backend
        setErrorLogin(data.error || 'Correo o contraseña incorrectos.');
        setCargando(false);
      }

    } catch (error) {
      setErrorLogin('Error de conexión con el servidor. Revisá si Node.js está corriendo.');
      setCargando(false);
    }
  };

  // 7. Renderizado visual (Render output)
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        // Asignamos fondo3 como full background
        backgroundImage: `url(${fondo3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '1.2rem',


          backgroundColor: 'rgba(251, 244, 233, 0.90)',


          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',


          border: '1px solid rgba(255, 255, 255, 0.6)'
        }}
      >


        <div className="card-header bg-transparent border-bottom text-center py-4">

          <h1 className="text-dark fw-semibold mb-0">Ingresá a La Cocina de Sacha</h1>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                className="form-control bg-transparent text-dark fw-semibold border-secondary"
                value={credenciales.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold text-dark">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control bg-transparent text-dark fw-semibold border-secondary"
                value={credenciales.password}
                onChange={handleChange}
                required
              />
            </div>

            {errorLogin && (
              <div className="alert alert-danger py-2 text-center fw-bold small shadow-sm">
                {errorLogin}
              </div>
            )}

            <button
              type="submit"
              className="btn w-100 fw-bold shadow-sm bg-success-subtle text-success-emphasis border-success-subtle py-2"
              disabled={cargando}
            >
              {cargando ? 'Verificando...' : 'Ingresar al Recetario'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}