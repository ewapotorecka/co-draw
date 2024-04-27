import React, { useEffect, useState } from "react";

import { Coordinate } from "../interfaces/Coordinate";
import { LineStyle } from "../interfaces/DrawingData";
import { draw, finishDrawing, startDrawing } from "../utils/drawing-utils";

const useDrawing = ({
  ctx,
  style,
  updateCoordinates,
}: {
  ctx: CanvasRenderingContext2D | null;
  style: LineStyle;
  updateCoordinates: (coordinates: Coordinate[]) => void;
}) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  const onMouseDown = (e: MouseEvent) => {
    if (!ctx) return;
    if (e.target !== ctx.canvas) return;

    setMouseDown(true);
    startDrawing(ctx, { x: e.offsetX, y: e.offsetY });
  };

  const onMouseEnter = () => {
    if (!ctx) return;

    if (!mouseDown) return;
    startDrawing(ctx);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown || !ctx) return;

    setCoordinates([
      ...coordinates,
      {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      },
    ]);

    draw(ctx, {
      coordinates: coordinates.slice(-2),
      style,
    });
  };

  const onMouseUp = () => {
    if (!ctx) return;

    setMouseDown(false);
    finishDrawing(ctx);
    updateCoordinates(coordinates);
    setCoordinates([]);
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    if (!ctx) return;

    finishDrawing(ctx);
    updateCoordinates(coordinates);
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
