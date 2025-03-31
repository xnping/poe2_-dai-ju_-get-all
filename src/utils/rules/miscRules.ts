
import { hexToRgb } from './types';
import type { FilterRuleOptions, TypeConfig } from './types';
import { miscOptions } from '../../components/options/MiscOptions';

const miscConfig: TypeConfig = {
    class: 'Stackable Currency',
    icon: 'White',
    iconShape: 'Circle',
    name: '杂项',
    fontSize: 45
};

const goldConfig: TypeConfig = {
    class: 'Gold',
    name: '杂项 - 金币',
    fontSize: 36,
    icon: 'Yellow',
    iconShape: 'Star'
};

export function generateMiscRule(options: FilterRuleOptions): string {
    // 查找对应的选项配置
    const itemConfig = miscOptions.find(item => item.value === options.value);
    const { label, value, soundEnabled, color, bgColor } = options;

    // 特殊处理金币
    if (value === 'Gold') {
        let result = `Show # ${goldConfig.name}\n`;
        result += `  Class "${goldConfig.class}"\n`;
        result += `  SetTextColor 235 86 32\n`;
        result += `  SetBackgroundColor 0 0 0 0\n`;
        result += `  SetBorderColor 0 0 0 0\n`;
        result += `  SetFontSize ${goldConfig.fontSize}\n`;
        result += `  DisableDropSound\n`;
        result += `  MinimapIcon 2 ${goldConfig.icon} ${goldConfig.iconShape}\n`;
        result += `  PlayEffect ${goldConfig.icon}`;
        return result;
    }

    // 其他杂项的处理
    const defaultColor = '#FFFFFF';
    const defaultBgColor = '#000000';

    const rgbColor = color ? hexToRgb(color) : hexToRgb(defaultColor);
    const rgbBgColor = bgColor ? hexToRgb(bgColor) : hexToRgb(defaultBgColor);

    let result = `Show #${miscConfig.name}-${label}\n`;
    result += `  Class "${miscConfig.class}"\n`;
    result += `  BaseType "${value}"\n`;

    // 添加样式
    result += `  SetTextColor ${rgbColor}\n`;
    result += `  SetBackgroundColor ${rgbBgColor}\n`;
    result += `  SetBorderColor ${rgbColor}\n`;
    result += `  SetFontSize ${miscConfig.fontSize}\n`;

    // 添加音效和图标
    if (soundEnabled) {
        result += `  CustomAlertSound "音效\\${label}.mp3"\n`;
    } else {
        result += "  DisableDropSound True\n  DisableAlertSound True\n";
    }

    // 使用物品特定的图标配置
    const icon = itemConfig?.icon || miscConfig.icon;
    const iconShape = itemConfig?.iconShape || miscConfig.iconShape;
    result += `  MinimapIcon 0 ${icon} ${iconShape}\n`;
    result += `  PlayEffect ${icon}`;

    return result;
}