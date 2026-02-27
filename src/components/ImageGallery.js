import React, { useEffect, useState } from "react";

function ImageGallery({ folderName, images, setImages }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`/images/${folderName}/manifest.json`);

        if (!response.ok) {
          throw new Error("Manifest non trovato");
        }

        const data = await response.json();

        // Ordiniamo per sicurezza (anche se già ordinato dallo script)
        const sorted = data.sort((a, b) => a.localeCompare(b));

        setImages(sorted);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, [folderName]);

  if (loading) return <p>Caricamento immagini...</p>;
  if (error) return <p>Errore nel caricamento delle immagini.</p>;

  return (
    <div className="gallery-container">
      {images.map((name, index) => (
        <img
          key={index}
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
