<template>
    <div class="checkbox-grid">
        <div v-for="option in options" :key="option.value" class="checkbox-item">
            <a-checkbox :value="option.value" :checked="isChecked(option.value)"
                @change="(e) => $emit('change', e.target.checked, option.value)">
                <span class="checkbox-content">
                    <component :is="getOptionIcon(option.value)" class="option-icon" />
                    {{ option.label }}
                </span>
            </a-checkbox>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getOptionIcon } from '../utils/iconMapping';
import type { FilterOption, FilterItem } from '../types';

const props = defineProps<{
    options: FilterOption[];
    checkedList: FilterItem[];
}>();

defineEmits<{
    (e: 'change', checked: boolean, value: string): void;
}>();

const isChecked = (value: string) => {
    return !!props.checkedList.find(item => item.value === value);
};
</script>

<style scoped>
.checkbox-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    padding: 16px;
    background: #fafafa;
    border-radius: 8px;
}

.checkbox-item {
    position: relative;
    padding: 8px 12px;
    border-radius: 6px;
    background: white;
    transition: all 0.3s ease;
    border: 1px solid #f0f0f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    min-width: 0;
    cursor: pointer;
}

.checkbox-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #1890ff;
}

.checkbox-content {
    display: flex;
    align-items: center;
    gap: 6px;
}

.option-icon {
    font-size: 14px;
    color: #1890ff;
}

:deep(.ant-checkbox-wrapper) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 13px;
}

:deep(.ant-checkbox-checked + span) {
    color: #1890ff;
    font-weight: 500;
}

/* 自定义 checkbox 样式 */
:deep(.ant-checkbox-wrapper:hover .ant-checkbox-inner),
:deep(.ant-checkbox:hover .ant-checkbox-inner) {
    border-color: #1890ff;
}

:deep(.ant-checkbox-checked .ant-checkbox-inner) {
    background-color: #1890ff;
    border-color: #1890ff;
}

:deep(.ant-checkbox-checked::after) {
    border-color: #1890ff;
}
</style>