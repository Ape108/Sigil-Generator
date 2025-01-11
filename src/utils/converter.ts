import { logger } from './logger';

interface NumberMapping {
  [key: string]: string;
}

const NUMBER_MAPPING: NumberMapping = {
  'A': '1', 'J': '1', 'S': '1',
  'B': '2', 'K': '2', 'T': '2',
  'C': '3', 'L': '3', 'U': '3',
  'D': '4', 'M': '4', 'V': '4',
  'E': '5', 'N': '5', 'W': '5',
  'F': '6', 'O': '6', 'X': '6',
  'G': '7', 'P': '7', 'Y': '7',
  'H': '8', 'Q': '8', 'Z': '8',
  'I': '9', 'R': '9'
};

export function removeSpacesAndVowels(input: string): string {
  logger.debug('Removing spaces and vowels', { input });
  const result = input
    .split('')
    .filter(char => char.match(/[a-zA-Z]/) && !char.match(/[aeiouAEIOU]/))
    .join('');
  logger.debug('Spaces and vowels removed', { input, result });
  return result;
}

export function removeDuplicateLetters(input: string): string {
  logger.debug('Removing duplicate letters', { input });
  const result = Array.from(new Set(input.split('')))
    .filter((_, index, arr) => arr.indexOf(_) === index)
    .join('');
  logger.debug('Duplicate letters removed', { input, result });
  return result;
}

export function convertToNumbers(input: string): string {
  logger.debug('Converting letters to numbers', { input });
  const result = input
    .toUpperCase()
    .split('')
    .map(char => NUMBER_MAPPING[char] || '')
    .join('');
  logger.debug('Letters converted to numbers', { input, result });
  return result;
}

interface ProcessResult {
  numbers: string;
  steps: {
    noSpacesVowels: string;
    noDuplicates: string;
  };
}

export function processAffirmation(input: string): ProcessResult {
  logger.info('Processing affirmation', { input });
  try {
    const noSpacesVowels = removeSpacesAndVowels(input);
    const noDuplicates = removeDuplicateLetters(noSpacesVowels);
    const numbers = convertToNumbers(noDuplicates);
    
    const result = {
      numbers,
      steps: {
        noSpacesVowels,
        noDuplicates
      }
    };
    
    logger.info('Affirmation processed successfully', result);
    return result;
  } catch (error) {
    logger.error('Error processing affirmation', error);
    throw error;
  }
} 