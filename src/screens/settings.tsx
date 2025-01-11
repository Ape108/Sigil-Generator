import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../utils/theme';

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {/* Color picker components will go here */}
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
}); 