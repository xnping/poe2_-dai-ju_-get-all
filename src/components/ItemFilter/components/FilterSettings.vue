<template>
    <div class="settings-grid">
        <div v-for="item in checkedList" :key="item.value" class="settings-item">
            <div class="option-label">{{ getOptionLabel(item.value) }}设置：</div>
            <div class="settings-content">
                <div class="sound-control">
                    <a-switch v-model:checked="item.soundEnabled" size="small"
                        @change="(val) => $emit('updateSound', item.value, val)" />
                    <span class="sound-status">
                        {{ item.soundEnabled ? "音效开启" : "音效关闭" }}
                    </span>
                </div>
                <div class="color-pickers">
                    <div class="color-picker">
                        <span class="color-label">边框/文字颜色：</span>
                        <a-input type="color" :value="item.color || '#ff0000'"
                            @change="(e) => $emit('updateColor', item.value, e.target.value)"
                            style="width: 60px; height: 24px; padding: 0;" />
                    </div>
                    <div class="color-picker">
                        <span class="color-label">背景颜色：</span>
                        <a-input type="color" :value="item.bgColor || '#ffffff'"
                            @change="(e) => $emit('updateBgColor', item.value, e.target.value)"
                            style="width: 60px; height: 24px; padding: 0;" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { FilterItem, FilterOption } from '../types';

const props = defineProps<{
    checkedList: FilterItem[];
    options: FilterOption[];
}>();

defineEmits<{
    (e: 'updateSound', value: string, enabled: boolean): void;
    (e: 'updateColor', value: string, color: string): void;
    (e: 'updateBgColor', value: string, color: string): void;
}>();

const getOptionLabel = (value: string) => {
    return props.options.find(option => option.value === value)?.label || value;
};
</script>

<style scoped>
.settings-grid {
    margin-top: 20px;
    display: grid;
    gap: 16px;
    padding: 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.settings-item {
    padding: 12px;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    background: #fafafa;
}

.option-label {
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
}

.settings-content {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
}

.sound-control {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 120px;
}

.sound-status {
    font-size: 12px;
    color: #666;
}

.color-pickers {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.color-picker {
    display: flex;
    align-items: center;
    gap: 8px;
}

.color-label {
    font-size: 12px;
    color: #666;
    min-width: 80px;
}
</style>