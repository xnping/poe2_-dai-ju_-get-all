<template>
    <div class="filter-section">
        <SmartFilterContainer v-for="type in filterTypes" :key="type" :type="type" :modelValue="filters[type]"
            @update:modelValue="updateFilter(type, $event)" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SmartFilterContainer from './SmartFilterContainer.vue';
import { filterTitles } from '../options/filterOptions';
import type { FilterType } from '../ItemFilter/types';
import type { FilterItem } from '../ItemFilter/types';

// 获取所有过滤器类型
const filterTypes = Object.keys(filterTitles) as FilterType[];

// 存储所有过滤器的状态
const filters = ref<Record<FilterType, FilterItem[]>>(
    Object.fromEntries(
        filterTypes.map(type => [
            type,
            []
        ])
    ) as Record<FilterType, FilterItem[]>
);

// 更新过滤器状态的方法
const updateFilter = (type: FilterType, value: FilterItem[]) => {
    filters.value[type] = value;
};
</script>

<style scoped>
.filter-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem;
}
</style>