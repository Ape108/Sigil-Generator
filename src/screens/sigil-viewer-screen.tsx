import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Circle, Line, G } from 'react-native-svg';
import { useTheme } from '../contexts/theme-context';
import type { SigilData } from '../types/sigil';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SigilViewer'>;

export default function SigilViewerScreen({ route }: Props) {
  const { colors } = useTheme();
  const [showCircle, setShowCircle] = useState(true);

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const maxAvailableSize = Math.min(screenWidth, screenHeight - 100); // Account for controls and padding

  // Calculate sigil center from bounds
  const sigilCenter = {
    x: (route.params.sigilData.bounds.minX + route.params.sigilData.bounds.maxX) / 2,
    y: (route.params.sigilData.bounds.minY + route.params.sigilData.bounds.maxY) / 2
  };

  // Calculate sigil dimensions
  const sigilWidth = route.params.sigilData.bounds.maxX - route.params.sigilData.bounds.minX;
  const sigilHeight = route.params.sigilData.bounds.maxY - route.params.sigilData.bounds.minY;
  
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
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
      color: colors.text.primary,
      fontSize: 16,
    },
    toggleButton: {
      position: 'absolute',
      bottom: 40,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    toggleButtonText: {
      color: colors.text.primary,
      fontSize: 16,
      fontWeight: '500',
    },
  });

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
                stroke={colors.accent}
                strokeWidth={2 / scaleFactor}
                fill="none"
              />
            )}
            
            {route.params.sigilData.lines.map((line, index) => (
              <Line
                key={index}
                x1={line.start.x}
                y1={line.start.y}
                x2={line.end.x}
                y2={line.end.y}
                stroke={colors.accent}
                strokeWidth={3 / scaleFactor}
              />
            ))}

            <Circle
              cx={route.params.sigilData.startPoint.x}
              cy={route.params.sigilData.startPoint.y}
              r={8 / scaleFactor}
              stroke={colors.accent}
              strokeWidth={3 / scaleFactor}
              fill={colors.background}
            />

            <Circle
              cx={route.params.sigilData.endPoint.x}
              cy={route.params.sigilData.endPoint.y}
              r={8 / scaleFactor}
              fill={colors.accent}
            />
          </G>
        </Svg>
      </View>

      <View style={styles.controls}>
        <Text style={styles.label}>Show Circle</Text>
        <Switch
          value={showCircle}
          onValueChange={setShowCircle}
          trackColor={{ false: colors.surface, true: colors.accent }}
        />
      </View>
    </View>
  );
} 