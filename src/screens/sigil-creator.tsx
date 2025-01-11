import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Platform, ScrollView } from 'react-native';
import { AffirmationInput } from '../components/affirmation-input';
import { logger } from '../utils/logger';
import { COLORS } from '../utils/theme';
import { PlanetSelector } from '../components/planet-selector/planet-selector';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface ConversionSteps {
  original: string;
  noVowels: string;
  noDuplicates: string;
  numbers: string;
}

type RootStackParamList = {
  SigilCreator: undefined;
  SigilDrawing: {
    planetName: string;
    numbers: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'SigilCreator'>;

export function SigilCreatorScreen({ navigation }: Props) {
  const [conversionSteps, setConversionSteps] = useState<ConversionSteps | null>(null);

  const handleAffirmationProcessed = useCallback((
    processedNumbers: string, 
    steps: { noSpacesVowels: string; noDuplicates: string; }
  ) => {
    logger.info('Affirmation processed in App', { numbers: processedNumbers });
    setConversionSteps({
      original: steps.noSpacesVowels,
      noVowels: steps.noSpacesVowels,
      noDuplicates: steps.noDuplicates,
      numbers: processedNumbers
    });
  }, []);

  const handlePlanetSelect = (planetName: string) => {
    navigation.navigate('SigilDrawing', {
      planetName,
      numbers: conversionSteps?.numbers || ''
    });
  };

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainer}
    >
      <AffirmationInput onAffirmationProcessed={handleAffirmationProcessed} />
      {conversionSteps && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Conversion Steps:</Text>
          <View style={styles.step}>
            <Text style={styles.stepLabel}>1. Remove vowels:</Text>
            <Text style={styles.stepValue}>{conversionSteps.noVowels}</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepLabel}>2. Remove duplicates:</Text>
            <Text style={styles.stepValue}>{conversionSteps.noDuplicates}</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepLabel}>3. Final numbers:</Text>
            <Text style={styles.numbers}>{conversionSteps.numbers}</Text>
          </View>
        </View>
      )}
      <PlanetSelector onSelect={handlePlanetSelect} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32, // Extra padding at bottom for scrolling
  },
  result: {
    marginTop: 24,
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    gap: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.text.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  step: {
    gap: 4,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primary,
    paddingLeft: 12,
    backgroundColor: 'rgba(159, 122, 234, 0.05)',
    borderRadius: 4,
    padding: 8,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  stepValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
  },
  numbers: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.accent,
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    textShadowColor: COLORS.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
}); 