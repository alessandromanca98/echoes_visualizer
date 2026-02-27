import React from "react";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Echoes from "./pages/Echoes.jsx";
import PagineColori from "./pages/PagineColori.jsx";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="body">
        <Routes>
          <Route path="/" element={<Echoes />} />
          <Route path="/echoes" element={<Echoes />} />
          <Route path="/pagine-colori" element={<PagineColori />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
