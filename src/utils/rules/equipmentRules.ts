
import { hexToRgb } from './types';
import type { FilterRuleOptions, TypeConfig } from './types';

const equipmentConfig: TypeConfig = {
    class: 'Waystones',
    icon: 'Red',
    iconShape: 'Hexagon',
    name: '地图',
    fontSize: 45
};

export function generateEquipmentRule(options: FilterRuleOptions): string {
    const { label, value, soundEnabled, color, bgColor } = options;
    const defaultColor = '#FF0080';
    const defaultBgColor = '#FFFFFF';

    const rgbColor = color ? hexToRgb(color) : hexToRgb(defaultColor);
    const rgbBgColor = bgColor ? hexToRgb(bgColor) : hexToRgb(defaultBgColor);

    let result = `Show #${equipmentConfig.name}-${label}\n`;

    result += `  Class "${equipmentConfig.class}"\n`;
    result += `  BaseType "${value}"\n`;

    // 添加样式
    result += `  SetTextColor ${rgbColor}\n`;
    result += `  SetBackgroundColor ${rgbBgColor}\n`;
    result += `  SetBorderColor ${rgbColor}\n`;
    result += `  SetFontSize ${equipmentConfig.fontSize}\n`;

    // 添加地图特有的音效设置
    result += `  MinimapIcon 0 ${equipmentConfig.icon} ${equipmentConfig.iconShape}\n`;
    result += `  PlayEffect ${equipmentConfig.icon}\n`;
    result += '#    PlayAlertSound 4 300\n';
    if (soundEnabled) {
        result += `  CustomAlertSound "音效\\高级地图.mp3" 300\n`;
    }
    result += '  DisableDropSound';

    return result;
}