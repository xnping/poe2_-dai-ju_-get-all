<template>
    <div class="filter-section">
        <SmartFilterContainer v-for="type in filterTypes" :key="type" :type="type" :modelValue="filters[type]"
            @update:modelValue="updateFilter(type, $event)" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SmartFilterContainer from './SmartFilterContainer.vue';
import { filterOptions } from '../options/filterOptions';

// 获取所有过滤器类型
const filterTypes = Object.keys(filterOptions) as Array<keyof typeof filterOptions>;

// 存储所有过滤器的状态
const filters = ref<Record<string, Array<{ value: string; soundEnabled: boolean; color?: string }>>>(
    Object.fromEntries(
        filterTypes.map(type => [
            type,
            []
        ])
    )
);

// 更新过滤器状态的方法
const updateFilter = (type: string, value: Array<{ value: string; soundEnabled: boolean; color?: string }>) => {
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