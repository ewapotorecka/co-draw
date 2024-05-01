import React, { useEffect, useState } from "react";

import { Coordinate } from "../interfaces/Coordinate";

const useDetectDrawing = ({
  canvasRef,
  onDraw,
}: {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  onDraw: (coordinates: Coordinate[]) => void;
}) => {
  const [mousePressed, setMousePressed] = useState<boolean>(false);
  const [lastCoordinate, setLastCoordinate] = useState<Coordinate | null>(null);

  const onMouseDown = (e: MouseEvent) => {
    if (e.target !== canvasRef.current) return;

    setMousePressed(true);
    setLastCoordinate({ x: e.offsetX, y: e.offsetY });
  };

  const onMouseMove = (e: MouseEvent) => {
    const canvasPosition = canvasRef.current?.getBoundingClientRect();

    if (!mousePressed || !canvasPosition) {
      return;
    }

    const newCoordinate = {
      x: e.clientX - canvasPosition.left,
      y: e.clientY - canvasPosition.top,
    };

    setLastCoordinate(newCoordinate);

    if (!lastCoordinate) return;

    onDraw([lastCoordinate, newCoordinate]);
  };

  const onMouseUp = () => {
    setMousePressed(false);
    setLastCoordinate(null);
  };

  // Document event listeners will emit events even when the mouse is outside the canvas
  // thanks to that we will catch the mouse up event outside of the canvas.
  // so we can stop drawing even if the mouse goes back to the canvas afterwards.
  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
    };
  });
};

export default useDetectDrawing;
