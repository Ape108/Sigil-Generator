import { MagicSquare } from '../types/magic-squares';

export const MAGIC_SQUARES: { [key: string]: MagicSquare } = {
  Saturn: {
    name: 'Saturn',
    size: 3,
    values: [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ]
  },
  Jupiter: {
    name: 'Jupiter',
    size: 4,
    values: [
      [4, 14, 15, 1],
      [9, 7, 6, 12],
      [5, 11, 10, 8],
      [16, 2, 3, 13]
    ]
  }
  // ... other squares will be added similarly
};

export function findNumberPosition(square: MagicSquare, number: number): { row: number; col: number } | null {
  for (let row = 0; row < square.size; row++) {
    for (let col = 0; col < square.size; col++) {
      if (square.values[row][col] === number) {
        return { row, col };
      }
    }
  }
  return null;
} 