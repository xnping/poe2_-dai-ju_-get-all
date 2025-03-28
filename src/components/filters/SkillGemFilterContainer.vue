<template>
    <BaseFilterContainer type="skillgem" :title="filterTitles.skillgem" :options="skillGemOptions"
        :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import BaseFilterContainer from './BaseFilterContainer.vue';
import { skillGemOptions } from '../options/SkillGemOptions';
import { filterTitles } from '../options/filterOptions';
import type { FilterItem } from '../ItemFilter/types';

interface Props {
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>