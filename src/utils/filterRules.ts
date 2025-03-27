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
    type: 'currency' | 'equipment' | 'jewel' | 'flask' | 'skillgem' | 'unique' | 'normalequipment';
    color?: string;
    bgColor?: string;
}

function generateBasicRule(options: FilterRuleOptions): string {
    const { label, value, soundEnabled, type, color, bgColor } = options;
    const defaultColor = type === 'currency' ? '#FF0000' : '#00FF00';
    const defaultBgColor = '#FFFFFF';

    const rgbColor = color ? hexToRgb(color) : hexToRgb(defaultColor);
    const rgbBgColor = bgColor ? hexToRgb(bgColor) : hexToRgb(defaultBgColor);

    const typeConfig = (() => {
        switch (type) {
            case 'currency':
                return {
                    class: 'Stackable Currency',
                    icon: 'Red'
                };
            case 'equipment':
                return {
                    class: 'Equipment',
                    icon: 'Green'
                };
            case 'jewel':
                return {
                    class: 'Jewel',
                    icon: 'Blue'
                };
            case 'flask':
                return {
                    class: 'Flask',
                    icon: 'Yellow'
                };
            case 'skillgem':
                return {
                    class: 'Gem',
                    icon: 'White'
                };
            case 'unique':
                return {
                    class: 'Equipment',
                    icon: 'Brown'
                };
            case 'normalequipment':
                return {
                    class: 'Equipment',
                    icon: 'Green'
                };
            default:
                return {
                    class: 'Equipment',
                    icon: 'Green'
                };
        }
    })();

    const soundSetting = soundEnabled
        ? `  CustomAlertSound "音效\\${label}.mp3"`
        : "  DisableDropSound True\n  DisableAlertSound True";

    return `Show #"${type === 'currency' ? '通货' : '装备'}-${label}"
  Class "${typeConfig.class}"
  BaseType "${value}"
  SetTextColor ${rgbColor}
  SetBackgroundColor ${rgbBgColor}
  SetBorderColor ${rgbColor}
  SetFontSize 60
${soundSetting}
  MinimapIcon 0 ${typeConfig.icon} Circle
  PlayEffect ${typeConfig.icon}`;
}

export { generateBasicRule, type FilterRuleOptions };