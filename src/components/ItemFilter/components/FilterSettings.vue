<template>
    <div class="settings-grid">
        <div v-for="item in checkedList" :key="item.value" class="settings-item"
            :class="{ 'active': isActive(item.value) }">
            <div class="option-label">
                <component :is="getOptionIcon(item.value)" />
                {{ getOptionLabel(item.value) }}设置：
            </div>
            <div class="settings-content">
                <div class="sound-control">
                    <a-switch v-model:checked="item.soundEnabled" size="small"
                        @change="handleSoundChange($event, item.value)" />
                    <span class="sound-status">
                        {{ item.soundEnabled ? "音效开启" : "音效关闭" }}
                    </span>
                </div>
                <div class="color-pickers">
                    <div class="color-picker">
                        <span class="color-label">边框/文字颜色：</span>
                        <a-input class="color-input" type="color" :value="item.color || '#ff0000'"
                            @change="(e) => handleColorChange(e, item.value)" />
                    </div>
                    <div class="color-picker">
                        <span class="color-label">背景颜色：</span>
                        <a-input class="color-input" type="color" :value="item.bgColor || '#ffffff'"
                            @change="(e) => handleBgColorChange(e, item.value)" />
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

const props = defineProps<{
    checkedList: FilterItem[];
    options: FilterOption[];
}>();

const emit = defineEmits<{
    (e: 'updateSound', value: string, enabled: boolean): void;
    (e: 'updateColor', value: string, color: string): void;
    (e: 'updateBgColor', value: string, color: string): void;
}>();

// 活动状态管理
const activeItem = ref<string | null>(null);

const getOptionLabel = (value: string) => {
    return props.options.find(option => option.value === value)?.label || value;
};

const isActive = (value: string) => {
    return activeItem.value === value;
};

const handleSoundChange = (enabled: boolean, value: string) => {
    activeItem.value = value;
    emit('updateSound', value, enabled);
    setTimeout(() => {
        if (activeItem.value === value) {
            activeItem.value = null;
        }
    }, 1000);
};

const handleColorChange = (e: Event, value: string) => {
    const color = (e.target as HTMLInputElement).value;
    activeItem.value = value;
    emit('updateColor', value, color);
    setTimeout(() => {
        if (activeItem.value === value) {
            activeItem.value = null;
        }
    }, 1000);
};

const handleBgColorChange = (e: Event, value: string) => {
    const color = (e.target as HTMLInputElement).value;
    activeItem.value = value;
    emit('updateBgColor', value, color);
    setTimeout(() => {
        if (activeItem.value === value) {
            activeItem.value = null;
        }
    }, 1000);
};
</script>