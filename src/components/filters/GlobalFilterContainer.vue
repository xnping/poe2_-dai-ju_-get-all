<template>
    <BaseFilterContainer type="global" title="全局设置" :options="globalOptions" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import BaseFilterContainer from './BaseFilterContainer.vue';
import { globalOptions } from '../options/GlobalOptions';
import type { FilterItem } from '../ItemFilter/types';

interface Props {
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>