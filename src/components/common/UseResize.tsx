import { useLayoutEffect, useRef, useState } from "react";

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 744;

export function useStageResizer() {
  const [stageDimensions, setStageDimensions] = useState({
    width: 1200,
    height: 744,
  });
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const resizeHandler = () => {
      if (!ref.current) {
        return;
      }

      const sceneWidth = DEFAULT_WIDTH;
      const containerWidth = Math.min(sceneWidth, ref.current.offsetWidth);
      const sceneHeight = DEFAULT_HEIGHT;
      const scale = containerWidth / sceneWidth;

      setStageDimensions(() => ({
        width: sceneWidth * scale,
        height: sceneHeight * scale,
      }));
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return {
    ref,
    stageDimensions,
  };
}
