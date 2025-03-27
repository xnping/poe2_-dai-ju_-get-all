<template>
    <ItemFilter type="currency" title="通货" :options="currencyOptions" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import { currencyOptions } from '../options/CurrencyOptions';
import ItemFilter from '../ItemFilter.vue';

interface Props {
    modelValue: Array<{ value: string; soundEnabled: boolean }>;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>