<template>
    <ItemFilter type="skillgem" title="技能石" :options="skillGemOptions" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import { skillGemOptions } from '../options/SkillGemOptions';
import ItemFilter from '../ItemFilter.vue';

interface Props {
    modelValue: Array<{ value: string; soundEnabled: boolean; color?: string }>;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>