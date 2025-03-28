<template>
    <a-collapse v-model:activeKey="activeKeys">
        <a-collapse-panel key="1">
            <template #header>
                <span class="panel-header">
                    <MoneyCollectOutlined class="panel-icon currency-icon" />
                    通货
                </span>
            </template>
            <CurrencyFilterContainer v-model:modelValue="currencyCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="2">
            <template #header>
                <span class="panel-header">
                    <CompassOutlined class="panel-icon equipment-icon" />
                    地图
                </span>
            </template>
            <EquipmentFilterContainer v-model:modelValue="equipmentCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="3">
            <template #header>
                <span class="panel-header">
                    <StarOutlined class="panel-icon jewel-icon" />
                    珠宝
                </span>
            </template>
            <JewelFilterContainer v-model:modelValue="jewelCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="4">
            <template #header>
                <span class="panel-header">
                    <ExperimentOutlined class="panel-icon flask-icon" />
                    药剂
                </span>
            </template>
            <FlaskFilterContainer v-model:modelValue="flaskCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="5">
            <template #header>
                <span class="panel-header">
                    <ThunderboltOutlined class="panel-icon skill-icon" />
                    技能石
                </span>
            </template>
            <SkillGemFilterContainer v-model:modelValue="skillGemCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="6">
            <template #header>
                <span class="panel-header">
                    <CrownTwoTone class="panel-icon unique-icon" />
                    传奇装备
                </span>
            </template>
            <UniqueFilterContainer v-model:modelValue="uniqueCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="7">
            <template #header>
                <span class="panel-header">
                    <InboxOutlined class="panel-icon normal-icon" />
                    装备
                </span>
            </template>
            <NormalEquipmentFilterContainer v-model:modelValue="normalEquipmentCheckedList" />
        </a-collapse-panel>
    </a-collapse>
</template>

<script lang="ts" setup>
// Vue imports
import { ref, watch } from 'vue';

// Ant Design icons
import {
    MoneyCollectOutlined,
    CompassOutlined,
    StarOutlined,
    ExperimentOutlined,
    ThunderboltOutlined,
    CrownTwoTone,
    InboxOutlined,
} from '@ant-design/icons-vue';

// Component imports
import CurrencyFilterContainer from './CurrencyFilterContainer.vue';
import EquipmentFilterContainer from './EquipmentFilterContainer.vue';
import JewelFilterContainer from './JewelFilterContainer.vue';
import FlaskFilterContainer from './FlaskFilterContainer.vue';
import SkillGemFilterContainer from './SkillGemFilterContainer.vue';
import UniqueFilterContainer from './UniqueFilterContainer.vue';
import NormalEquipmentFilterContainer from './NormalEquipmentFilterContainer.vue';

// Type imports
import type { FilterItem } from '../ItemFilter/types';

// Style import
import './styles/FilterPanels.css';

// Component logic
const activeKeys = ref<string[]>([]);

// Checked lists
const currencyCheckedList = ref<FilterItem[]>([]);
const equipmentCheckedList = ref<FilterItem[]>([]);
const jewelCheckedList = ref<FilterItem[]>([]);
const flaskCheckedList = ref<FilterItem[]>([]);
const skillGemCheckedList = ref<FilterItem[]>([]);
const uniqueCheckedList = ref<FilterItem[]>([]);
const normalEquipmentCheckedList = ref<FilterItem[]>([]);

// Watch for changes
watch(
    [
        currencyCheckedList,
        equipmentCheckedList,
        jewelCheckedList,
        flaskCheckedList,
        skillGemCheckedList,
        uniqueCheckedList,
        normalEquipmentCheckedList
    ],
    () => {
        // Auto-save logic can be added here
    },
    { deep: true }
);

// Expose component interface
defineExpose({
    currencyCheckedList,
    equipmentCheckedList,
    jewelCheckedList,
    flaskCheckedList,
    skillGemCheckedList,
    uniqueCheckedList,
    normalEquipmentCheckedList
});
</script>