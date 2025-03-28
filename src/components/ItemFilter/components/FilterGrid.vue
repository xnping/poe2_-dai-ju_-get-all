<template>
    <div class="checkbox-grid">
        <div v-for="option in options" :key="`${option.value}-${option.label}`" class="checkbox-item" :class="{
            'checked': isChecked(option.value, option.label),
            'loading': isLoading(option.value, option.label),
            'disabled': isDisabled(option.value)
        }">
            <a-checkbox :value="option.value" :checked="isChecked(option.value, option.label)"
                :disabled="isDisabled(option.value)" @change="handleChange($event, option)">
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
    (e: 'change', checked: boolean, value: string, label: string): void;
}>();

// 加载状态管理
const loadingItems = ref<Set<string>>(new Set());

const createKey = (value: string, label: string) => `${value}-${label}`;

const isChecked = (value: string, label: string) => {
    return !!props.checkedList.find(item => item.value === value && item.label === label);
};

const isLoading = (value: string, label: string) => {
    return loadingItems.value.has(createKey(value, label));
};

const isDisabled = (value: string) => {
    // 这里可以添加禁用逻辑，例如基于某些条件禁用特定选项
    return false;
};

const handleChange = async (e: Event, option: FilterOption) => {
    const checked = (e.target as HTMLInputElement).checked;
    const key = createKey(option.value, option.label);

    // 模拟异步操作的加载状态
    loadingItems.value.add(key);

    try {
        emit('change', checked, option.value, option.label);
    } finally {
        // 延迟移除加载状态，以展示动画效果
        setTimeout(() => {
            loadingItems.value.delete(key);
        }, 300);
    }
};
</script>