import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PLANET_DATA } from '../../types/planets';
import { COLORS } from '../../utils/theme';

export function PlanetSelector({ onSelect }: { onSelect: (planetName: string) => void }) {
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Planet</Text>
      <Text style={styles.subtitle}>Choose the planetary energy that best matches your intention</Text>
      
      {PLANET_DATA.map((planet) => (
        <View key={planet.name} style={styles.planetCard}>
          <TouchableOpacity 
            onPress={() => setExpandedPlanet(expandedPlanet === planet.name ? null : planet.name)}
            style={styles.planetHeader}
          >
            <Text style={styles.planetName}>{planet.name}</Text>
            <Text style={styles.planetTitle}>{planet.title}</Text>
          </TouchableOpacity>

          {expandedPlanet === planet.name && (
            <View style={styles.expandedContent}>
              <Text style={styles.description}>{planet.description}</Text>
              <View style={styles.keywordsContainer}>
                {planet.keywords.map((keyword) => (
                  <Text key={keyword} style={styles.keyword}>• {keyword}</Text>
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
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.text.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: COLORS.text.secondary,
  },
  planetCard: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  planetHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planetName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  planetTitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  expandedContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: 'rgba(159, 122, 234, 0.05)',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    color: COLORS.text.primary,
  },
  keywordsContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keyword: {
    fontSize: 14,
    color: COLORS.text.secondary,
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  selectButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  selectButtonText: {
    color: COLORS.text.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
}); 