<template>
    <BaseFilterContainer type="currency" :title="filterTitles.currency" :options="filterOptions.currency"
        :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import BaseFilterContainer from './BaseFilterContainer.vue';
import { filterOptions, filterTitles } from '../options/filterOptions';
import type { FilterItem } from '../ItemFilter/types';

interface Props {
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>