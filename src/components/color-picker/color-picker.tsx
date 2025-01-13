import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import ColorPicker from 'react-native-wheel-color-picker';

interface ColorPickerProps {
  label: string;
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const WHEEL_SIZE = Dimensions.get('window').width * 0.8;

export function CustomColorPicker({ label, selectedColor, onColorSelect }: ColorPickerProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.primary }]}>{label}</Text>
      <View style={[styles.pickerContainer, { backgroundColor: colors.surface }]}>
        <ColorPicker
          color={selectedColor}
          onColorChange={onColorSelect}
          thumbSize={30}
          sliderSize={30}
          noSnap={true}
          row={false}
          swatches={false}
          discrete={false}
        />
        <View style={[styles.colorPreview, { backgroundColor: selectedColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  pickerContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE + 60, // Extra space for slider
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorPreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 16,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
  },
}); 