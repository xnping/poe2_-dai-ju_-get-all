<template>
    <ItemFilter type="equipment" title="装备" :options="equipmentOptions" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import { equipmentOptions } from '../options/EquipmentOptions';
import ItemFilter from '../ItemFilter.vue';

interface Props {
    modelValue: Array<{ value: string; soundEnabled: boolean; color?: string }>;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>