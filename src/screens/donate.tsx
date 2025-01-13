import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { useTheme } from '../contexts/theme-context';

const DONATION_LINKS = [
  { amount: 5, label: '$5', url: 'https://donate.stripe.com/test_00g7sz2Ta2cwe4w6oo' },
  { amount: 10, label: '$10', url: 'https://donate.stripe.com/test_dR6eV151i4kE4tWfYZ' },
  { amount: 20, label: '$20', url: 'https://donate.stripe.com/test_8wM4gn9hybN63pS5km' },
  { amount: 50, label: '$50', url: 'https://donate.stripe.com/test_6oE00751i6sMaSk7sv' },
];

export function DonateScreen() {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Listen for app returns from payment
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      if (url.includes('stripe')) {
        // Show thank you message when returning from Stripe
        setShowThankYou(true);
        setTimeout(() => {
          setShowThankYou(false);
        }, 5000); // Hide after 5 seconds
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleDonation = async (url: string) => {
    try {
      setLoading(true);
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Could not open payment page');
    } finally {
      setLoading(false);
    }
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
    donationGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      justifyContent: 'center',
    },
    donateButton: {
      backgroundColor: colors.surface,
      padding: 20,
      borderRadius: 12,
      width: '45%',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      opacity: loading ? 0.5 : 1,
    },
    donateButtonText: {
      color: colors.text.primary,
      fontSize: 18,
      fontWeight: '600',
    },
    thankYouContainer: {
      position: 'absolute',
      top: 20,
      left: 20,
      right: 20,
      backgroundColor: colors.primary + '20',
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: 'center',
    },
    thankYouText: {
      color: colors.text.primary,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {showThankYou && (
        <View style={styles.thankYouContainer}>
          <Text style={styles.thankYouText}>
            Thank you for your support! Your donation helps keep this app free and supports future development.
          </Text>
        </View>
      )}
      
      <Text style={styles.title}>Support the Developer</Text>
      <Text style={styles.message}>
        Your donations help keep the Sigil Generator free and support future development. 
        Choose an amount to donate:
      </Text>
      <View style={styles.donationGrid}>
        {DONATION_LINKS.map((item) => (
          <TouchableOpacity
            key={item.amount}
            style={styles.donateButton}
            onPress={() => handleDonation(item.url)}
            disabled={loading}
          >
            <Text style={styles.donateButtonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 