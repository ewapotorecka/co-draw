import { useEffect, useRef, useState } from "react";

import useDetectDrawing from "../../hooks/useDetectDrawing";
import useSockets from "../../hooks/useSockets";
import { Coordinate } from "../../interfaces/Coordinate";
import { DrawingData } from "../../interfaces/DrawingData";
import { draw } from "../../utils/drawing-utils";

const useDrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [style, setStyle] = useState({
    lineWidth: 5,
    strokeColor: "#CCCCCC",
  });

  useDetectDrawing({
    canvasRef,
    onDraw: handleDrawing,
  });

  const sendDrawingEvent = useSockets<DrawingData>({
    eventName: "drawing",
    onEventReceived: (data) => ctx && draw(ctx, data),
  });

  const clearRemoteCanvas = useSockets<void>({
    eventName: "clear",
    onEventReceived: clearCanvasFromRemote,
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

  return {
    style,
    setStyle,
    clearCanvasFromLocal,
    canvasRef,
  };
};

export default useDrawingBoard;
