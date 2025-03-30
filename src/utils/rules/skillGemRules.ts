
import { hexToRgb } from './types';
import type { FilterRuleOptions, TypeConfig } from './types';

const skillGemConfig: TypeConfig = {
    class: null,
    icon: 'Orange',
    iconShape: 'Kite',
    name: '技能宝石',
    fontSize: 40,
    iconSize: 1
};

export function generateSkillGemRule(options: FilterRuleOptions): string {
    const { label, value, soundEnabled, color, bgColor, tap } = options;
    const defaultColor = '#00FF00';
    const defaultBgColor = '#FFFFFF';

    const rgbColor = color ? hexToRgb(color) : hexToRgb(defaultColor);
    const rgbBgColor = bgColor ? hexToRgb(bgColor) : hexToRgb(defaultBgColor);

    let result = `Show #${skillGemConfig.name}-${label}\n`;

    // 为技能石添加 ItemLevel 属性
    if (tap) {
        result += `  ItemLevel ${tap}\n`;
    }

    result += `  BaseType "${value}"\n`;

    // 添加样式
    result += `  SetTextColor ${rgbColor}\n`;
    result += `  SetBackgroundColor ${rgbBgColor}\n`;
    result += `  SetBorderColor ${rgbColor}\n`;
    result += `  SetFontSize ${skillGemConfig.fontSize}\n`;

    // 添加技能宝石特有的音效和图标设置
    result += `  MinimapIcon ${skillGemConfig.iconSize} ${skillGemConfig.icon} ${skillGemConfig.iconShape}\n`;
    result += '#    PlayAlertSound 15 300\n';
    if (soundEnabled) {
        result += `  CustomAlertSound "音效\\宝石.mp3" 300\n`;
    }
    result += '  DisableDropSound';

    return result;
}