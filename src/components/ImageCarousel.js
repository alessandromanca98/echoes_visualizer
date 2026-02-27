import React from "react";

function ImageCarousel({ folderName, images, currentIndex, setCurrentIndex}) {
  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (images.length === 0) return <p>Caricamento...</p>;

  return (
    <div className="carousel-container">
      <button className="carousel-btn left" onClick={goPrev}>
        ❮
      </button>

      <img
        src={`/images/${folderName}/${images[currentIndex]}`}
        alt={images[currentIndex]}
        className="carousel-image"
      />

      <button className="carousel-btn right" onClick={goNext}>
        ❯
      </button>
    </div>
  );
}

export default ImageCarousel;
