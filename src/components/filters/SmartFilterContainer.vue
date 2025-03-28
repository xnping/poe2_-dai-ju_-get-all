<template>
    <ItemFilter :type="type" :title="filterTitles[type]" :options="filterOptions[type]" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import ItemFilter from '../ItemFilter/index.vue';
import { filterTitles } from '../options/filterOptions';
import { currencyOptions } from '../options/CurrencyOptions';
import { equipmentOptions } from '../options/EquipmentOptions';
import { jewelOptions } from '../options/JewelOptions';
import { flaskOptions } from '../options/FlaskOptions';
import { skillGemOptions } from '../options/SkillGemOptions';
import { uniqueOptions } from '../options/UniqueOptions';
import type { FilterType, FilterItem } from '../ItemFilter/types';

interface Props {
    type: FilterType;
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits<{
    (e: 'update:modelValue', value: FilterItem[]): void;
}>();

const filterOptions = {
    currency: currencyOptions,
    equipment: equipmentOptions,
    jewel: jewelOptions,
    flask: flaskOptions,
    skillgem: skillGemOptions,
    unique: uniqueOptions,
    normalequipment: equipmentOptions
} as const;
</script>