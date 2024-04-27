import React, { useEffect, useState } from "react";

import { Coordinate } from "../interfaces/Coordinate";
import { DrawingData, LineStyle } from "../interfaces/DrawingData";
import { draw } from "../utils/drawing-utils";

const useDrawing = ({
  ctx,
  style,
  onDrawing,
}: {
  ctx: CanvasRenderingContext2D | null;
  style: LineStyle;
  onDrawing: (data: DrawingData) => void;
}) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  const onMouseDown = (e: MouseEvent) => {
    if (!ctx) return;
    if (e.target !== ctx.canvas) return;

    setMouseDown(true);
    setCoordinates([{ x: e.offsetX, y: e.offsetY }]);
  };

  const onMouseEnter = () => {
    if (!ctx) return;

    if (!mouseDown) return;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown || !ctx) return;

    const newCoordinates = [
      ...coordinates,
      {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      },
    ];

    setCoordinates(newCoordinates);

    draw(ctx, {
      coordinates: newCoordinates.slice(-2),
      style,
    });

    onDrawing({
      coordinates: newCoordinates.slice(-2),
      style,
    });
  };

  const onMouseUp = () => {
    if (!ctx) return;

    setMouseDown(false);
    setCoordinates([]);
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    if (!ctx) return;

    setCoordinates([]);
  };

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

export default useDrawing;
