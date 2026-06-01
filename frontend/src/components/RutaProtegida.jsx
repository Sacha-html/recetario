
import { Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout'; 

export default function RutaProtegida() {
  const estaLogueado = localStorage.getItem('usuarioAutenticado');

  if (!estaLogueado) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet /> 
    </Layout>
  );
}