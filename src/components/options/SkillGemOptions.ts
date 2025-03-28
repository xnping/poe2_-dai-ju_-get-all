
import type { FilterOption } from './filterOptions';

export const skillGemOptions: FilterOption[] = [
    { label: "1-14技能石", value: "Uncut Skill Gem", tap: "<=14" },
    { label: "15-20技能石", value: "Uncut Skill Gem", tap: ">=15" },
    { label: "19-20技能石", value: "Uncut Skill Gem", tap: ">=19" },
    { label: "1级辅助宝石", value: "Uncut Support Gem", tap: ">=1" },
    { label: "2级辅助宝石", value: "Uncut Support Gem", tap: ">=2" },
    { label: "3级辅助宝石", value: "Uncut Support Gem", tap: ">=3" },
    { label: "1-18精魄石", value: "Uncut Spirit Gem", tap: "<=18" },
    { label: "19-20精魄石", value: "Uncut Spirit Gem", tap: ">=19" },
];