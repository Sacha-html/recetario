export default function Layout({ children }) {
  return (
    <>
      {/* Navbar superior */}
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3" href="/">📖 Recetario "La Cocina de Sacha"</a>
      </nav>

      <div id="layoutSidenav">
        {/* Sidebar */}
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Menú</div>
                <a className="nav-link" href="/">
                  <div className="sb-nav-link-icon"><i className="fas fa-utensils"></i></div>
                  Recetas
                </a>
                <a className="nav-link" href="/nueva">
                  <div className="sb-nav-link-icon"><i className="fas fa-plus"></i></div>
                  Nueva receta
                </a>
              </div>
            </div>
          </nav>
        </div>

        {/* Contenido principal */}
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              {children}
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <span className="text-muted">Recetario &copy; 2025</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}