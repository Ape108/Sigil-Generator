import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { Text } from 'react-native';
import { processAffirmation } from '../utils/converter';
import { logger } from '../utils/logger';
import { useTheme } from '../contexts/theme-context';

interface AffirmationInputProps {
  onAffirmationProcessed: (
    numbers: string, 
    steps: { noSpacesVowels: string; noDuplicates: string; }
  ) => void;
}

// Update the validation regex to allow apostrophes and common punctuation
const VALID_CHARS_REGEX = /^[a-zA-Z\s'',.!-]+$/;  // Allow apostrophes, commas, periods, exclamation marks, hyphens

function isValidAffirmation(text: string): boolean {
  return VALID_CHARS_REGEX.test(text) && text.trim().length > 0;
}

export function AffirmationInput({ onAffirmationProcessed }: AffirmationInputProps) {
  const { colors } = useTheme();
  const [affirmation, setAffirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleAffirmationChange = (text: string) => {
    setAffirmation(text);
    
    if (!text.trim()) {
      setError('Please enter an affirmation');
      setIsValid(false);
      return;
    }

    if (!VALID_CHARS_REGEX.test(text)) {
      setError('Only letters and spaces are allowed');
      setIsValid(false);
      return;
    }

    setError(null);
    setIsValid(true);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    try {
      const { numbers, steps } = processAffirmation(affirmation);
      onAffirmationProcessed(numbers, steps);
    } catch (err) {
      logger.error('Error processing affirmation', {
        error: err,
        input: affirmation,
        type: err instanceof Error ? err.constructor.name : typeof err
      });

      if (err instanceof Error && err.message.includes('Not enough consonants')) {
        setError('Need at least 2 unique consonants to create a sigil.');
      } else {
        setError('Error processing affirmation. Please try again.');
      }
      setIsValid(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      gap: 12,
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.primary,
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
      color: colors.text.primary,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      minHeight: 100,
      textAlignVertical: 'top',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      color: colors.text.primary,
      fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    },
    submitButton: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.primary,
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    submitButtonText: {
      color: colors.text.primary,
      fontSize: 16,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    error: {
      color: '#FF4444',
      marginTop: 8,
      fontSize: 14,
    },
    inputError: {
      borderColor: '#FF4444',
    },
    submitButtonDisabled: {
      backgroundColor: colors.primary + '50',
      opacity: 0.5,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your intention:</Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError
        ]}
        value={affirmation}
        onChangeText={handleAffirmationChange}
        placeholder="e.g., I am successful"
        multiline
        maxLength={100}
        returnKeyType="done"
      />
      <TouchableOpacity 
        style={[
          styles.submitButton,
          !isValid && styles.submitButtonDisabled
        ]} 
        onPress={handleSubmit}
        disabled={!isValid}
        activeOpacity={0.7}
      >
        <Text style={styles.submitButtonText}>Generate Sigil</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
} 