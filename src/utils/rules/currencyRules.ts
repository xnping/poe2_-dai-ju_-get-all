
import { hexToRgb } from './types';
import type { FilterRuleOptions, TypeConfig } from './types';

const currencyConfig: TypeConfig = {
    class: 'Stackable Currency',
    icon: 'Red',
    iconShape: 'Circle',
    name: '通货',
    fontSize: 60
};

export function generateCurrencyRule(options: FilterRuleOptions): string {
    const { label, value, soundEnabled, color, bgColor } = options;
    const defaultColor = '#FF0000';
    const defaultBgColor = '#FFFFFF';

    const rgbColor = color ? hexToRgb(color) : hexToRgb(defaultColor);
    const rgbBgColor = bgColor ? hexToRgb(bgColor) : hexToRgb(defaultBgColor);

    let result = `Show #${currencyConfig.name}-${label}\n`;

    result += `  Class "${currencyConfig.class}"\n`;
    result += `  BaseType "${value}"\n`;

    // 添加样式
    result += `  SetTextColor ${rgbColor}\n`;
    result += `  SetBackgroundColor ${rgbBgColor}\n`;
    result += `  SetBorderColor ${rgbColor}\n`;
    result += `  SetFontSize ${currencyConfig.fontSize}\n`;

    // 添加音效和图标
    if (soundEnabled) {
        result += `  CustomAlertSound "音效\\${label}.mp3"\n`;
    } else {
        result += "  DisableDropSound True\n  DisableAlertSound True\n";
    }
    result += `  MinimapIcon 0 ${currencyConfig.icon} ${currencyConfig.iconShape}\n`;
    result += `  PlayEffect ${currencyConfig.icon}`;

    return result;
}