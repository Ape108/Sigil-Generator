export interface PlanetDescription {
  name: string;
  title: string;
  description: string;
  keywords: string[];
  occultSignificance: string;
  effects: string;
}

export const PLANET_DATA: PlanetDescription[] = [
  {
    name: "Mercury",
    title: "The Messenger",
    description: "Associated with communication, intellect, and travel. Connected to the Greek god Hermes and Egyptian Thoth.",
    keywords: ["Communication", "Intelligence", "Travel", "Learning"],
    occultSignificance: "Rules communication, travel, intellect, and thought processes.",
    effects: "Best for affirmations related to learning, communication, writing, or intellectual pursuits."
  },
  {
    name: "Venus",
    title: "The Harmonizer",
    description: "Symbolizes love, beauty, art, and attraction. Embodies the principle of unity.",
    keywords: ["Love", "Beauty", "Art", "Harmony"],
    occultSignificance: "Governs love, beauty, and harmony in relationships and artistic expression.",
    effects: "Ideal for affirmations about love, relationships, art, or self-worth."
  },
  {
    name: "Mars",
    title: "The Warrior",
    description: "Represents drive, aggression, and courage. Embodies the principle of dynamic force.",
    keywords: ["Courage", "Action", "Energy", "Ambition"],
    occultSignificance: "Drives ambition, energy, and courage in material pursuits.",
    effects: "Perfect for affirmations about strength, courage, achievement, or overcoming obstacles."
  },
  {
    name: "Jupiter",
    title: "The Expander",
    description: "The planet of expansion, abundance, and wisdom. Represents spiritual blessings and growth.",
    keywords: ["Expansion", "Abundance", "Wisdom", "Growth"],
    occultSignificance: "Brings expansion, wisdom, and prosperity through alignment with divine wisdom.",
    effects: "Excellent for affirmations about prosperity, wisdom, growth, or spiritual development."
  },
  {
    name: "Saturn",
    title: "The Teacher",
    description: "Symbolizes boundaries, limitations, discipline, and time. Associated with life's important lessons.",
    keywords: ["Discipline", "Structure", "Time", "Wisdom"],
    occultSignificance: "Teaches through discipline, time, and karma. Associated with transformation.",
    effects: "Best for affirmations about discipline, long-term goals, or overcoming limitations."
  },
  {
    name: "Sun",
    title: "The Illuminator",
    description: "Represents the self, vitality, and core essence of being. Symbolizes the divine spark within.",
    keywords: ["Vitality", "Self-expression", "Leadership", "Success"],
    occultSignificance: "Governs vitality, ego, and the core self. Represents the journey to enlightenment.",
    effects: "Ideal for affirmations about personal power, success, health, or self-realization."
  },
  {
    name: "Moon",
    title: "The Reflector",
    description: "Linked to emotions, intuition, and the subconscious mind. Mirrors the mysteries of the inner world.",
    keywords: ["Intuition", "Emotions", "Subconscious", "Dreams"],
    occultSignificance: "Influences emotions, moods, and intuitive understanding.",
    effects: "Perfect for affirmations about emotional healing, intuition, or inner work."
  }
]; 