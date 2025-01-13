export interface Planet {
  name: string;
  title: string;
  description: string;
  keywords: string[];
  occultSignificance: string;
  effects: string;
}

export const PLANETS: Planet[] = [
  {
    name: "Saturn",
    title: "The Teacher",
    description: "Associated with discipline, structure, and long-term achievements. Governs boundaries and limitations.",
    keywords: ["Discipline", "Structure", "Time", "Karma"],
    occultSignificance: "Represents tests, challenges, and wisdom gained through experience.",
    effects: "Best for manifestations requiring patience and long-term dedication."
  },
  {
    name: "Jupiter",
    title: "The Benefactor",
    description: "Planet of expansion, abundance, and good fortune. Brings growth and opportunity.",
    keywords: ["Expansion", "Abundance", "Wisdom", "Fortune"],
    occultSignificance: "Amplifies positive energies and brings opportunities for growth.",
    effects: "Excellent for prosperity and success-related intentions."
  },
  {
    name: "Mars",
    title: "The Warrior",
    description: "Embodies energy, passion, and drive. Rules over action and courage.",
    keywords: ["Action", "Energy", "Courage", "Strength"],
    occultSignificance: "Provides the drive and energy to accomplish goals.",
    effects: "Perfect for goals requiring motivation and decisive action."
  },
  {
    name: "Sun",
    title: "The Life-Giver",
    description: "Represents vitality, self-expression, and personal power.",
    keywords: ["Vitality", "Power", "Success", "Leadership"],
    occultSignificance: "Central force of manifestation and personal empowerment.",
    effects: "Ideal for personal growth and self-empowerment intentions."
  },
  {
    name: "Venus",
    title: "The Harmonizer",
    description: "Rules love, beauty, and harmony. Brings pleasure and artistic expression.",
    keywords: ["Love", "Beauty", "Harmony", "Art"],
    occultSignificance: "Attracts love, beauty, and positive relationships.",
    effects: "Best for love, art, and relationship-focused intentions."
  },
  {
    name: "Mercury",
    title: "The Messenger",
    description: "Governs communication, learning, and travel. Facilitates exchange of ideas.",
    keywords: ["Communication", "Learning", "Travel", "Trade"],
    occultSignificance: "Enhances mental abilities and communication.",
    effects: "Great for learning, communication, and travel intentions."
  },
  {
    name: "Moon",
    title: "The Reflector",
    description: "Linked to emotions, intuition, and the subconscious mind. Mirrors the mysteries of the inner world.",
    keywords: ["Intuition", "Emotions", "Subconscious", "Dreams"],
    occultSignificance: "Influences emotions, moods, and intuitive understanding.",
    effects: "Perfect for emotional healing and inner work intentions."
  }
]; 