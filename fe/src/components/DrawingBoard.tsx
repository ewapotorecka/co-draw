import { useEffect, useRef, useState } from "react";

import useDetectDrawing from "../hooks/useDetectDrawing";
import useSockets from "../hooks/useSockets";
import { Coordinate } from "../interfaces/Coordinate";
import { DrawingData } from "../interfaces/DrawingData";
import { draw } from "../utils/drawing-utils";
import Toolbar from "./Toolbar";

function DrawingBoard() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const sendDrawingEvent = useSockets<DrawingData>({
    eventName: "drawing",
    onEventReceived: (data) => ctx && draw(ctx, data),
  });

  const clearRemoteCanvas = useSockets<void>({
    eventName: "clear",
    onEventReceived: clearCanvasFromRemote,
  });

  const [style, setStyle] = useState({
    lineWidth: 5,
    strokeColor: "#CCCCCC",
    dashed: false,
  });

  const { onMouseLeave, onMouseEnter, onMouseMove } = useDetectDrawing({
    ctx,
    onDraw: handleDrawing,
  });

  function handleDrawing(coordinates: Coordinate[]) {
    const data: DrawingData = {
      coordinates,
      style,
    };

    if (ctx) {
      sendDrawingEvent(data);
      draw(ctx, data);
    }
  }

  function clearCanvasFromRemote() {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function clearCanvasFromLocal() {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    clearRemoteCanvas();
  }

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    setCtx(ctx);
  }, []);

  return (
    <div>
      <Toolbar
        lineStyle={style}
        onChange={setStyle}
        onClear={clearCanvasFromLocal}
      />
      <canvas
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FFF",
        }}
        id="canvas"
        width="1000"
        height="500"
        ref={canvasRef}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
      ></canvas>
    </div>
  );
}

export default DrawingBoard;
