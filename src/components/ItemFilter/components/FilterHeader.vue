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
                @change="(e: Event) => $emit('checkAllChange', (e.target as HTMLInputElement).checked)">
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
import '../styles/FilterHeader.css';

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