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

  if (images.length === 0) return <p>Caricamento...</p>;

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
        style={{ opacity: buttonsVisible ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        ❮
      </button>
      <img
        src={`/images/${folderName}/${images[currentIndex]}`}
        alt={images[currentIndex]}
        className="carousel-image"
      />
      <button
        className="carousel-btn right"
        onClick={goNext}
        style={{ opacity: buttonsVisible ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        ❯
      </button>
    </div>
  );
}

export default ImageCarousel;