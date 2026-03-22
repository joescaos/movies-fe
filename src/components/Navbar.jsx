import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <NavLink to="/" className="site-nav-brand" end>
          Inicio
        </NavLink>
        <nav className="site-nav-links" aria-label="Principal">
          <NavLink
            to="/items"
            className={({ isActive }) =>
              `site-nav-link${isActive ? " is-active" : ""}`
            }
          >
            Listado
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
