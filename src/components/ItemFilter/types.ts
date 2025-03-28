
export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterItem {
    value: string;
    soundEnabled: boolean;
    color?: string;
    bgColor?: string;
}

export type FilterType = 'currency' | 'equipment' | 'jewel' | 'flask' | 'skillgem' | 'unique' | 'normalequipment';

export interface ItemFilterProps {
    type: FilterType;
    title: string;
    options: FilterOption[];
    modelValue: FilterItem[];
}