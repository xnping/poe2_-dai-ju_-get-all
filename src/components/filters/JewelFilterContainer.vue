<template>
    <ItemFilter type="jewel" title="珠宝" :options="jewelOptions" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import { jewelOptions } from '../options/JewelOptions';
import ItemFilter from '../ItemFilter.vue';

interface Props {
    modelValue: Array<{ value: string; soundEnabled: boolean; color?: string }>;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>