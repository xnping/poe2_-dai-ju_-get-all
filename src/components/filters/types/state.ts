
import type { FilterItem } from '../../ItemFilter/types';

export interface FilterState {
    currencyCheckedList: FilterItem[];
    equipmentCheckedList: FilterItem[];
    jewelCheckedList: FilterItem[];
    flaskCheckedList: FilterItem[];
    skillGemCheckedList: FilterItem[];
    uniqueCheckedList: FilterItem[];
    normalEquipmentCheckedList: FilterItem[];
}