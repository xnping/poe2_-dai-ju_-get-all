<template>
    <BaseFilterContainer type="equipment" :title="filterTitles.equipment" :options="equipmentOptions"
        :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import BaseFilterContainer from './BaseFilterContainer.vue';
import { equipmentOptions } from '../options/EquipmentOptions';
import { filterTitles } from '../options/filterOptions';
import type { FilterItem } from '../ItemFilter/types';

interface Props {
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>