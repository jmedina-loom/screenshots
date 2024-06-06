import Konva from "konva";
import { useEditStore } from "../../store/EditStore";
import { MutableRefObject, useEffect } from "react";

export function useDownloadImage(
  stageRef: MutableRefObject<Konva.Stage | undefined>
) {
  const { downloadImg, setDownloadImg } = useEditStore();

  useEffect(() => {
    if (downloadImg && stageRef.current) {
      const url = stageRef.current.toDataURL({
        pixelRatio: 2,
      });

      downloadURI(url, "update-screenshot.png");

      setDownloadImg(false);
    }
  }, [downloadImg, stageRef, setDownloadImg]);
}

function downloadURI(uri: string, name: string) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
