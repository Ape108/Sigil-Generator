import { ExpoConfig } from 'expo/config';
import 'dotenv/config';

const config: ExpoConfig = {
  name: 'Sigil Generator',
  slug: 'sigil-generator',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  extra: {
    feedbackEmail: process.env.FEEDBACK_EMAIL || 'fallback@email.com',
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  },
};

export default config; 