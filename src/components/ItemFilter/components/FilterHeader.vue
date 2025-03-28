<template>
    <div class="section-header">
        <div class="section-title">
            <span class="title-text">
                <component :is="getTypeIcon(type)" class="title-icon" />
                {{ title }}
            </span>
        </div>
        <div class="section-actions">
            <a-checkbox class="select-all" :indeterminate="indeterminate" :checked="checkAll"
                @change="(e) => $emit('checkAllChange', e.target.checked)">
                <span class="select-all-content">
                    <CheckOutlined class="select-all-icon" />
                    全选
                </span>
            </a-checkbox>
            <a-button class="sound-toggle-btn" size="small" :type="allSoundsEnabled ? 'primary' : 'default'"
                @click="$emit('toggleAllSounds', !allSoundsEnabled)">
                <template #icon>
                    <SoundOutlined v-if="allSoundsEnabled" />
                    <StopOutlined v-else />
                </template>
                {{ allSoundsEnabled ? "关闭所有音效" : "开启所有音效" }}
            </a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CheckOutlined, SoundOutlined, StopOutlined } from "@ant-design/icons-vue";
import { getTypeIcon } from '../utils/iconMapping';
import type { FilterType } from '../types';

defineProps<{
    type: FilterType;
    title: string;
    checkAll: boolean;
    indeterminate: boolean;
    allSoundsEnabled: boolean;
}>();

defineEmits<{
    (e: 'checkAllChange', checked: boolean): void;
    (e: 'toggleAllSounds', enabled: boolean): void;
}>();
</script>

<style scoped>
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: #fafafa;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid #f0f0f0;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 16px;
}

.title-text {
    font-size: 16px;
    font-weight: 600;
    color: #1f1f1f;
    display: flex;
    align-items: center;
    gap: 8px;
}

.title-icon {
    font-size: 20px;
    color: #1890ff;
}

.section-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.select-all {
    margin: 0;
}

.select-all-content {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #1890ff;
    font-weight: 500;
}

.select-all-icon {
    font-size: 14px;
}

.sound-toggle-btn {
    display: flex;
    align-items: center;
    gap: 4px;
}

:deep(.ant-checkbox-wrapper:hover) {
    .select-all-content {
        opacity: 0.8;
    }
}

:deep(.ant-checkbox-checked + span .select-all-content) {
    color: #1890ff;
}

:deep(.ant-checkbox-indeterminate + span .select-all-content) {
    color: #1890ff;
    opacity: 0.8;
}
</style>