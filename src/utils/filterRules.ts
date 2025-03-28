
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
    tap?: string;
}

function generateBasicRule(options: FilterRuleOptions): string {
    const { label, value, soundEnabled, type, color, bgColor, tap } = options;
    const defaultColor = type === 'equipment' ? '#FF0080' : (type === 'currency' ? '#FF0000' : '#00FF00');
    const defaultBgColor = '#FFFFFF';

    const rgbColor = color ? hexToRgb(color) : hexToRgb(defaultColor);
    const rgbBgColor = bgColor ? hexToRgb(bgColor) : hexToRgb(defaultBgColor);

    const typeConfig = (() => {
        switch (type) {
            case 'currency':
                return {
                    class: 'Stackable Currency',
                    icon: 'Red',
                    iconShape: 'Circle',
                    name: '通货',
                    fontSize: 60
                };
            case 'equipment':
                return {
                    class: 'Waystones',
                    icon: 'Red',
                    iconShape: 'Hexagon',
                    name: '地图',
                    fontSize: 45
                };
            case 'jewel':
                return {
                    class: 'Jewel',
                    icon: 'Blue',
                    iconShape: 'Circle',
                    name: '珠宝',
                    fontSize: 60
                };
            case 'flask':
                return {
                    class: 'Flask',
                    icon: 'Yellow',
                    iconShape: 'Circle',
                    name: '药剂',
                    fontSize: 60
                };
            case 'skillgem':
                return {
                    class: null,
                    icon: 'White',
                    iconShape: 'Circle',
                    name: '技能宝石',
                    fontSize: 60
                };
            case 'unique':
                return {
                    class: 'Equipment',
                    icon: 'Brown',
                    iconShape: 'Circle',
                    name: '传奇装备',
                    fontSize: 60
                };
            case 'normalequipment':
                return {
                    class: 'Equipment',
                    icon: 'Green',
                    iconShape: 'Circle',
                    name: '普通装备',
                    fontSize: 60
                };
            default:
                return {
                    class: 'Equipment',
                    icon: 'Green',
                    iconShape: 'Circle',
                    name: '装备',
                    fontSize: 60
                };
        }
    })();

    // 根据宝石类型设置音效名称
    let soundName = label;
    if (type === 'skillgem') {
        if (value.includes('Support')) {
            soundName = '辅助宝石';
        } else if (value.includes('Spirit')) {
            soundName = '精魂宝石';
        } else {
            soundName = '技能石';
        }
    } else if (type === 'equipment') {
        soundName = '高级地图';
    }

    // 构建基本规则
    let result = `Show #"${typeConfig.name}-${label}"\n`;
    if (typeConfig.class) {
        result += `  Class "${typeConfig.class}"\n`;
    }
    result += `  BaseType "${value}"\n`;

    // 为技能石添加 ItemLevel 属性
    if (type === 'skillgem' && tap) {
        result += `  ItemLevel ${tap}\n`;
    }

    // 添加其他属性
    result += `  SetTextColor ${rgbColor}\n`;
    result += `  SetBackgroundColor ${rgbBgColor}\n`;
    result += `  SetBorderColor ${rgbColor}\n`;
    result += `  SetFontSize ${typeConfig.fontSize}\n`;

    // 添加地图特有的音效设置
    if (type === 'equipment') {
        result += `  MinimapIcon 0 ${typeConfig.icon} ${typeConfig.iconShape}\n`;
        result += `  PlayEffect ${typeConfig.icon}\n`;
        result += '#    PlayAlertSound 4 300\n';
        if (soundEnabled) {
            result += `  CustomAlertSound "音效\\${soundName}.mp3" 300\n`;
        }
        result += '  DisableDropSound';
    } else {
        if (soundEnabled) {
            result += `  CustomAlertSound "音效\\${soundName}.mp3"\n`;
        } else {
            result += "  DisableDropSound True\n  DisableAlertSound True\n";
        }
        result += `  MinimapIcon 0 ${typeConfig.icon} ${typeConfig.iconShape}\n`;
        result += `  PlayEffect ${typeConfig.icon}`;
    }

    return result;
}

export { generateBasicRule, type FilterRuleOptions };