import Constants from 'expo-constants';

const ENV = {
  feedbackEmail: Constants.expoConfig?.extra?.feedbackEmail ?? 'fallback@email.com',
};

export default ENV; 