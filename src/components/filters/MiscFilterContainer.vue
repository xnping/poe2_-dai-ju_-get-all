<template>
    <BaseFilterContainer type="misc" title="杂项" :options="miscOptions" :modelValue="checkedList"
        @update:modelValue="newValue => checkedList = newValue" v-model:soundEnabled="soundEnabled"
        v-model:color="color" v-model:bgColor="bgColor" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import BaseFilterContainer from './BaseFilterContainer.vue';
import { miscOptions } from '../options/MiscOptions';
import type { FilterItem } from '../../components/ItemFilter/types';

const props = defineProps<{
    modelValue: FilterItem[];
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: FilterItem[]): void;
}>();

const checkedList = ref<FilterItem[]>(props.modelValue);
const soundEnabled = ref<boolean>(false);
const color = ref<string>('#FFFFFF');
const bgColor = ref<string>('#000000');

watch(
    () => checkedList.value,
    (newValue) => {
        emit('update:modelValue', newValue);
    },
    { deep: true }
);

watch(
    () => props.modelValue,
    (newValue) => {
        checkedList.value = newValue;
    },
    { deep: true }
);

defineExpose({
    checkedList,
    soundEnabled
});
</script>