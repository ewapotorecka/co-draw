import React, { useEffect, useState } from "react";

import { Coordinate } from "../interfaces/Coordinate";

const useDetectDrawing = ({
  ctx,
  onDraw,
}: {
  ctx: CanvasRenderingContext2D | null;
  onDraw: (coordinates: Coordinate[]) => void;
}) => {
  const [mousePressed, setMousePressed] = useState<boolean>(false);
  const [lastCoordinate, setLastCoordinate] = useState<Coordinate | null>(null);

  const onMouseDown = (e: MouseEvent) => {
    if (!ctx) return;
    if (e.target !== ctx.canvas) return;

    setMousePressed(true);
    setLastCoordinate({ x: e.offsetX, y: e.offsetY });
  };

  const onMouseEnter = () => {
    if (!ctx) return;

    if (!mousePressed) return;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!mousePressed || !ctx) return;

    // only the last two coordinates are needed to be stored.
    const newCoordinate = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    setLastCoordinate(newCoordinate);

    if (!lastCoordinate) return;

    const coordinates = [lastCoordinate, newCoordinate];

    onDraw(coordinates);
  };

  const onMouseUp = () => {
    if (!ctx) return;

    setMousePressed(false);
    setLastCoordinate(null);
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    if (!ctx) return;

    setLastCoordinate(null);
  };

  // Document event listeners will emit events even when the mouse is outside the canvas
  // thanks to that we will catch the mouse up event outside of the canvas.
  // so we can stop drawing even if the mouse goes back to the canvas afterwards.
  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
    };
  });

  return {
    onMouseLeave,
    onMouseEnter,
    onMouseMove,
  };
};

export default useDetectDrawing;
