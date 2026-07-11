import { useState, useCallback, useEffect } from "react";

const FULLSCREEN_CLASS = "gallery-fullscreen-mode";

function requestFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  return Promise.reject(new Error("Fullscreen non supportato"));
}

function exitFullscreen() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  return Promise.reject(new Error("Fullscreen non supportato"));
}

function isFullscreenActive() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreenActive()) {
        await requestFullscreen();
        document.documentElement.classList.add(FULLSCREEN_CLASS);
      } else {
        await exitFullscreen();
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const handleChange = () => {
      const active = isFullscreenActive();
      setIsFullscreen(active);
      if (!active) {
        document.documentElement.classList.remove(FULLSCREEN_CLASS);
      }
    };

    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
      document.documentElement.classList.remove(FULLSCREEN_CLASS);
    };
  }, []);

  return { isFullscreen, toggleFullscreen };
}
