<template>
    <ItemFilter :type="type" :title="filterTitles[type]" :options="filterOptions[type]" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import ItemFilter from '../ItemFilter/index.vue';
import { FilterOptions, filterTitles } from '../options/filterOptions';
import type { FilterType, FilterItem } from '../ItemFilter/types';

interface Props {
    type: FilterType;
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits<{
    (e: 'update:modelValue', value: FilterItem[]): void;
}>();
</script>