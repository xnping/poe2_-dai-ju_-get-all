<template>
    <div class="filter-section">
        <div class="filter-content">
            <FilterHeader :type="type" :title="title" :check-all="state.checkAll" :indeterminate="state.indeterminate"
                :all-sounds-enabled="allSoundsEnabled" @check-all-change="onCheckAllChange"
                @toggle-all-sounds="toggleAllSounds" />

            <div class="filter-divider"></div>

            <FilterGrid :options="options" :checked-list="state.checkedList" @change="handleCheckboxChange" />

            <div class="filter-divider"></div>

            <FilterSettings :checked-list="state.checkedList" :options="options" :type="type"
                @update-sound="(value, enabled, label) => updateSound(value, enabled, label)"
                @update-color="(value, color, label) => updateColor(value, color, label)"
                @update-bg-color="(value, color, label) => updateBgColor(value, color, label)"
                @export-single="handleExportSingle" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterHeader from './components/FilterHeader.vue';
import FilterGrid from './components/FilterGrid.vue';
import FilterSettings from './components/FilterSettings.vue';
import { useFilterState } from './composables/useFilterState';
import type { ItemFilterProps, FilterItem } from './types';
import { generateSingleItemFilter } from '../../utils/filterGenerator';
import { message } from 'ant-design-vue';
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

// 处理单个物品的导出
const handleExportSingle = (item: FilterItem) => {
    try {
        // 生成过滤器规则
        const filterContent = generateSingleItemFilter(item, props.type);

        // 创建 Blob 对象
        const blob = new Blob([filterContent], { type: 'text/plain' });

        // 创建下载链接
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${item.label}_filter.filter`; // 使用物品标签作为文件名

        // 触发下载
        document.body.appendChild(link);
        link.click();

        // 清理
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        message.success(`已导出 ${item.label} 的过滤器规则`);
    } catch (error) {
        message.error(`导出失败: ${error.message}`);
    }
};
</script>