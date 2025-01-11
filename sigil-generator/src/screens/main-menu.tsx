import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS, SYMBOLS } from '../utils/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type MainMenuProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;
};

export function MainMenuScreen({ navigation }: MainMenuProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {SYMBOLS.star} Sigil Generator {SYMBOLS.star}
      </Text>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('SigilCreator')}
        >
          <Text style={styles.menuButtonText}>Create Sigil</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.menuButtonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Donate')}
        >
          <Text style={styles.menuButtonText}>Support the Developer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 48,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  menuContainer: {
    gap: 16,
  },
  menuButton: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonText: {
    color: COLORS.text.primary,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1,
  },
}); 