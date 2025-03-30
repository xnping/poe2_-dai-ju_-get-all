
import { hexToRgb } from './types';
import type { FilterRuleOptions, TypeConfig } from './types';

const flaskConfig: TypeConfig = {
    class: 'Flask',
    icon: 'Yellow',
    iconShape: 'Circle',
    name: '药剂',
    fontSize: 60
};

export function generateFlaskRule(options: FilterRuleOptions): string {
    const { label, value, soundEnabled, color, bgColor } = options;
    const defaultColor = '#00FF00';
    const defaultBgColor = '#FFFFFF';

    const rgbColor = color ? hexToRgb(color) : hexToRgb(defaultColor);
    const rgbBgColor = bgColor ? hexToRgb(bgColor) : hexToRgb(defaultBgColor);

    let result = `Show #${flaskConfig.name}-${label}\n`;

    result += `  Class "${flaskConfig.class}"\n`;
    result += `  BaseType "${value}"\n`;

    // 添加样式
    result += `  SetTextColor ${rgbColor}\n`;
    result += `  SetBackgroundColor ${rgbBgColor}\n`;
    result += `  SetBorderColor ${rgbColor}\n`;
    result += `  SetFontSize ${flaskConfig.fontSize}\n`;

    // 添加音效和图标
    if (soundEnabled) {
        result += `  CustomAlertSound "音效\\${label}.mp3"\n`;
    } else {
        result += "  DisableDropSound True\n  DisableAlertSound True\n";
    }
    result += `  MinimapIcon 0 ${flaskConfig.icon} ${flaskConfig.iconShape}\n`;
    result += `  PlayEffect ${flaskConfig.icon}`;

    return result;
}