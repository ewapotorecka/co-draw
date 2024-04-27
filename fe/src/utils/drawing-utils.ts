import { Coordinate } from "../interfaces/Coordinate";
import { DrawingData } from "../interfaces/DrawingData";

const startDrawing = (
  ctx: CanvasRenderingContext2D,
  coordinate?: Coordinate
) => {
  // ctx.beginPath();
  // if (coordinate) {
  //   ctx.moveTo(coordinate.x, coordinate.y);
  // }
};

const draw = (ctx: CanvasRenderingContext2D, data: DrawingData) => {
  if (!ctx) return;

  const { coordinates, style } = data;
  const startPoint = coordinates[0];

  if (!startPoint) return;

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);

  if (style.dashed) {
    ctx.setLineDash([5, 15]);
  } else {
    ctx.setLineDash([]);
  }
  ctx.strokeStyle = style.strokeColor;
  ctx.lineCap = "round";
  ctx.lineWidth = style.lineWidth;
  ctx.lineJoin = "round";

  coordinates.forEach(({ x, y }) => {
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  ctx.closePath();
};

const finishDrawing = (ctx: CanvasRenderingContext2D) => {
  // ctx.closePath();
};

export { draw, finishDrawing, startDrawing };
