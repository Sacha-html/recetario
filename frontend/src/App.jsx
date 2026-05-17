import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout        from './components/Layout';
import ListaRecetas  from './pages/ListaRecetas';
import FormReceta    from './pages/FormReceta';
import DetalleReceta from './pages/DetalleReceta';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"           element={<ListaRecetas />} />
          <Route path="/nueva"      element={<FormReceta />} />
          <Route path="/editar/:id" element={<FormReceta />} />
          <Route path="/receta/:id" element={<DetalleReceta />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;