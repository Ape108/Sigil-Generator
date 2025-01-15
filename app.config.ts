import { ExpoConfig } from 'expo/config';
import 'dotenv/config';

const config: ExpoConfig = {
  name: 'Sigil Generator',
  slug: 'sigil-generator',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: ['**/*', 'assets/sounds/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    package: "com.ape108.sigilgenerator",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#1F2937'
    }
  },
  extra: {
    eas: {
      projectId: "2013d163-65a8-4340-9771-08b12c65f3c2"
    },
    feedbackEmail: process.env.EXPO_PUBLIC_FEEDBACK_EMAIL || 'fallback@email.com',
  },
  splash: null,
};

export default config; 