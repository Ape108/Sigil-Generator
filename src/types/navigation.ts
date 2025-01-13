import type { SigilData } from './sigil';

export type RootStackParamList = {
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