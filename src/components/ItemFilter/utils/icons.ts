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

export const getIcon = (type: string) => {
    switch (type) {
        case 'currency':
            return MoneyCollectOutlined;
        case 'equipment':
            return CompassOutlined;
        case 'jewel':
            return StarOutlined;
        case 'flask':
            return ExperimentOutlined;
        case 'skillgem':
            return ThunderboltOutlined;
        case 'unique':
            return CrownOutlined;
        case 'normalequipment':
            return InboxOutlined;
        default:
            return AppstoreOutlined;
    }
};

export const getOptionIcon = (value: string) => {
    switch (true) {
        case /chaos|exalted|divine|mirror/i.test(value):
            return MoneyCollectOutlined;
        case /map|atlas/i.test(value):
            return CompassOutlined;
        case /jewel|abyss/i.test(value):
            return StarOutlined;
        case /flask|potion/i.test(value):
            return ExperimentOutlined;
        case /gem|skill/i.test(value):
            return ThunderboltOutlined;
        case /unique|rare/i.test(value):
            return CrownOutlined;
        case /armor|weapon|shield/i.test(value):
            return InboxOutlined;
        default:
            return AppstoreOutlined;
    }
};