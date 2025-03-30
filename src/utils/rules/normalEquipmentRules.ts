
import { hexToRgb } from './types';
import type { FilterRuleOptions, TypeConfig } from './types';

const normalEquipmentConfig: TypeConfig = {
    class: 'Equipment',
    icon: 'Green',
    iconShape: 'Circle',
    name: '普通装备',
    fontSize: 60
};

export function generateNormalEquipmentRule(options: FilterRuleOptions): string {
    const { label, value, soundEnabled, color, bgColor } = options;
    const defaultColor = '#00FF00';
    const defaultBgColor = '#FFFFFF';

    const rgbColor = color ? hexToRgb(color) : hexToRgb(defaultColor);
    const rgbBgColor = bgColor ? hexToRgb(bgColor) : hexToRgb(defaultBgColor);

    let result = `Show #${normalEquipmentConfig.name}-${label}\n`;

    result += `  Class "${normalEquipmentConfig.class}"\n`;
    result += `  BaseType "${value}"\n`;

    // 添加样式
    result += `  SetTextColor ${rgbColor}\n`;
    result += `  SetBackgroundColor ${rgbBgColor}\n`;
    result += `  SetBorderColor ${rgbColor}\n`;
    result += `  SetFontSize ${normalEquipmentConfig.fontSize}\n`;

    // 添加音效和图标
    if (soundEnabled) {
        result += `  CustomAlertSound "音效\\${label}.mp3"\n`;
    } else {
        result += "  DisableDropSound True\n  DisableAlertSound True\n";
    }
    result += `  MinimapIcon 0 ${normalEquipmentConfig.icon} ${normalEquipmentConfig.iconShape}\n`;
    result += `  PlayEffect ${normalEquipmentConfig.icon}`;

    return result;
}