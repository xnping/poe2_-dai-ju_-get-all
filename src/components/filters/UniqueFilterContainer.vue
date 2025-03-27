<template>
    <ItemFilter type="unique" title="传奇装备" :options="uniqueOptions" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import { uniqueOptions } from '../options/UniqueOptions';
import ItemFilter from '../ItemFilter.vue';

interface Props {
    modelValue: Array<{ value: string; soundEnabled: boolean; color?: string }>;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>