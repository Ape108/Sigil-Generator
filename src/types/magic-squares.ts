export interface MagicSquare {
  name: string;
  size: number;
  values: number[][];
}

export interface Point {
  x: number;
  y: number;
}

export interface SigilPath {
  points: Point[];
  startPoint: Point;
  endPoint: Point;
} 