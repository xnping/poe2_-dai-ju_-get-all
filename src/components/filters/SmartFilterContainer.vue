<template>
    <ItemFilter :type="type" :title="filterTitles[type]" :options="filterOptions[type]" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import ItemFilter from '../ItemFilter.vue';
import { filterOptions, filterTitles } from '../options/filterOptions';

interface Props {
    type: keyof typeof filterOptions;
    modelValue: Array<{ value: string; soundEnabled: boolean; color?: string }>;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>