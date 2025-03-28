<template>
    <BaseFilterContainer type="currency" :title="filterTitles.currency" :options="currencyOptions"
        :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import BaseFilterContainer from './BaseFilterContainer.vue';
import { filterTitles } from '../options/filterOptions';
import { currencyOptions } from '../options/CurrencyOptions';
import type { FilterItem } from '../ItemFilter/types';

interface Props {
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>