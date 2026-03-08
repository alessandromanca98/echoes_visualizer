import {React, useState, useRef, useCallback} from "react";
import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Echoes from "./pages/Echoes.jsx";
import PagineColori from "./pages/PagineColori.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const hideTimer = useRef(null);

  const showBar = useCallback(() => {
    setBarVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setBarVisible(false), 2000);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    showBar();
  }, [showBar]);

  const scrollToTop = () => {
    const container = document.querySelector(".gallery-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
    showBar();
  };

  return (
    <div className="app-container">
      <Header />
      <main className="body">
        <Routes>
          <Route path="/" element={<Echoes onPageChange={handlePageChange} setTotalPages={setTotalPages} showBar={showBar} />} />
          <Route path="/echoes" element={<Echoes onPageChange={handlePageChange} setTotalPages={setTotalPages} showBar={showBar} />} />
          <Route path="/pagine-colori" element={<PagineColori onPageChange={handlePageChange} setTotalPages={setTotalPages} showBar={showBar} />} />
        </Routes>
      </main>
      <div
        className="gallery-bar"
        style={{ opacity: barVisible ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        <span className="gallery-page-indicator">{currentPage} / {totalPages}</span>
        <button className="gallery-top-btn" onClick={scrollToTop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
