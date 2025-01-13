import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Color from 'color';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  accent: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
    onPrimary: string;
  };
  border: string;
  shadow: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  updatePrimaryColor: (color: string) => void;
  updateAccentColor: (color: string) => void;
  updateTextColor: (color: string) => void;
  setTheme: (theme: ThemeColors) => void;
  resetTheme: () => void;
}

const defaultColors: ThemeColors = {
  background: '#1F2937',
  surface: '#2D3748',
  primary: '#9F7AEA',
  accent: '#B794F4',
  text: {
    primary: '#F7FAFC',
    secondary: '#CBD5E0',
    accent: '#E9D8FD',
    onPrimary: '#FFFFFF'
  },
  border: '#4A5568',
  shadow: '#000000'
};

const ThemeContext = createContext<ThemeContextType>({
  colors: defaultColors,
  updatePrimaryColor: () => {},
  updateAccentColor: () => {},
  updateTextColor: () => {},
  setTheme: () => {},
  resetTheme: () => {}
});

const THEME_STORAGE_KEY = '@sigil_generator_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  // Reset to default on refresh
  useEffect(() => {
    resetTheme();
  }, []);

  const setTheme = useCallback((theme: ThemeColors) => {
    setColors(theme);
    saveTheme(theme);
  }, []);

  const resetTheme = useCallback(() => {
    setColors(defaultColors);
    saveTheme(defaultColors);
  }, []);

  // Load saved theme on startup
  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      console.log('Loading saved theme:', savedTheme); // Debug log
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        console.log('Parsed theme:', parsedTheme); // Debug log
        setColors(parsedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveTheme = async (newColors: ThemeColors) => {
    try {
      console.log('Saving new theme:', newColors); // Debug log
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newColors));
      console.log('Theme saved successfully'); // Debug log
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const generatePaletteFromBase = useCallback((baseColor: string) => {
    const color = Color(baseColor);
    return {
      background: color.darken(0.8).hex(),
      surface: color.darken(0.6).hex(),
      border: color.darken(0.4).hex(),
      text: {
        primary: color.isLight() ? '#1F2937' : '#F7FAFC',
        secondary: color.isLight() ? '#4A5568' : '#CBD5E0',
        accent: color.isLight() ? color.darken(0.3).hex() : color.lighten(0.3).hex(),
        onPrimary: color.isLight() ? '#1F2937' : '#FFFFFF'
      }
    };
  }, []);

  const updatePrimaryColor = useCallback((newColor: string) => {
    const palette = generatePaletteFromBase(newColor);
    const newColors = {
      ...colors,
      ...palette,
      primary: newColor
    };
    setColors(newColors);
    saveTheme(newColors);
  }, [colors, generatePaletteFromBase]);

  const updateAccentColor = useCallback((newColor: string) => {
    const newColors = {
      ...colors,
      accent: newColor
    };
    setColors(newColors);
    saveTheme(newColors);
  }, [colors]);

  const updateTextColor = useCallback((newColor: string) => {
    const newColors = {
      ...colors,
      text: {
        ...colors.text,
        primary: newColor,
        secondary: Color(newColor).alpha(0.7).toString(),
        accent: Color(newColor).alpha(0.9).toString(),
      }
    };
    setColors(newColors);
    saveTheme(newColors);
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ 
      colors, 
      updatePrimaryColor, 
      updateAccentColor,
      updateTextColor,
      setTheme,
      resetTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 

// Add preset themes
export const PRESET_THEMES = {
  default: defaultColors,
  midnight: {
    background: '#1A1B26',
    surface: '#24283B',
    primary: '#7AA2F7',
    accent: '#BB9AF7',
    text: {
      primary: '#C0CAF5',
      secondary: '#9AA5CE',
      accent: '#A9B1D6',
      onPrimary: '#1A1B26'
    },
    border: '#414868',
    shadow: '#000000'
  },
  sage: {
    background: '#1C2321',
    surface: '#2C3639',
    primary: '#7D9D9C',
    accent: '#A4C3B2',
    text: {
      primary: '#EAF4F4',
      secondary: '#CCE3DE',
      accent: '#DBE7E4',
      onPrimary: '#1C2321'
    },
    border: '#4A5759',
    shadow: '#000000'
  },
  dusk: {
    background: '#2B2B2B',
    surface: '#3B3B3B',
    primary: '#B4846C',
    accent: '#E7BC91',
    text: {
      primary: '#E6D5B8',
      secondary: '#C4B6A6',
      accent: '#D4C5B1',
      onPrimary: '#2B2B2B'
    },
    border: '#5C5C5C',
    shadow: '#000000'
  },
  crimson: {
    background: '#1A1313',
    surface: '#2C1810',
    primary: '#A45A52',
    accent: '#C17C72',
    text: {
      primary: '#E8C1BB',
      secondary: '#D4A59A',
      accent: '#DEB3AB',
      onPrimary: '#1A1313'
    },
    border: '#3D261E',
    shadow: '#000000'
  },
  abyss: {
    background: '#0B0F14',
    surface: '#151A21',
    primary: '#4B6584',
    accent: '#778CA3',
    text: {
      primary: '#D1D8E0',
      secondary: '#A5B1C2',
      accent: '#B5BDC8',
      onPrimary: '#0B0F14'
    },
    border: '#2F3640',
    shadow: '#000000'
  },
  forest: {
    background: '#1B2028',
    surface: '#272E38',
    primary: '#6B8E4E',
    accent: '#98B475',
    text: {
      primary: '#E1E8D5',
      secondary: '#C5D3B3',
      accent: '#D3DEC4',
      onPrimary: '#1B2028'
    },
    border: '#3D4654',
    shadow: '#000000'
  }
} as const; 