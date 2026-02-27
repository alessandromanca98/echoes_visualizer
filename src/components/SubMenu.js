import React from "react";

function SubMenu({ 
    verticalScroll, 
    setVerticalScroll,
    images = [],   
    currentIndex,
    setCurrentIndex
 }) {
    const isLoading = images.length === 0;

  return (
    <div className="sub-menu">
      <div className="sub-menu-left">
        <span className="switch-label">
          Scorrimento verticale
        </span>

        <label className="switch">
          <input type="checkbox" 
             checked={verticalScroll}
             onChange={() => setVerticalScroll(!verticalScroll)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Dropdown visibile SOLO in modalità carousel */}
        {!verticalScroll && (
          <div className="sub-menu-right">
          <select
            value={currentIndex}
            onChange={(e) => setCurrentIndex(Number(e.target.value))}
            className="image-select"
            disabled={isLoading}
          >
            {isLoading ? (
              <option>Caricamento...</option>
            ) : (
              images.map((img, index) => (
                <option key={index} value={index}>
                  Pagina {index + 1}
                </option>
              ))
            )}
          </select>
        </div>
      )}
    </div>
  );
}

export default SubMenu;
