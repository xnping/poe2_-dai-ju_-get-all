<template>
    <div class="checkbox-grid">
        <div v-for="option in options" :key="`${option.value}-${option.label}`" class="checkbox-item" :class="{
            'checked': isChecked(option.value, option.label),
            'loading': isLoading(option.value, option.label),
            'disabled': isDisabled(option.value)
        }" @click="handleItemClick(option)">
            <a-checkbox :value="option.value" :checked="isChecked(option.value, option.label)"
                :disabled="isDisabled(option.value)" @change="handleChange($event, option)">
                <div class="checkbox-content">
                    <span class="checkbox-label" :title="option.label">{{ option.label }}</span>
                </div>
            </a-checkbox>
            <div v-if="isLoading(option.value, option.label)" class="loading-overlay">
                <div class="loading-spinner"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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
    return false; // 可以根据需要添加禁用逻辑
};

const handleChange = async (e: Event, option: FilterOption) => {
    e.stopPropagation(); // 防止事件冒泡
    const checked = (e.target as HTMLInputElement).checked;
    await toggleOption(option, checked);
};

const handleItemClick = async (option: FilterOption) => {
    const currentChecked = isChecked(option.value, option.label);
    await toggleOption(option, !currentChecked);
};

const toggleOption = async (option: FilterOption, checked: boolean) => {
    const key = createKey(option.value, option.label);

    if (loadingItems.value.has(key)) {
        return; // 如果正在加载中，则不处理
    }

    loadingItems.value.add(key);

    try {
        emit('change', checked, option.value, option.label);
    } finally {
        // 添加一个小延迟以展示加载动画
        setTimeout(() => {
            loadingItems.value.delete(key);
        }, 300);
    }
};
</script>

<style scoped>
.checkbox-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
}

.loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #1890ff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

[data-theme="dark"] .loading-overlay {
    background: rgba(0, 0, 0, 0.4);
}
</style>