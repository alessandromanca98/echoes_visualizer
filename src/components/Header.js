import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img className="logo" src="../images/logo.png"height={"60"}/>
      <nav>
        <Link to="/echoes">Echoes</Link>
        <Link to="/pagine-colori">Pagine a colori</Link>
      </nav>
    </header>
  );
}

export default Header;
