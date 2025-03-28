<template>
    <ItemFilter :type="type" :title="title" :options="options" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import ItemFilter from '../ItemFilter/index.vue';
import type { FilterType, FilterOption, FilterItem } from '../ItemFilter/types';

interface Props {
    type: FilterType;
    title: string;
    options: FilterOption[];
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>