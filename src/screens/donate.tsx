import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../utils/theme';

export function DonateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support the Developer</Text>
      <Text style={styles.message}>
        Thank you for considering supporting this project! 
        Donation options coming soon.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: COLORS.text.primary,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
}); 