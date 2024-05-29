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
import { useCallback, useState } from "react";
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

type Item =
  | {
      action: EditMode.Text;
      x: number;
      y: number;
    }
  | {
      action: EditMode.Rectangle;
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      action: EditMode.Arrow;
      points: number[];
    };

export function KonvaStage() {
  const { editMode } = useEditStore();
  const { ref, stageDimensions } = useStageResizer();
  const [items, setItems] = useState<Item[]>([]);
  const [drawing, setDrawing] = useState(false);

  const onClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (editMode === EditMode.Text) {
        setItems((prev) => [
          ...prev,
          {
            x: e.evt.layerX,
            y: e.evt.layerY,
            action: editMode,
          },
        ]);
      }
    },
    [editMode]
  );

  const onMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (editMode === EditMode.Arrow) {
        setDrawing(true);
        setItems((prev) => [
          ...prev,
          {
            action: editMode,
            points: [e.evt.layerX, e.evt.layerY, e.evt.layerX, e.evt.layerY],
          },
        ]);
      }

      if (editMode === EditMode.Rectangle) {
        setDrawing(true);
        setItems((prev) => [
          ...prev,
          {
            action: editMode,
            x: e.evt.layerX,
            y: e.evt.layerY,
            width: 0,
            height: 0,
          },
        ]);
      }
    },
    [editMode]
  );

  const onMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!drawing) {
        return;
      }

      if (editMode === EditMode.Arrow) {
        setItems((prev) => {
          const item = prev[prev.length - 1];

          if (item.action === EditMode.Arrow) {
            // this should be the case
            const points = item.points;

            points[2] = e.evt.layerX;
            points[3] = e.evt.layerY;

            const firstItems = prev.slice(0, prev.length - 1);

            return [
              ...firstItems,
              {
                ...item,
                points,
              },
            ];
          } else {
            console.log("last item isnt an arrow");
            return prev;
          }
        });
      }

      if (editMode === EditMode.Rectangle) {
        setItems((prev) => {
          const item = prev[prev.length - 1];

          if (item.action === EditMode.Rectangle) {
            const startX = item.x;
            const startY = item.y;
            const currentX = e.evt.layerX;
            const currentY = e.evt.layerY;

            const width = Math.abs(startX - currentX);
            const height = Math.abs(startY - currentY);

            item.width = width;
            item.height = height;

            const firstItems = prev.slice(0, prev.length - 1);

            return [...firstItems, item];
          }

          console.log("last item isnt rect");
          return prev;
        });
      }
    },
    [editMode, drawing]
  );

  const onMouseUp = useCallback(() => {
    console.log("done drawing an arrow");
    setDrawing(false);
  }, []);

  console.log(items.length);

  return (
    <ImageWrapper ref={ref} data-id="image-wrapper">
      <Stage
        width={stageDimensions.width}
        height={stageDimensions.height}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <Layer>
          <ScreenshotImage
            width={stageDimensions.width}
            height={stageDimensions.height}
          />
          {items.map((item, idx) => {
            if (item.action === EditMode.Text) {
              return (
                <KonvaText
                  key={`text-${item.x}-${item.y}-${idx}`}
                  text="Some text on canvas"
                  x={item.x}
                  y={item.y}
                  fontSize={15}
                />
              );
            }

            if (item.action === EditMode.Arrow) {
              return (
                <KonvaArrow
                  key={`arrow-${item.points[2]}-${item.points[3]}-${idx}`}
                  stroke="black"
                  fill="black"
                  pointerLength={5}
                  pointerWidth={5}
                  points={item.points}
                  width={5}
                />
              );
            }

            return (
              <KonvaRect
                key={`rect-${item.width}-${item.height}-${idx}`}
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
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
