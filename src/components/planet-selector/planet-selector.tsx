import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PLANETS, Planet } from '../../types/planets';
import { useTheme } from '../../contexts/theme-context';

interface PlanetSelectorProps {
  onSelect: (planetName: string) => void;
}

export function PlanetSelector({ onSelect }: PlanetSelectorProps) {
  const { colors } = useTheme();
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);

  const togglePlanet = (planetName: string) => {
    setExpandedPlanet(expandedPlanet === planetName ? null : planetName);
  };

  const styles = StyleSheet.create({
    container: {
      marginTop: 24,
    },
    planetCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 14,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2,
    },
    planetTitle: {
      fontSize: 19,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
    planetSubtitle: {
      fontSize: 15,
      color: colors.text.secondary,
      fontStyle: 'italic',
    },
    expandedContent: {
      marginTop: 14,
    },
    description: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 12,
      lineHeight: 20,
    },
    keywordsContainer: {
      marginBottom: 12,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    keyword: {
      fontSize: 12,
      color: colors.text.secondary,
      backgroundColor: colors.primary + '20',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 12,
    },
    selectButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 6,
      alignItems: 'center',
    },
    selectButtonText: {
      color: colors.text.onPrimary,
      fontSize: 14,
      fontWeight: '600',
    },
  });

  return (
    <ScrollView style={styles.container}>
      {PLANETS.map((planet: Planet) => (
        <TouchableOpacity 
          key={planet.name} 
          style={styles.planetCard}
          onPress={() => togglePlanet(planet.name)}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.planetTitle}>{planet.name}</Text>
            <Text style={styles.planetSubtitle}>{planet.title}</Text>
          </View>
          
          {expandedPlanet === planet.name && (
            <View style={styles.expandedContent}>
              <Text style={styles.description}>{planet.description}</Text>
              <View style={styles.keywordsContainer}>
                {planet.keywords.map((keyword) => (
                  <Text key={keyword} style={styles.keyword}>
                    {keyword}
                  </Text>
                ))}
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => onSelect(planet.name)}
              >
                <Text style={styles.selectButtonText}>Select {planet.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
} 