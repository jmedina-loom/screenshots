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
import Konva from "konva";
import useImage from "use-image";
import { useStageResizer } from "../../common/UseResize";
import { KonvaEventObject } from "konva/lib/Node";
import { useCallback, useState } from "react";
import { EditMode, useEditStore } from "../../../store/EditStore";

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
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
      text: string;
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
  const [editText, setEditText] = useState({
    itemIndex: -1,
    editing: false,
    x: 0,
    y: 0,
    width: 0,
    textValue: "",
  });

  const onClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (editText.editing) {
        // update the items first

        setItems((prev) => {
          const item = prev[editText.itemIndex];

          if (item.action === EditMode.Text) {
            item.text = editText.textValue;

            const before = prev.slice(0, editText.itemIndex);
            const after = prev.slice(editText.itemIndex + 1);

            return [...before, item, ...after];
          }

          return prev;
        });

        setEditText({
          itemIndex: -1,
          editing: false,
          x: 0,
          y: 0,
          width: 0,
          textValue: "",
        });
        return;
      }

      if (editMode === EditMode.Text) {
        console.log("global click");
        setItems((prev) => [
          ...prev,
          {
            x: e.evt.layerX,
            y: e.evt.layerY,
            text: "Some text on canvas",
            action: editMode,
          },
        ]);
      }
    },
    [editText, editMode]
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
    if (editMode === EditMode.Arrow || editMode === EditMode.Rectangle) {
      console.log("done drawing");
      setDrawing(false);
    }
  }, [editMode]);

  const onTextClick = useCallback(
    (e: KonvaEventObject<MouseEvent>, itemIndex: number) => {
      e.cancelBubble = true;

      const target = e.target as Konva.Text;

      console.log("text i am being clicked", e);
      setEditText({
        editing: true,
        x: target.attrs.x + target.textWidth - 5,
        y: target.attrs.y - 5,
        width: target.textWidth + 20,
        textValue: target.attrs.text,
        itemIndex,
      });

      return false;
    },
    []
  );

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setEditText((prev) => ({
      ...prev,
      textValue: value,
    }));
  };

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
                  text={item.text}
                  x={item.x}
                  y={item.y}
                  fontSize={25}
                  onClick={(e) => onTextClick(e, idx)}
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
      <input
        placeholder="Placeholder"
        value={editText.textValue}
        onChange={onTextChange}
        style={{
          position: "absolute",
          width: `${editText.width}px`,
          top: `${editText.y}px`,
          left: `${editText.x}px`,
          fontSize: "25px",
          visibility: editText.editing ? "visible" : "hidden",
        }}
      />
    </ImageWrapper>
  );
}
