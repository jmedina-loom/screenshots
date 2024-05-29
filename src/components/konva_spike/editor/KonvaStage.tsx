import styled from "@emotion/styled";
import screenshot from "../../../assets/sample.png";
import {
  Image,
  Layer,
  Stage,
  Text as KonvaText,
  Rect as KonvaRect,
  Arrow as KonvaArrow,
} from "react-konva";
import useImage from "use-image";
import { useStageResizer } from "../../common/UseResize";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { EditMode, useEditStore } from "../../../store/EditStore";

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

type Item = {
  action: EditMode;
  x: number;
  y: number;
};

export function KonvaStage() {
  const { editMode } = useEditStore();
  const { ref, stageDimensions } = useStageResizer();
  const [items, setItems] = useState<Item[]>([]);

  const onClick = (e: KonvaEventObject<MouseEvent>) => {
    if (editMode) {
      setItems((prev) => [
        ...prev,
        {
          x: e.evt.layerX,
          y: e.evt.layerY,
          action: editMode,
        },
      ]);
    }
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
          {items.map(({ x, y, action }, idx) => {
            if (action === EditMode.Text) {
              return (
                <KonvaText
                  key={`text-${x}-${y}-${idx}`}
                  text="Some text on canvas"
                  x={x}
                  y={y}
                  fontSize={15}
                />
              );
            }

            if (action === EditMode.Arrow) {
              return (
                <KonvaArrow
                  key={`arrow-${x}-${y}-${idx}`}
                  stroke="black"
                  fill="black"
                  pointerLength={5}
                  pointerWidth={5}
                  pointerAtBeginning
                  pointerAtEnding={false}
                  points={[x, y, x - 100, y]}
                  width={5}
                />
              );
            }

            return (
              <KonvaRect
                key={`rect-${x}-${y}-${idx}`}
                x={x}
                y={y}
                width={100}
                height={50}
                stroke="red"
                strokeWidth={2}
              />
            );
          })}
        </Layer>
      </Stage>
    </ImageWrapper>
  );
}
