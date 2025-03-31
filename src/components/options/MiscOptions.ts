
interface MiscOption {
    value: string;
    label: string;
    icon?: string;      // 图标颜色
    iconShape?: string; // 图标形状
}

export const miscOptions: MiscOption[] = [
    {
        value: "Gold",
        label: "💰 金币",
        icon: "Yellow",
        iconShape: "Star"
    },
    {
        value: "Perandus Coin",
        label: "🪙 普兰德斯金币",
        icon: "Yellow",
        iconShape: "Circle"
    },
    {
        value: "Ancient Relic",
        label: "🏺 遗物",
        icon: "Purple",
        iconShape: "Diamond"
    },
    {
        value: "Timeless Eternal Empire Splinter",
        label: "🔮 传奇遗物",
        icon: "Purple",
        iconShape: "Star"
    },
    {
        value: "Golden Key",
        label: "🗝️ 迷宫钥匙",
        icon: "Yellow",
        iconShape: "Triangle"
    }
];