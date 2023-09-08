import { Ability } from "../types/Ability";
import { SkillName } from "../types/SkillName";

export interface Skill {
  name: SkillName;
  ability: Ability;
}

export const SkillList: Skill[] = [
  {
    name: "Acrobatics",
    ability: "Dexterity",
  },
  {
    name: "Arcana",
    ability: "Intelligence",
  },
  {
    name: "Animal Handling",
    ability: "Wisdom",
  },
  {
    name: "Athletics",
    ability: "Strength",
  },
  {
    name: "Deception",
    ability: "Charisma",
  },
  {
    name: "History",
    ability: "Intelligence",
  },
  {
    name: "Insight",
    ability: "Wisdom",
  },
  {
    name: "Intimidation",
    ability: "Charisma",
  },
  {
    name: "Investigation",
    ability: "Intelligence",
  },
  {
    name: "Medicine",
    ability: "Wisdom",
  },
  {
    name: "Nature",
    ability: "Intelligence",
  },
  {
    name: "Perception",
    ability: "Wisdom",
  },
  {
    name: "Performance",
    ability: "Charisma",
  },
  {
    name: "Persuasion",
    ability: "Charisma",
  },
  {
    name: "Religion",
    ability: "Intelligence",
  },

  {
    name: "Sleight of Hand",
    ability: "Dexterity",
  },
  {
    name: "Stealth",
    ability: "Dexterity",
  },
  {
    name: "Survival",
    ability: "Wisdom",
  },
];
