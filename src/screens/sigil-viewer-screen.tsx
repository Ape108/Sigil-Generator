import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Animated, Switch } from 'react-native';
import Svg, { Circle, Line, G, Defs, Mask, Rect, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '../contexts/theme-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SigilData } from '../types/sigil';
import type { RootStackParamList } from '../types/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated as RNAnimated } from 'react-native';
import { Audio } from 'expo-av';

type Props = NativeStackScreenProps<RootStackParamList, 'SigilViewer'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SigilLine {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

const AnimatedG = RNAnimated.createAnimatedComponent(G);

export default function SigilViewerScreen({ route, navigation }: Props) {
  const { colors } = useTheme();
  const [showCircle, setShowCircle] = useState(true);
  const [isBurning, setIsBurning] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [sound, setSound] = useState<Audio.Sound>();

  // Animation values
  const burnProgress = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  const textFade = useRef(new Animated.Value(1)).current;
  const fireScale = useRef(new Animated.Value(0)).current;
  const particleSystem = useRef(new Animated.Value(0)).current;
  const sigilFade = useRef(new Animated.Value(1)).current;
  const uiFadeAnim = useRef(new Animated.Value(1)).current;

  // Prevent back navigation completely
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      // Prevent back navigation unless we're explicitly resetting to main menu
      if (e.data.action.type !== 'RESET') {
        e.preventDefault();
      }
    });
  }, [navigation]);

  // Load and clean up sound
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playFireSound = async () => {
    try {
      const { sound: fireSound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/fire.mp3'),
        {
          shouldPlay: true,
          isLooping: false,
          volume: 0.7,
        }
      );
      setSound(fireSound);

      // Adjust timing to account for initial UI fade (500ms)
      const fireDuration = 500 + 2000 + 1500 + 500; // UI fade + growth + hold + fadeout
      
      // Start volume fade after growth and hold, accounting for initial UI fade
      setTimeout(async () => {
        await fireSound.setVolumeAsync(0);
      }, 500 + 2000 + 1500); // After UI fade + growth + hold

      // Stop sound after complete animation
      setTimeout(async () => {
        await fireSound.stopAsync();
      }, fireDuration);

    } catch (error) {
      console.error('Error playing fire sound:', error);
    }
  };

  const handleBurnSigil = () => {
    setIsBurning(true);
    
    // Start sound immediately
    playFireSound();
    
    // First fade out UI (500ms)
    Animated.timing(uiFadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Then start the burning sequence
      Animated.parallel([
        // Fade out sigil
        Animated.timing(sigilFade, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true
        }),
        // Fire animation sequence
        Animated.sequence([
          // Fire grows
          Animated.spring(fireScale, {
            toValue: 1,
            tension: 40,
            friction: 3,
            useNativeDriver: true
          }),
          // Hold fire
          Animated.delay(1500),
          // Fade out fire and everything else
          Animated.parallel([
            Animated.timing(fireScale, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true
            }),
            // Fade out the whole screen
            Animated.timing(fadeOut, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true
            })
          ])
        ])
      ]).start(() => {
        setTimeout(() => {
          if (sound) {
            sound.unloadAsync();
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainMenu' }],
          });
        }, 200);
      });
    });
  };

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const maxAvailableSize = Math.min(screenWidth, screenHeight - 100); // Account for controls and padding

  // Calculate sigil center from bounds
  const sigilCenter = {
    x: (route.params.sigilData.bounds.minX + route.params.sigilData.bounds.maxX) / 2,
    y: (route.params.sigilData.bounds.minY + route.params.sigilData.bounds.maxY) / 2
  };

  // Calculate sigil dimensions
  const sigilWidth = route.params.sigilData.bounds.maxX - route.params.sigilData.bounds.minX;
  const sigilHeight = route.params.sigilData.bounds.maxY - route.params.sigilData.bounds.minY;
  
  // Use the larger dimension to ensure circle encompasses everything
  const radius = Math.max(sigilWidth, sigilHeight);
  
  // Add padding for visual comfort
  const padding = 40;  // Fixed padding
  const idealSize = (radius * 2) + (padding * 2);
  
  // Calculate scale factor to fit screen
  const scaleFactor = maxAvailableSize / idealSize;
  const viewSize = idealSize * scaleFactor;
  
  // Scale radius and padding for the actual display
  const displayRadius = radius * scaleFactor;
  const displayPadding = padding * scaleFactor;

  // Calculate offset to move sigil center to SVG center
  const offsetX = (viewSize / 2) - (sigilCenter.x * scaleFactor);
  const offsetY = (viewSize / 2) - (sigilCenter.y * scaleFactor);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentWrapper: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 40,
    },
    promptContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 40,
    },
    prompt: {
      color: colors.text.primary,
      fontSize: 18,
      textAlign: 'center',
      fontStyle: 'italic',
      opacity: 0.8,
      lineHeight: 26,
    },
    svgContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    burnButton: {
      backgroundColor: colors.primary + '20', // 20% opacity
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    burnButtonText: {
      color: colors.text.primary,
      fontSize: 18,
      fontWeight: '500',
      opacity: 0.9,
    },
    circleToggle: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 10,
    },
    toggleLabel: {
      color: colors.text.primary,
      fontSize: 14,
      marginRight: 8,
      opacity: 0.8,
    },
    fireIcon: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    fireContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 10, // Ensure fire is on top
    }
  });

  // Add burning gradient for the animation
  const burnGradient = {
    colors: ['transparent', colors.primary, colors.accent],
    locations: [0, 0.3, 1],
  };

  // Add toggle function
  const toggleUI = () => {
    const newValue = !showUI;
    setShowUI(newValue);
    
    Animated.timing(uiFadeAnim, {
      toValue: newValue ? 1 : 0,
      duration: 300,  // Smooth fade duration
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={1} 
      onPress={toggleUI}
    >
      <Animated.View style={{ flex: 1, opacity: fadeOut }}>
        <View style={styles.svgContainer}>
          <Svg width={viewSize} height={viewSize}>
            <AnimatedG 
              transform={`translate(${offsetX}, ${offsetY}) scale(${scaleFactor})`}
              opacity={sigilFade}
            >
              {showCircle && (
                <Circle
                  cx={sigilCenter.x}
                  cy={sigilCenter.y}
                  r={radius}
                  stroke={colors.accent}
                  strokeWidth={2 / scaleFactor}
                  fill="none"
                />
              )}
              
              {route.params.sigilData.lines.map((line: SigilLine, index: number) => (
                <Line
                  key={index}
                  x1={line.start.x}
                  y1={line.start.y}
                  x2={line.end.x}
                  y2={line.end.y}
                  stroke={colors.accent}
                  strokeWidth={3 / scaleFactor}
                />
              ))}

              <Circle
                cx={route.params.sigilData.startPoint.x}
                cy={route.params.sigilData.startPoint.y}
                r={8 / scaleFactor}
                stroke={colors.accent}
                strokeWidth={3 / scaleFactor}
                fill={colors.background}
              />

              <Circle
                cx={route.params.sigilData.endPoint.x}
                cy={route.params.sigilData.endPoint.y}
                r={8 / scaleFactor}
                fill={colors.accent}
              />
            </AnimatedG>
          </Svg>
        </View>

        <Animated.View 
          style={[
            StyleSheet.absoluteFill,
            { opacity: uiFadeAnim }
          ]}
        >
          <View style={styles.promptContainer}>
            <Text style={styles.prompt}>
              Focus on the sigil. When you're ready, burn it and release its energy.
              {'\n\n'}
              Tap anywhere to hide interface.
            </Text>
          </View>

          <View style={[styles.svgContainer, { opacity: 0 }]}>
            <View style={{ width: viewSize, height: viewSize }} />
          </View>

          <View style={styles.buttonContainer}>
            {!isBurning && (
              <TouchableOpacity
                style={styles.burnButton}
                onPress={handleBurnSigil}
              >
                <Text style={styles.burnButtonText}>Burn Sigil</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {isBurning && (
          <Animated.View 
            style={[
              styles.fireContainer,
              {
                transform: [{ scale: fireScale }],
              }
            ]}
          >
            <MaterialCommunityIcons 
              name="fire" 
              size={200} 
              color="#E25822"
              style={{ 
                textShadowColor: '#FFA500',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 15,
                opacity: 0.9
              }}
            />
          </Animated.View>
        )}

        <Animated.View style={[
          styles.circleToggle, 
          { opacity: Animated.multiply(uiFadeAnim, textFade) }
        ]}>
          <Text style={styles.toggleLabel}>Circle</Text>
          <Switch
            value={showCircle}
            onValueChange={setShowCircle}
            trackColor={{ false: colors.surface, true: colors.primary + '80' }}
            thumbColor={showCircle ? colors.primary : colors.text.secondary}
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
} 