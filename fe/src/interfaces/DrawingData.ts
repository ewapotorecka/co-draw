import { Coordinate } from "./Coordinate";

export interface DrawingData {
  coordinates: Coordinate[];
  style: LineStyle;
}

export interface LineStyle {
  lineWidth: number;
  strokeColor: string;
}
