import React from 'react';
import { View, StyleSheet, Text, Linking, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/theme-context';
import ENV from '../config/env';

export function FeedbackScreen() {
  const { colors } = useTheme();

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${ENV.feedbackEmail}?subject=Sigil Generator Feedback`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: colors.text.primary,
      marginBottom: 24,
      fontWeight: 'bold',
    },
    message: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 32,
      lineHeight: 24,
    },
    button: {
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonText: {
      color: colors.text.primary,
      fontSize: 16,
      fontWeight: '600',
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Feedback</Text>
      <Text style={styles.message}>
        Your feedback helps improve the Sigil Generator. Share your thoughts, report bugs, or suggest new features.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
} 