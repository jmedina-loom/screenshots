import styled from "@emotion/styled";
import screenshot from "../../../assets/sample.png";
import { Image, Layer, Stage, Text as KonvaText } from "react-konva";
import useImage from "use-image";
import { useStageResizer } from "../../common/UseResize";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";

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
  const { ref, stageDimensions } = useStageResizer();
  const [textItems, setTextItems] = useState<{ x: number; y: number }[]>([]);

  const onClick = (e: KonvaEventObject<MouseEvent>) => {
    console.log(e);

    setTextItems((prev) => [
      ...prev,
      {
        x: e.evt.layerX,
        y: e.evt.layerY,
      },
    ]);
  };

  return (
    <ImageWrapper ref={ref} data-id="image-wrapper">
      <Stage
        width={stageDimensions.width}
        height={stageDimensions.height}
        onClick={onClick}
      >
        <Layer>
          <ScreenshotImage
            width={stageDimensions.width}
            height={stageDimensions.height}
          />
          {textItems.map(({ x, y }, idx) => (
            <KonvaText
              key={`text-${x}-${y}-${idx}`}
              text="Some text on canvas"
              x={x}
              y={y}
              fontSize={15}
            />
          ))}
        </Layer>
      </Stage>
    </ImageWrapper>
  );
}
