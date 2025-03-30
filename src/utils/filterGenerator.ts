
/**

 * 生成过滤器内容的工具函数

 * 

 * @param currencyCheckedList - 货币物品过滤列表

 * @param equipmentCheckedList - 装备物品过滤列表  

 * @param jewelCheckedList - 珠宝物品过滤列表

 * @param flaskCheckedList - 药剂物品过滤列表

 * @param skillGemCheckedList - 技能宝石过滤列表

 * @param uniqueCheckedList - 传奇物品过滤列表

 * @param normalEquipmentCheckedList - 普通装备过滤列表

 * @returns 生成的过滤器内容字符串。如果所有列表都为空则返回空字符串

 */

import { skillGemOptions } from '../components/options/SkillGemOptions';
import { generateRule, type FilterRuleOptions } from './rules';

interface FilterItem {
    value: string;
    label: string;  // 添加 label 字段
    soundEnabled: boolean;
    color?: string;
    bgColor?: string;
}

function generateHeader(): string {
    return `# POE过滤器生成器\n# 生成时间: ${new Date().toLocaleString()}\n\n`;
}

function generateCurrencyRules(items: FilterItem[]): string {
    return items
        .map((item) => {
            const ruleOptions: FilterRuleOptions = {
                label: item.label,
                value: item.value,
                soundEnabled: item.soundEnabled,
                type: 'currency',
                color: item.color,
                bgColor: item.bgColor
            };
            return generateRule(ruleOptions);
        })
        .join('\n\n');
}

function generateEquipmentRules(items: FilterItem[]): string {
    return items
        .map((item) => {
            const ruleOptions: FilterRuleOptions = {
                label: item.label,
                value: item.value,
                soundEnabled: item.soundEnabled,
                type: 'equipment',
                color: item.color,
                bgColor: item.bgColor
            };
            return generateRule(ruleOptions);
        })
        .join('\n\n');
}

function generateJewelRules(items: FilterItem[]): string {
    return items
        .map((item) => {
            const ruleOptions: FilterRuleOptions = {
                label: item.label,
                value: item.value,
                soundEnabled: item.soundEnabled,
                type: 'jewel',
                color: item.color,
                bgColor: item.bgColor
            };
            return generateRule(ruleOptions);
        })
        .join('\n\n');
}

function generateFlaskRules(items: FilterItem[]): string {
    return items
        .map((item) => {
            const ruleOptions: FilterRuleOptions = {
                label: item.label,
                value: item.value,
                soundEnabled: item.soundEnabled,
                type: 'flask',
                color: item.color,
                bgColor: item.bgColor
            };
            return generateRule(ruleOptions);
        })
        .join('\n\n');
}

function generateSkillGemRules(items: FilterItem[]): string {
    return items
        .map((item) => {
            const option = skillGemOptions.find((opt) => opt.value === item.value && opt.label === item.label);
            const ruleOptions: FilterRuleOptions = {
                label: item.label,
                value: item.value,
                soundEnabled: item.soundEnabled,
                type: 'skillgem',
                color: item.color,
                bgColor: item.bgColor,
                tap: option?.tap
            };
            return generateRule(ruleOptions);
        })
        .join('\n\n');
}

function generateUniqueRules(items: FilterItem[]): string {
    return items
        .map((item) => {
            const ruleOptions: FilterRuleOptions = {
                label: item.label,
                value: item.value,
                soundEnabled: item.soundEnabled,
                type: 'unique',
                color: item.color,
                bgColor: item.bgColor
            };
            return generateRule(ruleOptions);
        })
        .join('\n\n');
}

function generateNormalEquipmentRules(items: FilterItem[]): string {
    return items
        .map((item) => {
            const ruleOptions: FilterRuleOptions = {
                label: item.label,
                value: item.value,
                soundEnabled: item.soundEnabled,
                type: 'normalequipment',
                color: item.color,
                bgColor: item.bgColor
            };
            return generateRule(ruleOptions);
        })
        .join('\n\n');
}

export function generateFilterContent(
    currencyCheckedList: FilterItem[],
    equipmentCheckedList: FilterItem[],
    jewelCheckedList: FilterItem[],
    flaskCheckedList: FilterItem[],
    skillGemCheckedList: FilterItem[],
    uniqueCheckedList: FilterItem[],
    normalEquipmentCheckedList: FilterItem[]
): string {
    if (currencyCheckedList.length === 0 &&
        equipmentCheckedList.length === 0 &&
        jewelCheckedList.length === 0 &&
        flaskCheckedList.length === 0 &&
        skillGemCheckedList.length === 0 &&
        uniqueCheckedList.length === 0 &&
        normalEquipmentCheckedList.length === 0) {
        return "";
    }

    const header = generateHeader();
    const currencyRules = generateCurrencyRules(currencyCheckedList);
    const equipmentRules = generateEquipmentRules(equipmentCheckedList);
    const jewelRules = generateJewelRules(jewelCheckedList);
    const flaskRules = generateFlaskRules(flaskCheckedList);
    const skillGemRules = generateSkillGemRules(skillGemCheckedList);
    const uniqueRules = generateUniqueRules(uniqueCheckedList);
    const normalEquipmentRules = generateNormalEquipmentRules(normalEquipmentCheckedList);

    const rules = [
        currencyRules,
        equipmentRules,
        jewelRules,
        flaskRules,
        skillGemRules,
        uniqueRules,
        normalEquipmentRules
    ].filter(rule => rule.length > 0);

    return header + rules.join('\n\n');
}