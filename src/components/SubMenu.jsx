import React from "react";

function SubMenu({ 
    verticalScroll, 
    setVerticalScroll,
    images = [],   
    currentIndex,
    setCurrentIndex,
    isFullscreen,
    onToggleFullscreen,
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

      <div className="sub-menu-right">
        {!verticalScroll && (
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
        )}
        <button
          type="button"
          className="fullscreen-btn"
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? "Esci da schermo intero" : "Schermo intero"}
          title={isFullscreen ? "Esci da schermo intero" : "Schermo intero"}
        >
          {isFullscreen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default SubMenu;
