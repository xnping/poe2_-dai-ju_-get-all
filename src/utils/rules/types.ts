
// 基础规则选项接口
export interface FilterRuleOptions {
    label: string;
    value: string;
    soundEnabled: boolean;
    type: 'currency' | 'equipment' | 'jewel' | 'flask' | 'skillgem' | 'unique' | 'normalequipment';
    color?: string;
    bgColor?: string;
    tap?: string;
}

// 物品类型配置接口
export interface TypeConfig {
    class: string | null;
    icon: string;
    iconShape: string;
    name: string;
    fontSize: number;
    iconSize?: number;
}

// 将十六进制颜色转换为RGB格式
export function hexToRgb(hex: string): string {
    // 移除#号如果存在
    hex = hex.replace('#', '');

    // 解析RGB值
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r} ${g} ${b}`;
}