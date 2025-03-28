<template>
    <BaseFilterContainer type="flask" :title="filterTitles.flask" :options="flaskOptions" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import BaseFilterContainer from './BaseFilterContainer.vue';
import { flaskOptions } from '../options/FlaskOptions';
import { filterTitles } from '../options/filterOptions';
import type { FilterItem } from '../ItemFilter/types';

interface Props {
    modelValue: FilterItem[];
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>