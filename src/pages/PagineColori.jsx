import React, { useState, useEffect, useLayoutEffect } from "react"; 
import ImageGallery from "../components/ImageGallery";
import SubMenu from "../components/SubMenu";
import ImageCarousel from "../components/ImageCarousel";
import { useFullscreen } from "../hooks/useFullscreen";

function PagineColori({onPageChange, setTotalPages, showBar, setVerticalScroll: setVerticalScrollMode}) {
  const [verticalScroll, setVerticalScroll] = useState(() => {
    const saved = localStorage.getItem("colori_verticalScroll");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem("colori_currentIndex");
    return saved !== null ? JSON.parse(saved) : 0;
  });

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  useEffect(() => {
    localStorage.setItem("colori_verticalScroll", JSON.stringify(verticalScroll));
  }, [verticalScroll]);

  useLayoutEffect(() => {
    setVerticalScrollMode?.(verticalScroll);
  }, [verticalScroll, setVerticalScrollMode]);

  useEffect(() => {
    localStorage.setItem("colori_currentIndex", JSON.stringify(currentIndex));
  }, [currentIndex]);

  useEffect(() => {
    async function loadImages() {
      const response = await fetch(`/images/colori/manifest.json`);
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
            folderName="colori" 
            images={images} 
            setImages={setImages} 
            onPageChange={onPageChange} 
            setTotalPages={setTotalPages}
            showBar={showBar}
          />
          ) : (
          <ImageCarousel folderName="colori" 
            images={images}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}

export default PagineColori;