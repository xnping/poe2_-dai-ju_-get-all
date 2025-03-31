
import { hexToRgb } from './types';
import type { FilterRuleOptions, TypeConfig } from './types';

const globalConfig: TypeConfig = {
    class: null,
    icon: 'White',
    iconShape: 'Circle',
    name: '全局设置',
    fontSize: 32
};

export function generateGlobalRule(options: FilterRuleOptions): string {
    const { label, value, soundEnabled, color, bgColor } = options;

    let result = `Show # ${globalConfig.name}-${label}\n`;

    // 根据不同的装备品质设置规则
    if (value === 'Normal Items') {
        result += `  Rarity Normal\n`;
        result += `  SetTextColor 200 200 200\n`;
        result += `  SetBackgroundColor 0 0 0 0\n`;
        result += `  SetBorderColor 200 200 200\n`;
    } else if (value === 'Magic Items') {
        result += `  Rarity Magic\n`;
        result += `  SetTextColor 136 136 255\n`;
        result += `  SetBackgroundColor 0 0 0 0\n`;
        result += `  SetBorderColor 136 136 255\n`;
    } else if (value === 'Rare Items') {
        result += `  Rarity Rare\n`;
        result += `  SetTextColor 255 255 119\n`;
        result += `  SetBackgroundColor 0 0 0 0\n`;
        result += `  SetBorderColor 255 255 119\n`;
    }

    result += `  SetFontSize ${globalConfig.fontSize}\n`;

    // 添加音效设置
    if (soundEnabled) {
        result += `  CustomAlertSound "音效\\${label}.mp3"\n`;
    } else {
        result += "  DisableDropSound True\n  DisableAlertSound True\n";
    }

    return result;
}