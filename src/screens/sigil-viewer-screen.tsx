import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text, Dimensions } from 'react-native';
import Svg, { Circle, Line, G } from 'react-native-svg';
import { COLORS } from '../utils/theme';
import type { SigilData } from '../types/sigil';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SigilViewer'>;

export default function SigilViewerScreen({ route }: Props) {
  const { sigilData } = route.params;
  const [showCircle, setShowCircle] = useState(false);

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const maxAvailableSize = Math.min(screenWidth, screenHeight - 100); // Account for controls and padding

  // Calculate sigil center from bounds
  const sigilCenter = {
    x: (sigilData.bounds.minX + sigilData.bounds.maxX) / 2,
    y: (sigilData.bounds.minY + sigilData.bounds.maxY) / 2
  };

  // Calculate sigil dimensions
  const sigilWidth = sigilData.bounds.maxX - sigilData.bounds.minX;
  const sigilHeight = sigilData.bounds.maxY - sigilData.bounds.minY;
  
  // Use the larger dimension to ensure circle encompasses everything
  const radius = Math.max(sigilWidth, sigilHeight);
  
  // Add padding for visual comfort
  const padding = 40;  // Fixed padding
  const idealSize = (radius * 2) + (padding * 2);
  
  // Calculate scale factor to fit screen
  const scaleFactor = maxAvailableSize / idealSize;
  const viewSize = idealSize * scaleFactor;
  
  // Scale radius and padding for the actual display
  const displayRadius = radius * scaleFactor;
  const displayPadding = padding * scaleFactor;

  // Calculate offset to move sigil center to SVG center
  const offsetX = (viewSize / 2) - (sigilCenter.x * scaleFactor);
  const offsetY = (viewSize / 2) - (sigilCenter.y * scaleFactor);

  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper}>
        <Svg width={viewSize} height={viewSize}>
          <G 
            transform={`translate(${offsetX}, ${offsetY}) scale(${scaleFactor})`}
          >
            {showCircle && (
              <Circle
                cx={sigilCenter.x}
                cy={sigilCenter.y}
                r={radius}
                stroke={COLORS.primary}
                strokeWidth={2 / scaleFactor}
                fill="none"
              />
            )}
            
            {sigilData.lines.map((line, index) => (
              <Line
                key={index}
                x1={line.start.x}
                y1={line.start.y}
                x2={line.end.x}
                y2={line.end.y}
                stroke={COLORS.primary}
                strokeWidth={3 / scaleFactor}
              />
            ))}

            <Circle
              cx={sigilData.startPoint.x}
              cy={sigilData.startPoint.y}
              r={8 / scaleFactor}
              stroke={COLORS.primary}
              strokeWidth={3 / scaleFactor}
              fill={COLORS.background}
            />

            <Circle
              cx={sigilData.endPoint.x}
              cy={sigilData.endPoint.y}
              r={8 / scaleFactor}
              fill={COLORS.primary}
            />
          </G>
        </Svg>
      </View>

      <View style={styles.controls}>
        <Text style={styles.label}>Show Circle</Text>
        <Switch
          value={showCircle}
          onValueChange={setShowCircle}
          trackColor={{ false: COLORS.surface, true: COLORS.primary }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  svgWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  label: {
    color: COLORS.text.primary,
    fontSize: 16,
  },
}); 