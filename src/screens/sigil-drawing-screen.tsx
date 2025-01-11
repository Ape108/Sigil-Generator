import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, Animated, Easing } from 'react-native';
import { COLORS } from '../utils/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Circle, Line, G, Path } from 'react-native-svg';

type RootStackParamList = {
  SigilCreator: undefined;
  SigilDrawing: {
    planetName: string;
    numbers: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'SigilDrawing'>;

const MAGIC_SQUARES = {
  "Saturn": [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ],
  "Jupiter": [
    [4, 14, 15, 1],
    [9, 7, 6, 12],
    [5, 11, 10, 8],
    [16, 2, 3, 13]
  ],
  "Mars": [
    [11, 24, 7, 20, 3],
    [4, 12, 25, 8, 16],
    [17, 5, 13, 21, 9],
    [10, 18, 1, 14, 22],
    [23, 6, 19, 2, 15]
  ],
  "Sun": [
    [6, 32, 3, 34, 35, 1],
    [7, 11, 27, 28, 8, 30],
    [19, 14, 16, 15, 23, 24],
    [18, 20, 22, 21, 17, 13],
    [25, 29, 10, 9, 26, 12],
    [36, 5, 33, 4, 2, 31]
  ],
  "Venus": [
    [22, 47, 16, 41, 10, 35, 4],
    [5, 23, 48, 17, 42, 11, 29],
    [30, 6, 24, 49, 18, 36, 12],
    [13, 31, 7, 25, 43, 19, 37],
    [38, 14, 32, 1, 26, 44, 20],
    [21, 39, 8, 33, 2, 27, 45],
    [46, 15, 40, 9, 34, 3, 28]
  ],
  "Mercury": [
    [8, 58, 59, 5, 4, 62, 63, 1],
    [49, 15, 14, 52, 53, 11, 10, 56],
    [41, 23, 22, 44, 45, 19, 18, 48],
    [32, 34, 35, 29, 28, 38, 39, 25],
    [40, 26, 27, 37, 36, 30, 31, 33],
    [17, 47, 46, 20, 21, 43, 42, 24],
    [9, 55, 54, 12, 13, 51, 50, 16],
    [64, 2, 3, 61, 60, 6, 7, 57]
  ],
  "Moon": [
    [37, 78, 29, 70, 21, 62, 13, 54, 5],
    [6, 38, 79, 30, 71, 22, 63, 14, 46],
    [47, 7, 39, 80, 31, 72, 23, 55, 15],
    [16, 48, 8, 40, 81, 32, 64, 24, 56],
    [57, 17, 49, 9, 41, 73, 33, 65, 25],
    [26, 58, 18, 50, 1, 42, 74, 34, 66],
    [67, 27, 59, 10, 51, 2, 43, 75, 35],
    [36, 68, 19, 60, 11, 52, 3, 44, 76],
    [77, 28, 69, 20, 61, 12, 53, 4, 45]
  ]
};

interface Position {
  x: number;
  y: number;
}

interface NumberPosition {
  [key: number]: Position;
}

interface LineSegment {
  start: Position;
  end: Position;
  progress: Animated.Value;
}

// Add this helper function to calculate distance between points
function calculateDistance(start: Position, end: Position): number {
  return Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );
}

// Add this helper function to calculate distance from center
function calculateDistanceFromCenter(point: Position, center: Position): number {
  return Math.sqrt(
    Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)
  );
}

// Add this function to calculate the sigil's radius
function calculateSigilRadius(numbers: string, numberPositions: NumberPosition, center: Position): number {
  if (!numbers || Object.keys(numberPositions).length === 0) return 0;
  
  const points = numbers.split('').map(num => numberPositions[Number(num)]);
  return Math.max(...points.map(point => calculateDistanceFromCenter(point, center)));
}

// Add this near the top with other animated components
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

