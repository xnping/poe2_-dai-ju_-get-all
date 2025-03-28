<template>
    <div class="checkbox-grid">
        <div v-for="option in options" :key="option.value" class="checkbox-item" :class="{
            'checked': isChecked(option.value),
            'loading': isLoading(option.value),
            'disabled': isDisabled(option.value)
        }">
            <a-checkbox :value="option.value" :checked="isChecked(option.value)" :disabled="isDisabled(option.value)"
                @change="handleChange($event, option.value)">
                <span class="checkbox-content">
                    <component :is="getOptionIcon(option.value)" class="option-icon" />
                    {{ option.label }}
                </span>
            </a-checkbox>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getOptionIcon } from '../utils/iconMapping';
import type { FilterOption, FilterItem } from '../types';
import '../styles/FilterGrid.css';

const props = defineProps<{
    options: FilterOption[];
    checkedList: FilterItem[];
}>();

const emit = defineEmits<{
    (e: 'change', checked: boolean, value: string): void;
}>();

// 加载状态管理
const loadingItems = ref<Set<string>>(new Set());

const isChecked = (value: string) => {
    return !!props.checkedList.find(item => item.value === value);
};

const isLoading = (value: string) => {
    return loadingItems.value.has(value);
};

const isDisabled = (value: string) => {
    // 这里可以添加禁用逻辑，例如基于某些条件禁用特定选项
    return false;
};

const handleChange = async (e: Event, value: string) => {
    const checked = (e.target as HTMLInputElement).checked;

    // 模拟异步操作的加载状态
    loadingItems.value.add(value);

    try {
        emit('change', checked, value);
    } finally {
        // 延迟移除加载状态，以展示动画效果
        setTimeout(() => {
            loadingItems.value.delete(value);
        }, 300);
    }
};
</script>