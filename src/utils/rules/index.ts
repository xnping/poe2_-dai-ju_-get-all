
import type { FilterRuleOptions } from './types';
import { generateCurrencyRule } from './currencyRules';
import { generateEquipmentRule } from './equipmentRules';
import { generateJewelRule } from './jewelRules';
import { generateFlaskRule } from './flaskRules';
import { generateSkillGemRule } from './skillGemRules';
import { generateUniqueRule } from './uniqueRules';
import { generateNormalEquipmentRule } from './normalEquipmentRules';
import { generateMiscRule } from './miscRules';
import { generateGlobalRule } from './globalRules';

export function generateRule(options: FilterRuleOptions): string {
    switch (options.type) {
        case 'currency':
            return generateCurrencyRule(options);
        case 'equipment':
            return generateEquipmentRule(options);
        case 'jewel':
            return generateJewelRule(options);
        case 'flask':
            return generateFlaskRule(options);
        case 'skillgem':
            return generateSkillGemRule(options);
        case 'unique':
            return generateUniqueRule(options);
        case 'normalequipment':
            return generateNormalEquipmentRule(options);
        case 'misc':
            return generateMiscRule(options);
        case 'global':
            return generateGlobalRule(options);
        default:
            throw new Error(`Unknown filter type: ${options.type}`);
    }
}

export type { FilterRuleOptions };