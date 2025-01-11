import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PlanetSelector } from '../components/planet-selector/planet-selector';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { COLORS } from '../utils/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SigilCreator'>;

export default function SigilCreator({ navigation }: Props) {
  const handlePlanetSelect = (planetName: string) => {
    navigation.navigate('SigilDrawing', {
      planetName,
      numbers: '' // You'll need to add number selection logic
    });
  };

  return (
    <View style={styles.container}>
      <PlanetSelector onSelect={handlePlanetSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
}); 