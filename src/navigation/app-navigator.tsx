import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainMenuScreen } from '../screens/main-menu';
import { SigilCreatorScreen } from '../screens/sigil-creator';
import { SigilDrawingScreen } from '../screens/sigil-drawing-screen';
import { SettingsScreen } from '../screens/settings';
import { DonateScreen } from '../screens/donate';
import { COLORS } from '../utils/theme';

type RootStackParamList = {
  MainMenu: undefined;
  SigilCreator: undefined;
  SigilDrawing: {
    planetName: string;
    numbers: string;
  };
  Settings: undefined;
  Donate: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
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
      <Stack.Screen 
        name="SigilDrawing" 
        component={SigilDrawingScreen}
        options={{ title: 'Draw Sigil' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
      />
      <Stack.Screen 
        name="Donate" 
        component={DonateScreen}
        options={{ title: 'Support' }}
      />
    </Stack.Navigator>
  );
} 