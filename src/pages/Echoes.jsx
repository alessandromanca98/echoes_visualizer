import React, { useState, useEffect } from "react"; 
import ImageGallery from "../components/ImageGallery";
import SubMenu from "../components/SubMenu";
import ImageCarousel from "../components/ImageCarousel";

function Echoes() {
  const [verticalScroll, setVerticalScroll] = useState(() => {
    const saved = localStorage.getItem("echoes_verticalScroll");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem("echoes_currentIndex");
    return saved !== null ? JSON.parse(saved) : 0;
  });

  // Persisti verticalScroll su localStorage quando cambia
  useEffect(() => {
    localStorage.setItem("echoes_verticalScroll", JSON.stringify(verticalScroll));
  }, [verticalScroll]);

  // Persisti currentIndex su localStorage quando cambia
  useEffect(() => {
    localStorage.setItem("echoes_currentIndex", JSON.stringify(currentIndex));
  }, [currentIndex]);

  // Carica immagini UNA SOLA VOLTA
  useEffect(() => {
    async function loadImages() {
      const response = await fetch(`/images/echoes/manifest.json`);
      const data = await response.json();
      setImages(data.sort((a, b) => a.localeCompare(b)));
    }

    loadImages();
  }, []);

  return (
    <div>
      <div className="gallery-wrapper">
        <SubMenu 
          verticalScroll={verticalScroll}
          setVerticalScroll={setVerticalScroll}
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        {verticalScroll ? (
          <ImageGallery folderName="echoes" images={images} setImages={setImages}/>
        ) : (
          <ImageCarousel folderName="echoes"
            images={images}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </div>
    </div>
  );
}

export default Echoes;