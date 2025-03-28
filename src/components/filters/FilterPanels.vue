<template>
    <a-collapse v-model:activeKey="activeKeys">
        <a-collapse-panel key="1">
            <template #header>
                <span class="panel-header">
                    <MoneyCollectOutlined class="panel-icon" />
                    通货
                </span>
            </template>
            <CurrencyFilterContainer v-model:modelValue="currencyCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="2">
            <template #header>
                <span class="panel-header">
                    <CompassOutlined class="panel-icon" />
                    地图
                </span>
            </template>
            <EquipmentFilterContainer v-model:modelValue="equipmentCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="3">
            <template #header>
                <span class="panel-header">
                    <StarOutlined class="panel-icon" />
                    珠宝
                </span>
            </template>
            <JewelFilterContainer v-model:modelValue="jewelCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="4">
            <template #header>
                <span class="panel-header">
                    <ExperimentOutlined class="panel-icon" />
                    药剂
                </span>
            </template>
            <FlaskFilterContainer v-model:modelValue="flaskCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="5">
            <template #header>
                <span class="panel-header">
                    <ThunderboltOutlined class="panel-icon" />
                    技能石
                </span>
            </template>
            <SkillGemFilterContainer v-model:modelValue="skillGemCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="6">
            <template #header>
                <span class="panel-header">
                    <CrownTwoTone class="panel-icon" />
                    传奇装备
                </span>
            </template>
            <UniqueFilterContainer v-model:modelValue="uniqueCheckedList" />
        </a-collapse-panel>

        <a-collapse-panel key="7">
            <template #header>
                <span class="panel-header">
                    <InboxOutlined class="panel-icon" />
                    装备
                </span>
            </template>
            <NormalEquipmentFilterContainer v-model:modelValue="normalEquipmentCheckedList" />
        </a-collapse-panel>
    </a-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
    MoneyCollectOutlined,
    CompassOutlined,
    StarOutlined,
    ExperimentOutlined,
    ThunderboltOutlined,
    CrownTwoTone,
    InboxOutlined,
} from '@ant-design/icons-vue';
import CurrencyFilterContainer from './CurrencyFilterContainer.vue';
import EquipmentFilterContainer from './EquipmentFilterContainer.vue';
import JewelFilterContainer from './JewelFilterContainer.vue';
import FlaskFilterContainer from './FlaskFilterContainer.vue';
import SkillGemFilterContainer from './SkillGemFilterContainer.vue';
import UniqueFilterContainer from './UniqueFilterContainer.vue';
import NormalEquipmentFilterContainer from './NormalEquipmentFilterContainer.vue';

const activeKeys = ref<string[]>(['1', '2', '3', '4', '5', '6', '7']);

const currencyCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const equipmentCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const jewelCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const flaskCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const skillGemCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const uniqueCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const normalEquipmentCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);

defineExpose({
    currencyCheckedList,
    equipmentCheckedList,
    jewelCheckedList,
    flaskCheckedList,
    skillGemCheckedList,
    uniqueCheckedList,
    normalEquipmentCheckedList,
});
</script>

<style scoped>
.panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 500;
}

.panel-icon {
    font-size: 18px;
    color: #1890ff;
}

:deep(.ant-collapse-header) {
    align-items: center !important;
}

:deep(.ant-collapse-arrow) {
    margin-top: 2px !important;
}
</style>