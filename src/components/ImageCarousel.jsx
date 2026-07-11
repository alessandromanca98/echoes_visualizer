import React, { useState, useEffect, useRef } from "react";

function ImageCarousel({ folderName, images, currentIndex, setCurrentIndex }) {
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const hideTimer = useRef(null);

  const showButtons = () => {
    setButtonsVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setButtonsVisible(false), 2000);
  };

  // Nascondi dopo 2s al mount
  useEffect(() => {
    hideTimer.current = setTimeout(() => setButtonsVisible(false), 2000);
    return () => clearTimeout(hideTimer.current);
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => prev === images.length - 1 ? prev : prev + 1);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => prev === 0 ? 0 : prev - 1);
  };

  if (images.length === 0) return <p className="loading-text">Caricamento...</p>;

  const btnStyle = { opacity: buttonsVisible ? 1 : 0, transition: "opacity 0.4s ease" };

  return (
    <div
      className="carousel-container"
      onMouseMove={showButtons}
      onTouchStart={showButtons}
      onTouchMove={showButtons}
    >
      <button
        className="carousel-btn left"
        onClick={goPrev}
        aria-label="Pagina precedente"
        style={btnStyle}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <img
        src={`/images/${folderName}/${images[currentIndex]}`}
        alt={images[currentIndex]}
        className="carousel-image"
      />
      <button
        className="carousel-btn right"
        onClick={goNext}
        aria-label="Pagina successiva"
        style={btnStyle}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

export default ImageCarousel;