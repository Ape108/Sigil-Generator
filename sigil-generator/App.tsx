import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './src/utils/theme';
import { MainMenuScreen } from './src/screens/main-menu';
import { SigilCreatorScreen } from './src/screens/sigil-creator'; // renamed from previous App content
import { SettingsScreen } from './src/screens/settings';
import { DonateScreen } from './src/screens/donate';

export type RootStackParamList = {
  MainMenu: undefined;
  SigilCreator: undefined;
  Settings: undefined;
  Donate: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="MainMenu"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.surface,
          },
          headerTintColor: COLORS.text.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenuScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SigilCreator" 
          component={SigilCreatorScreen}
          options={{ title: 'Create Sigil' }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen 
          name="Donate" 
          component={DonateScreen}
          options={{ title: 'Support' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
