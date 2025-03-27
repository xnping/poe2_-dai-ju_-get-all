<template>
    <ItemFilter type="flask" title="药剂" :options="flaskOptions" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import { flaskOptions } from '../options/FlaskOptions';
import ItemFilter from '../ItemFilter.vue';

interface Props {
    modelValue: Array<{ value: string; soundEnabled: boolean; color?: string }>;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>