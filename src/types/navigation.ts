import type { SigilData } from './sigil';

export type RootStackParamList = {
  SigilCreator: undefined;
  SigilDrawing: {
    planetName: string;
    numbers: string;
  };
  SigilViewer: {
    sigilData: SigilData;
  };
}; 