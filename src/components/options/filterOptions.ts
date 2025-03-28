
export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterOptions {
    [key: string]: FilterOption[];
}

export const filterOptions: FilterOptions = {
    currency: [
        { label: "卡兰德的魔镜", value: "Mirror of Kalandra" },
        { label: "神圣石", value: "Divine Orb" },
        { label: "混沌石", value: "Chaos Orb" },
        { label: "镜子", value: "Mirror of Kalandra" },
        { label: "碎片", value: "Splinter" },
        { label: "手工艺品", value: "Crafting Item" },
        { label: "地图", value: "Map" },
        { label: "命运卡", value: "Divination Card" },
        { label: "精髓", value: "Essence" },
        { label: "化石", value: "Fossil" },
        { label: "催化剂", value: "Catalyst" },
        { label: "油", value: "Oil" },
    ],
    equipment: [
        { label: "六连装备", value: "Six-Link" },
        { label: "传奇装备", value: "Unique" },
        { label: "高物品等级", value: "High iLvl" },
        { label: "高抗性", value: "High Resistance" },
        { label: "高生命", value: "High Life" },
        { label: "高伤害", value: "High Damage" },
        { label: "高护甲", value: "High Armor" },
        { label: "高闪避", value: "High Evasion" },
        { label: "高能量护盾", value: "High ES" },
        { label: "高属性", value: "High Attribute" },
        { label: "高移动速度", value: "High Movement" },
        { label: "高暴击", value: "High Crit" },
    ],
    flask: [
        { label: "生命药剂", value: "Life Flask" },
        { label: "魔力药剂", value: "Mana Flask" },
        { label: "复合药剂", value: "Hybrid Flask" },
        { label: "水银药剂", value: "Quicksilver Flask" },
        { label: "红玉药剂", value: "Ruby Flask" },
        { label: "蓝玉药剂", value: "Sapphire Flask" },
        { label: "黄玉药剂", value: "Topaz Flask" },
        { label: "坚岩药剂", value: "Granite Flask" },
        { label: "紫晶药剂", value: "Amethyst Flask" },
        { label: "石英药剂", value: "Quartz Flask" },
        { label: "玄武岩药剂", value: "Basalt Flask" },
        { label: "祝福药剂", value: "Divine Flask" },
    ],
    jewel: [
        { label: "深渊珠宝", value: "Abyss Jewel" },
        { label: "普通珠宝", value: "Normal Jewel" },
        { label: "星团珠宝", value: "Cluster Jewel" },
        { label: "幻灭珠宝", value: "Megalomaniac" },
        { label: "守望之眼", value: "Watcher's Eye" },
        { label: "超自然珠宝", value: "Transcendent Jewel" },
        { label: "永恒珠宝", value: "Timeless Jewel" },
        { label: "变相珠宝", value: "Metamorphic Jewel" },
    ],
    skillgem: [
        { label: "瓦尔技能石", value: "Vaal" },
        { label: "觉醒技能石", value: "Awakened" },
        { label: "异常技能石", value: "Anomalous" },
        { label: "魅影技能石", value: "Phantasmal" },
        { label: "发光技能石", value: "Enlighten" },
        { label: "赋予技能石", value: "Empower" },
        { label: "增幅技能石", value: "Enhance" },
        { label: "品质 >= 20%", value: "Quality >= 20" },
        { label: "等级 >= 20", value: "Level >= 20" },
        { label: "任意技能石", value: "Any Gem" }
    ],
    unique: [
        { label: "任意传奇装备", value: "Any Unique" },
        { label: "传奇武器", value: "Unique Weapon" },
        { label: "传奇护甲", value: "Unique Armour" },
        { label: "传奇饰品", value: "Unique Accessory" },
        { label: "传奇腰带", value: "Unique Belt" },
        { label: "传奇戒指", value: "Unique Ring" },
        { label: "传奇项链", value: "Unique Amulet" },
        { label: "传奇箭袋", value: "Unique Quiver" },
        { label: "六连传奇", value: "6-Linked Unique" },
        { label: "高价传奇", value: "Valuable Unique" }
    ]
};

export const filterTitles: Record<string, string> = {
    currency: "通货",
    equipment: "装备",
    flask: "药剂",
    jewel: "珠宝",
    normalequipment: "普通装备",
    skillgem: "技能宝石",
    unique: "传奇物品"
};