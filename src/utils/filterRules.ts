// 将十六进制颜色转换为RGB格式
function hexToRgb(hex: string): string {
    // 移除#号如果存在
    hex = hex.replace('#', '');

    // 解析RGB值
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r} ${g} ${b}`;
}

// 基础规则生成器
interface FilterRuleOptions {
    label: string;
    value: string;
    soundEnabled: boolean;
    type: 'currency' | 'equipment';
    color?: string;
}

function generateBasicRule(options: FilterRuleOptions): string {
    const { label, value, soundEnabled, type, color } = options;
    const defaultColor = type === 'currency' ? '#FF0000' : '#00FF00';
    const rgbColor = color ? hexToRgb(color) : hexToRgb(defaultColor);

    const typeConfig = type === 'currency'
        ? {
            class: 'Stackable Currency',
            icon: 'Red',
        }
        : {
            class: 'Equipment',
            icon: 'Green',
        };

    const soundSetting = soundEnabled
        ? `  CustomAlertSound "音效\\${label}.mp3"`
        : "  DisableDropSound True\n  DisableAlertSound True";

    // 计算背景色（原始颜色的20%亮度）
    const [r, g, b] = rgbColor.split(' ').map(n => Math.floor(parseInt(n) * 0.2));
    const backgroundColor = `${r} ${g} ${b}`;

    return `Show #"${type === 'currency' ? '通货' : '装备'}-${label}"
  Class "${typeConfig.class}"
  BaseType "${value}"
  SetTextColor 255 255 255
  SetBackgroundColor ${backgroundColor}
  SetBorderColor ${rgbColor}
  SetFontSize 60
${soundSetting}
  MinimapIcon 0 ${typeConfig.icon} Circle
  PlayEffect ${typeConfig.icon}`;
}

export { generateBasicRule, type FilterRuleOptions };