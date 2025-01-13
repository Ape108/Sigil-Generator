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

export function processAffirmation(affirmation: string) {
  // First, remove all punctuation, spaces, and convert to lowercase
  const cleanText = affirmation
    .toLowerCase()
    .replace(/['',.!-\s]/g, '')  // Remove punctuation AND spaces in one go
    .trim();

  // Remove vowels
  const noVowels = cleanText.replace(/[aeiou]/g, '');
  
  // Remove duplicates
  const noDuplicates = [...new Set(noVowels)].join('');
  
  // Check if we have enough letters to make a sigil
  if (noDuplicates.length < 2) {
    throw new Error('Not enough consonants to create a sigil. Need at least 2 unique consonants.');
  }
  
  // Convert to numbers
  const numbers = noDuplicates
    .split('')
    .map(char => ((char.charCodeAt(0) - 97) % 9) + 1)
    .join('');

  return {
    numbers,
    steps: {
      noSpacesVowels: noVowels,
      noDuplicates
    }
  };
} 