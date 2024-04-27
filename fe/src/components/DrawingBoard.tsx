import { useEffect, useRef, useState } from "react";

import useDrawing from "../hooks/useDrawing";
import useSockets from "../hooks/useSockets";
import { Coordinate } from "../interfaces/Coordinate";
import { DrawingData } from "../interfaces/DrawingData";
import { draw, finishDrawing, startDrawing } from "../utils/drawing-utils";
import LineToolbar from "./LineToolbar";

function DrawingBoard() {
  const ref = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const [savedCoordinates, setSavedCoordinates] = useState<Coordinate[]>([]);
  const { sendMessage, receivedData } = useSockets<DrawingData>();
  const [style, setStyle] = useState({
    lineWidth: 5,
    strokeColor: "#CCCCCC",
    dashed: true,
  });

  const { onMouseLeave, onMouseEnter, onMouseMove } = useDrawing({
    ctx,
    style,
    updateCoordinates: setSavedCoordinates,
  });

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    setCtx(ctx);
  }, []);

  useEffect(() => {
    sendMessage({
      coordinates: savedCoordinates,
      style,
    });
  }, [savedCoordinates]);

  useEffect(() => {
    if (!ctx || !receivedData) return;

    startDrawing(ctx, receivedData.coordinates[0]);
    draw(ctx, receivedData);
    finishDrawing(ctx);
  }, [receivedData, ctx]);

  return (
    <div>
      <LineToolbar lineStyle={style} onChange={setStyle} />
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <canvas
          style={{
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#FFF",
          }}
          id="canvas"
          width="1000"
          height="500"
          ref={ref}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
          onMouseMove={onMouseMove}
        ></canvas>
      </div>
    </div>
  );
}

export default DrawingBoard;
