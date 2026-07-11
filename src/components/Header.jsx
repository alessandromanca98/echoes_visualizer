import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const isEchoes = pathname === "/" || pathname === "/echoes";

  return (
    <header className="header">
      <NavLink to="/echoes">
        <img className="logo" src="../images/logo.png" alt="Echoes" height="45" />
      </NavLink>
      <nav>
        <NavLink to="/echoes" className={isEchoes ? "active" : undefined}>
          Echoes
        </NavLink>
        <NavLink to="/pagine-colori">Pagine a colori</NavLink>
      </nav>
    </header>
  );
}

export default Header;
