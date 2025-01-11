export interface SigilData {
  lines: {
    start: { x: number, y: number };
    end: { x: number, y: number };
  }[];
  startPoint: { x: number, y: number };
  endPoint: { x: number, y: number };
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  planetName: string;
} 