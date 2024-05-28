import styled from "@emotion/styled";
import screenshot from "../../../assets/sample.png";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { useLayoutEffect, useRef, useState } from "react";

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 744;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px solid blue; */
`;

const ScreenshotImage = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const [image] = useImage(screenshot);
  return <Image image={image} width={width} height={height} />;
};

export function KonvaStage() {
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

  return (
    <ImageWrapper ref={ref} data-id="image-wrapper">
      <Stage width={stageDimensions.width} height={stageDimensions.height}>
        <Layer>
          <ScreenshotImage
            width={stageDimensions.width}
            height={stageDimensions.height}
          />
        </Layer>
      </Stage>
    </ImageWrapper>
  );
}
