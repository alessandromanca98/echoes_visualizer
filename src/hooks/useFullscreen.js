import { useState, useCallback, useEffect } from "react";

const FULLSCREEN_CLASS = "gallery-fullscreen-mode";
const MOBILE_MEDIA = "(max-width: 768px)";

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

function isNativeFullscreenActive() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

function hasCssFullscreenClass() {
  return document.documentElement.classList.contains(FULLSCREEN_CLASS);
}

function prefersCssFullscreen() {
  return window.matchMedia(MOBILE_MEDIA).matches;
}

function setCssFullscreen(active) {
  document.documentElement.classList.toggle(FULLSCREEN_CLASS, active);
}

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(
    () => isNativeFullscreenActive() || hasCssFullscreenClass()
  );

  const toggleFullscreen = useCallback(async () => {
    try {
      if (prefersCssFullscreen()) {
        const next = !hasCssFullscreenClass();
        setCssFullscreen(next);
        setIsFullscreen(next);
        return;
      }

      if (!isNativeFullscreenActive()) {
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
    const handleNativeChange = () => {
      const active = isNativeFullscreenActive();
      setIsFullscreen(active || hasCssFullscreenClass());
      if (!active && !prefersCssFullscreen()) {
        document.documentElement.classList.remove(FULLSCREEN_CLASS);
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape" && hasCssFullscreenClass() && !isNativeFullscreenActive()) {
        setCssFullscreen(false);
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleNativeChange);
    document.addEventListener("webkitfullscreenchange", handleNativeChange);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("fullscreenchange", handleNativeChange);
      document.removeEventListener("webkitfullscreenchange", handleNativeChange);
      document.removeEventListener("keydown", handleKey);
      if (!isNativeFullscreenActive()) {
        document.documentElement.classList.remove(FULLSCREEN_CLASS);
      }
    };
  }, []);

  return { isFullscreen, toggleFullscreen };
}
