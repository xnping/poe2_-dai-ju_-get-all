
// 总控制开关
export interface FilterOption {
    label: string;
    value: string;
    tap?: string;  // 添加可选的 tap 属性
}

export interface FilterOptions {
    [key: string]: FilterOption[];
}

export const filterTitles: Record<string, string> = {
    currency: "通货",
    equipment: "地图",
    flask: "药剂",
    jewel: "珠宝",
    normalequipment: "普通装备",
    skillgem: "技能宝石",
    unique: "传奇物品"
};