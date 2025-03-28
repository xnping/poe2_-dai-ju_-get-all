
import {
    MoneyCollectOutlined,
    CompassOutlined,
    StarOutlined,
    ExperimentOutlined,
    ThunderboltOutlined,
    CrownOutlined,
    InboxOutlined,
    AppstoreOutlined,
} from "@ant-design/icons-vue";
import type { FilterType } from '../types';

export const getTypeIcon = (type: FilterType) => {
    const iconMap: Record<FilterType, any> = {
        currency: MoneyCollectOutlined,
        equipment: CompassOutlined,
        jewel: StarOutlined,
        flask: ExperimentOutlined,
        skillgem: ThunderboltOutlined,
        unique: CrownOutlined,
        normalequipment: InboxOutlined,
    };

    return iconMap[type] || AppstoreOutlined;
};

export const getOptionIcon = (value: string) => {
    const patterns = {
        currency: /chaos|exalted|divine|mirror/i,
        map: /map|atlas/i,
        jewel: /jewel|abyss/i,
        flask: /flask|potion/i,
        skillGem: /gem|skill/i,
        unique: /unique|rare/i,
        equipment: /armor|weapon|shield/i,
    };

    const iconMap = {
        currency: MoneyCollectOutlined,
        map: CompassOutlined,
        jewel: StarOutlined,
        flask: ExperimentOutlined,
        skillGem: ThunderboltOutlined,
        unique: CrownOutlined,
        equipment: InboxOutlined,
    };

    for (const [key, pattern] of Object.entries(patterns)) {
        if (pattern.test(value)) {
            return iconMap[key as keyof typeof iconMap];
        }
    }

    return AppstoreOutlined;
};