export function SigilDrawingScreen({ route }: Props) {
  const { planetName, numbers } = route.params;
  const magicSquare = MAGIC_SQUARES[planetName as keyof typeof MAGIC_SQUARES];
  const [numberPositions, setNumberPositions] = useState<NumberPosition>({});
  const [cellSize, setCellSize] = useState(40);
  const [lineSegments, setLineSegments] = useState<LineSegment[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [circleProgress] = useState(new Animated.Value(0));
  const [isSigilComplete, setIsSigilComplete] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const gridOpacity = useRef(new Animated.Value(1)).current;
  const sigilScale = useRef(new Animated.Value(1)).current;
  const [scaleFactorState, setScaleFactorState] = useState(1);

  // Calculate positions of all numbers in the magic square
  const calculateNumberPositions = (size: number) => {
    const positions: NumberPosition = {};
    magicSquare.forEach((row, rowIndex) => {
      row.forEach((number, colIndex) => {
        positions[number] = {
          x: colIndex * size + size / 2,
          y: rowIndex * size + size / 2
        };
      });
    });
    setNumberPositions(positions);
  };

  useEffect(() => {
    // Calculate cell size based on container width instead of screen width
    const containerWidth = Dimensions.get('window').width * 0.9; // 90% of screen width
    const maxWidth = Math.min(containerWidth, 500); // respect maxWidth
    const squareSize = magicSquare.length;
    const newCellSize = Math.floor(maxWidth / squareSize);
    setCellSize(newCellSize);
    calculateNumberPositions(newCellSize);
  }, [magicSquare]);

  // Create line segments from number sequence
  useEffect(() => {
    if (!numbers || Object.keys(numberPositions).length === 0) return;

    const segments: LineSegment[] = [];
    const numberSequence = numbers.split('').map(Number);

    for (let i = 0; i < numberSequence.length - 1; i++) {
      const start = numberPositions[numberSequence[i]];
      const end = numberPositions[numberSequence[i + 1]];
      if (start && end) {
        segments.push({
          start,
          end,
          progress: new Animated.Value(0)
        });
      }
    }
    setLineSegments(segments);
    setIsDrawing(true);
  }, [numbers, numberPositions]);

  // Animate line drawing
  useEffect(() => {
    if (!isDrawing || lineSegments.length === 0) return;

    const BASE_SPEED = 0.3;
    const MIN_DURATION = 200;
    
    const animations = lineSegments.map((segment, index) => {
      const distance = calculateDistance(segment.start, segment.end);
      const duration = Math.max(MIN_DURATION, distance / BASE_SPEED);
      
      return Animated.timing(segment.progress, {
        toValue: 1,
        duration,
        useNativeDriver: true,
        delay: index * 100,
        easing: Easing.bezier(0.4, 0, 0.2, 1)
      });
    });

    Animated.sequence(animations).start(() => {
      setIsDrawing(false);
      setIsSigilComplete(true);
    });
  }, [isDrawing, lineSegments]);

  // Calculate scale factor when number positions are set
  useEffect(() => {
    if (!numbers || Object.keys(numberPositions).length === 0) return;

    const squareSize = cellSize * magicSquare.length;
    const center = { x: squareSize / 2, y: squareSize / 2 };
    const sigilRadius = calculateSigilRadius(numbers, numberPositions, center);
    const circleSize = Math.min(squareSize - 40, 300);
    const targetRadius = (circleSize / 2) - 20; // 20px padding between sigil and circle
    
    // Calculate scale factor needed to fit sigil within circle with padding
    const newScaleFactor = targetRadius / sigilRadius;
    setScaleFactorState(newScaleFactor);
  }, [numbers, numberPositions, cellSize, magicSquare.length]);

  // Update the animation to use the calculated scale factor
  useEffect(() => {
    if (isSigilComplete) {
      Animated.sequence([
        // Fade out grid
        Animated.timing(gridOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0, 0.2, 1)
        }),
        // Scale and center sigil
        Animated.timing(sigilScale, {
          toValue: scaleFactorState,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0, 0.2, 1)
        }),
        // Draw circle
        Animated.timing(circleProgress, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0, 0.2, 1)
        })
      ]).start(() => setShowGrid(false));
    }
  }, [isSigilComplete, scaleFactorState]);

  const squareSize = cellSize * magicSquare.length;
  const circleSize = Math.min(squareSize - 40, 300);
  const radius = circleSize / 2;
  const center = squareSize / 2;

  // Create circle path with fixed size
  const circlePath = `
    M ${center} ${center - radius}
    A ${radius} ${radius} 0 0 1 ${center + radius} ${center}
    A ${radius} ${radius} 0 0 1 ${center} ${center + radius}
    A ${radius} ${radius} 0 0 1 ${center - radius} ${center}
    A ${radius} ${radius} 0 0 1 ${center} ${center - radius}
  `;

  return (
    <View style={styles.container}>
      <View style={styles.squareContainer}>
        <Animated.View style={[
          styles.gridContainer,
          { opacity: gridOpacity }
        ]}>
          {showGrid && magicSquare.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((number, colIndex) => (
                <View 
                  key={`${rowIndex}-${colIndex}`} 
                  style={[styles.cell, { width: cellSize, height: cellSize }]}
                >
                  <Text style={styles.cellText}>{number}</Text>
                </View>
              ))}
            </View>
          ))}
        </Animated.View>

        <Svg
          width={squareSize}
          height={squareSize}
          style={[
            StyleSheet.absoluteFill,
            styles.svgContainer
          ]}
        >
          <G>
            <AnimatedPath
              d={circlePath}
              stroke={COLORS.primary}
              strokeWidth={2}
              fill="none"
              strokeDasharray={[2 * Math.PI * radius]}
              strokeDashoffset={circleProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [2 * Math.PI * radius, 0]
              })}
            />

            <AnimatedG
              transform={[{
                translateX: sigilScale.interpolate({
                  inputRange: [scaleFactorState, 1],
                  outputRange: [center * (1 - scaleFactorState), 0]
                })
              }, {
                translateY: sigilScale.interpolate({
                  inputRange: [scaleFactorState, 1],
                  outputRange: [center * (1 - scaleFactorState), 0]
                })
              }, {
                scale: sigilScale.interpolate({
                  inputRange: [scaleFactorState, 1],
                  outputRange: [scaleFactorState, 1]
                })
              }]}
            >
              {lineSegments.map((segment, index) => (
                <AnimatedLine
                  key={index}
                  x1={segment.start.x}
                  y1={segment.start.y}
                  x2={segment.end.x}
                  y2={segment.end.y}
                  stroke={COLORS.primary}
                  strokeWidth={3}
                  opacity={segment.progress}
                />
              ))}

              {numbers && numberPositions[Number(numbers[0])] && (
                <Circle
                  cx={numberPositions[Number(numbers[0])].x}
                  cy={numberPositions[Number(numbers[0])].y}
                  r={8}
                  stroke={COLORS.primary}
                  strokeWidth={3}
                  fill={COLORS.background}
                />
              )}

              {!isDrawing && numbers && numberPositions[Number(numbers[numbers.length - 1])] && (
                <Circle
                  cx={numberPositions[Number(numbers[numbers.length - 1])].x}
                  cy={numberPositions[Number(numbers[numbers.length - 1])].y}
                  r={8}
                  fill={COLORS.primary}
                />
              )}
            </AnimatedG>
          </G>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareContainer: {
    position: 'relative',
    aspectRatio: 1,
    width: '90%',
    maxWidth: 500,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cellText: {
    color: COLORS.text.primary,
    fontSize: 16,
  },
  gridContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 