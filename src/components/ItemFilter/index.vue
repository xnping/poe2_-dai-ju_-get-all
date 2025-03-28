<template>
    <div class="filter-section">
        <div class="filter-content">
            <FilterHeader :type="type" :title="title" :check-all="state.checkAll" :indeterminate="state.indeterminate"
                :all-sounds-enabled="allSoundsEnabled" @check-all-change="onCheckAllChange"
                @toggle-all-sounds="toggleAllSounds" />

            <div class="filter-divider"></div>

            <FilterGrid :options="options" :checked-list="state.checkedList" @change="handleCheckboxChange" />

            <div class="filter-divider"></div>

            <FilterSettings :checked-list="state.checkedList" :options="options" @update-sound="updateSound"
                @update-color="updateColor" @update-bg-color="updateBgColor" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterHeader from './components/FilterHeader.vue';
import FilterGrid from './components/FilterGrid.vue';
import FilterSettings from './components/FilterSettings.vue';
import { useFilterState } from './composables/useFilterState';
import type { ItemFilterProps } from './types';
import './styles/index.css';

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