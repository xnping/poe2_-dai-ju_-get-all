<template>
    <BaseFilterContainer type="unique" :title="filterTitles.unique" :options="uniqueOptions" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import BaseFilterContainer from './BaseFilterContainer.vue';
import { uniqueOptions } from '../options/UniqueOptions';
import { filterTitles } from '../options/filterOptions';
import type { FilterItem } from '../ItemFilter/types';

interface Props {
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>