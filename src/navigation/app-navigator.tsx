import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainMenuScreen } from '../screens/main-menu';
import { SigilCreatorScreen } from '../screens/sigil-creator';
import { SigilDrawingScreen } from '../screens/sigil-drawing-screen';
import SigilViewerScreen from '../screens/sigil-viewer-screen';
import { SettingsScreen } from '../screens/settings';
import { DonateScreen } from '../screens/donate';
import { useTheme } from '../contexts/theme-context';
import type { SigilData } from '../types/sigil';
import { FeedbackScreen } from '../screens/feedback';

type RootStackParamList = {
  MainMenu: undefined;
  SigilCreator: undefined;
  SigilDrawing: {
    planetName: string;
    numbers: string;
  };
  SigilViewer: {
    sigilData: SigilData;
  };
  Settings: undefined;
  Donate: undefined;
  Feedback: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: colors.background,
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
        name="SigilViewer" 
        component={SigilViewerScreen}
        options={{ 
          headerShown: false,
        }}
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
      <Stack.Screen 
        name="Feedback" 
        component={FeedbackScreen}
        options={{ title: 'Feedback' }}
      />
    </Stack.Navigator>
  );
} 