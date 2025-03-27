import { currencyOptions } from '../components/options/CurrencyOptions';
import { equipmentOptions } from '../components/options/EquipmentOptions';
import { generateBasicRule, type FilterRuleOptions } from './filterRules';

interface FilterItem {
    value: string;
    soundEnabled: boolean;
    color?: string;
}

function generateHeader(): string {
    return `# POE过滤器生成器\n# 生成时间: ${new Date().toLocaleString()}\n\n`;
}

function generateCurrencyRules(items: FilterItem[]): string {
    return items
        .map((item) => {
            const option = currencyOptions.find((opt) => opt.value === item.value);
            const ruleOptions: FilterRuleOptions = {
                label: option?.label || item.value,
                value: item.value,
                soundEnabled: item.soundEnabled,
                type: 'currency',
                color: item.color
            };
            return generateBasicRule(ruleOptions);
        })
        .join('\n\n');
}

function generateEquipmentRules(items: FilterItem[]): string {
    return items
        .map((item) => {
            const option = equipmentOptions.find((opt) => opt.value === item.value);
            const ruleOptions: FilterRuleOptions = {
                label: option?.label || item.value,
                value: item.value,
                soundEnabled: item.soundEnabled,
                type: 'equipment',
                color: item.color
            };
            return generateBasicRule(ruleOptions);
        })
        .join('\n\n');
}

export function generateFilterContent(
    currencyCheckedList: FilterItem[],
    equipmentCheckedList: FilterItem[]
): string {
    if (currencyCheckedList.length === 0 && equipmentCheckedList.length === 0) {
        return "";
    }

    const header = generateHeader();
    const currencyRules = generateCurrencyRules(currencyCheckedList);
    const equipmentRules = generateEquipmentRules(equipmentCheckedList);

    return header +
        currencyRules +
        (currencyRules && equipmentRules ? '\n\n' : '') +
        equipmentRules;
}