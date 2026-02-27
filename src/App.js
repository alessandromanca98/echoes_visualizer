import React from "react";
import Header from "./components/Header.js";
import Body from "./components/Body";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Echoes from "./pages/Echoes";
import PagineColori from "./pages/PagineColori";

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
