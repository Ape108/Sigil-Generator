import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SYMBOLS } from '../utils/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useTheme } from '../contexts/theme-context';

type MainMenuProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;
};

export function MainMenuScreen({ navigation }: MainMenuProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 32,
      color: colors.text.primary,
      textAlign: 'center',
      marginBottom: 48,
      fontWeight: 'bold',
      letterSpacing: 2,
    },
    menuContainer: {
      gap: 16,
    },
    menuButton: {
      backgroundColor: colors.surface,
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.primary,
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    menuButtonText: {
      color: colors.text.primary,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '600',
      letterSpacing: 1,
    },
  });

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