import React, { useState, useEffect } from "react"; 
import ImageGallery from "../components/ImageGallery";
import SubMenu from "../components/SubMenu";
import ImageCarousel from "../components/ImageCarousel";
import { useFullscreen } from "../hooks/useFullscreen";

function Echoes({onPageChange, setTotalPages, showBar, setVerticalScroll: setVerticalScrollMode}) {
  const [verticalScroll, setVerticalScroll] = useState(() => {
    const saved = localStorage.getItem("echoes_verticalScroll");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem("echoes_currentIndex");
    return saved !== null ? JSON.parse(saved) : 0;
  });

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // Persisti verticalScroll su localStorage quando cambia
  useEffect(() => {
    localStorage.setItem("echoes_verticalScroll", JSON.stringify(verticalScroll));
  }, [verticalScroll]);

  useEffect(() => {
    setVerticalScrollMode?.(verticalScroll);
  }, [verticalScroll, setVerticalScrollMode]);

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

  useEffect(() => {
    if (images.length > 0) setTotalPages?.(images.length);
  }, [images, setTotalPages]);

  return (
    <div>
      <div className="gallery-wrapper">
        <SubMenu 
          verticalScroll={verticalScroll}
          setVerticalScroll={setVerticalScroll}
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
        {verticalScroll ? (
          <ImageGallery 
          folderName="echoes" 
          images={images} 
          setImages={setImages} 
          onPageChange={onPageChange} 
          setTotalPages={setTotalPages}
          showBar={showBar}
          />
        ) : (
          <ImageCarousel folderName="echoes"
            images={images}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onPageChange={onPageChange}
            showBar={showBar}
          />
        )}
      </div>
    </div>
  );
}

export default Echoes;