import React, { useEffect, useRef, useCallback } from "react";

function ImageGallery({ folderName, images, setImages, onPageChange, setTotalPages, showBar }) {
  const imageRefs = useRef([]);

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch(`/images/${folderName}/manifest.json`);
        if (!response.ok) throw new Error("Manifest non trovato");
        const data = await response.json();
        const sorted = data.sort((a, b) => a.localeCompare(b));
        setImages(sorted);
        setTotalPages?.(sorted.length);
      } catch (err) {
        console.error(err);
      }
    }
    loadImages();
  }, [folderName]);

  useEffect(() => {
    if (images.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target);
            if (index !== -1) onPageChange?.(index + 1);
          }
        });
      },
      { threshold: 0.3 }
    );
    imageRefs.current.forEach((img) => { if (img) observer.observe(img); });
    return () => observer.disconnect();
  }, [images, onPageChange]);

  return (
    <div
      className="gallery-container"
      onMouseMove={showBar}
      onTouchMove={showBar}
    >
      {images.map((name, index) => (
        <img
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          src={`/images/${folderName}/${name}`}
          alt={name}
          className="gallery-image"
          loading="lazy"
        />
      ))}
    </div>
  );
}

export default ImageGallery;