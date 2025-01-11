import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { Text } from 'react-native';
import { processAffirmation } from '../utils/converter';
import { logger } from '../utils/logger';
import { COLORS } from '../utils/theme';

interface AffirmationInputProps {
  onAffirmationProcessed: (
    numbers: string, 
    steps: { noSpacesVowels: string; noDuplicates: string; }
  ) => void;
}

export function AffirmationInput({ onAffirmationProcessed }: AffirmationInputProps) {
  const [affirmation, setAffirmation] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAffirmationChange = useCallback((text: string) => {
    logger.debug('Affirmation input changed', { text });
    setAffirmation(text);
    setError(null);
  }, []);

  const handleSubmit = useCallback(() => {
    logger.info('Processing affirmation submission', { affirmation });
    
    if (!affirmation.trim()) {
      const errorMessage = 'Please enter an affirmation';
      logger.warn(errorMessage);
      setError(errorMessage);
      return;
    }

    try {
      const result = processAffirmation(affirmation);
      onAffirmationProcessed(result.numbers, result.steps);
    } catch (error) {
      const errorMessage = 'Error processing affirmation';
      logger.error(errorMessage, error);
      setError(errorMessage);
    }
  }, [affirmation, onAffirmationProcessed]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your affirmation:</Text>
      <TextInput
        style={styles.input}
        value={affirmation}
        onChangeText={handleAffirmationChange}
        placeholder="e.g., I am a fighter"
        multiline
        maxLength={100}
        returnKeyType="done"
      />
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit}
        activeOpacity={0.7}
      >
        <Text style={styles.submitButtonText}>Generate Sigil</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: COLORS.text.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: COLORS.text.primary,
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  error: {
    color: COLORS.text.accent,
    marginTop: 8,
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
  },
}); 