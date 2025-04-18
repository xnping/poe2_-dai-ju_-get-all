<template>
    <div class="settings-grid">
        <div v-for="item in checkedList" :key="`${item.value}-${item.label}`" class="settings-item"
            :class="{ 'active': isActive(item.value, item.label) }">
            <div class="option-label">
                <component :is="getOptionIcon(item.value)" />
                {{ item.label }}设置：
            </div>
            <div class="settings-content">
                <div class="sound-control">
                    <a-switch v-model:checked="item.soundEnabled" size="small"
                        @change="handleSoundChange($event, item.value, item.label)" />
                    <span class="sound-status">
                        {{ item.soundEnabled ? "音效开启" : "音效关闭" }}
                    </span>
                </div>
                <div class="color-pickers">
                    <div class="color-picker">
                        <span class="color-label">边框/文字颜色：</span>
                        <a-input class="color-input" type="color" :value="item.color || '#ff0000'"
                            @change="(e: Event) => handleColorChange(e, item.value, item.label)" />
                    </div>
                    <div class="color-picker">
                        <span class="color-label">背景颜色：</span>
                        <a-input class="color-input" type="color" :value="item.bgColor || '#ffffff'"
                            @change="(e: Event) => handleBgColorChange(e, item.value, item.label)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { FilterItem, FilterOption } from '../types';
import { getOptionIcon } from '../utils/iconMapping';
import '../styles/FilterSettings.css';

defineProps<{
    checkedList: FilterItem[];
    options: FilterOption[];
}>();

const emit = defineEmits<{
    (e: 'updateSound', value: string, enabled: boolean, label: string): void;
    (e: 'updateColor', value: string, color: string, label: string): void;
    (e: 'updateBgColor', value: string, color: string, label: string): void;
}>();

// 活动状态管理
const activeItem = ref<{ value: string; label: string } | null>(null);

const isActive = (value: string, label: string) => {
    return activeItem.value?.value === value && activeItem.value?.label === label;
};

const handleSoundChange = (enabled: boolean, value: string, label: string) => {
    activeItem.value = { value, label };
    emit('updateSound', value, enabled, label);
    setTimeout(() => {
        if (activeItem.value?.value === value && activeItem.value?.label === label) {
            activeItem.value = null;
        }
    }, 1000);
};

const handleColorChange = (e: Event, value: string, label: string) => {
    const color = (e.target as HTMLInputElement).value;
    activeItem.value = { value, label };
    emit('updateColor', value, color, label);
    setTimeout(() => {
        if (activeItem.value?.value === value && activeItem.value?.label === label) {
            activeItem.value = null;
        }
    }, 1000);
};

const handleBgColorChange = (e: Event, value: string, label: string) => {
    const color = (e.target as HTMLInputElement).value;
    activeItem.value = { value, label };
    emit('updateBgColor', value, color, label);
    setTimeout(() => {
        if (activeItem.value?.value === value && activeItem.value?.label === label) {
            activeItem.value = null;
        }
    }, 1000);
};
</script>