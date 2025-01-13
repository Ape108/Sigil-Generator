import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/theme-context';
import { CustomColorPicker } from '../components/color-picker/color-picker';
import { PRESET_THEMES } from '../contexts/theme-context';

export function SettingsScreen() {
  const { colors, updatePrimaryColor, updateAccentColor, updateTextColor, setTheme, resetTheme } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Appearance
      </Text>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Preset Themes
        </Text>
        <View style={styles.presetContainer}>
          {Object.entries(PRESET_THEMES).map(([name, theme]) => (
            <TouchableOpacity
              key={name}
              style={[styles.presetButton, { 
                backgroundColor: theme.primary,
                borderColor: colors.border,
              }]}
              onPress={() => setTheme(theme)}
            >
              <Text style={[styles.presetButtonText, { 
                color: theme.text.onPrimary 
              }]}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Custom Colors
        </Text>
        <CustomColorPicker
          label="Background Theme"
          selectedColor={colors.primary}
          onColorSelect={updatePrimaryColor}
        />
        
        <CustomColorPicker
          label="Sigil Color"
          selectedColor={colors.accent}
          onColorSelect={updateAccentColor}
        />

        <CustomColorPicker
          label="Text Color"
          selectedColor={colors.text.primary}
          onColorSelect={updateTextColor}
        />

        <TouchableOpacity 
          style={[styles.resetButton, { borderColor: colors.border }]}
          onPress={resetTheme}
        >
          <Text style={[styles.resetButtonText, { color: colors.text.primary }]}>
            Reset to Default
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  presetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: '45%',
  },
  presetButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 