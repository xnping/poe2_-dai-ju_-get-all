<template>
    <div class="filter-section">
        <FilterHeader :type="type" :title="title" :check-all="state.checkAll" :indeterminate="state.indeterminate"
            :all-sounds-enabled="allSoundsEnabled" @check-all-change="onCheckAllChange"
            @toggle-all-sounds="toggleAllSounds" />

        <FilterGrid :options="options" :checked-list="state.checkedList" @change="handleCheckboxChange" />

        <FilterSettings :checked-list="state.checkedList" :options="options" @update-sound="updateSound"
            @update-color="updateColor" @update-bg-color="updateBgColor" />
    </div>
</template>

<script lang="ts" setup>
import FilterHeader from './components/FilterHeader.vue';
import FilterGrid from './components/FilterGrid.vue';
import FilterSettings from './components/FilterSettings.vue';
import { useFilterState } from './composables/useFilterState';
import type { ItemFilterProps } from './types';

const props = defineProps<ItemFilterProps>();
const emit = defineEmits(['update:modelValue']);

const {
    state,
    allSoundsEnabled,
    updateColor,
    updateBgColor,
    updateSound,
    handleCheckboxChange,
    onCheckAllChange,
    toggleAllSounds,
} = useFilterState(props.options, props.modelValue, emit);
</script>

<style scoped>
.filter-section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin-bottom: 24px;
}
</style>