import React, { useState, useEffect } from "react"; 
import ImageGallery from "../components/ImageGallery";
import SubMenu from "../components/SubMenu";
import ImageCarousel from "../components/ImageCarousel";

function PagineColori() {
  const [verticalScroll, setVerticalScroll] = useState(() => {
    const saved = localStorage.getItem("colori_verticalScroll");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem("colori_currentIndex");
    return saved !== null ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("colori_verticalScroll", JSON.stringify(verticalScroll));
  }, [verticalScroll]);

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
          <ImageGallery folderName="colori" images={images} setImages={setImages}/>
        ) : (
          <ImageCarousel folderName="colori" 
            images={images}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </div>
    </div>
  );
}

export default PagineColori;