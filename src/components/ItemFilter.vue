<template>
    <div class="filter-section">
        <div class="section-header">
            <div class="section-title">
                <span class="title-text">
                    <component :is="getIcon(type)" class="title-icon" />
                    {{ title }}
                </span>
            </div>
            <div class="section-actions">
                <a-checkbox class="select-all" :indeterminate="state.indeterminate" v-model:checked="state.checkAll"
                    @change="onCheckAllChange">
                    <span class="select-all-content">
                        <CheckOutlined class="select-all-icon" />
                        全选
                    </span>
                </a-checkbox>
                <a-button class="sound-toggle-btn" size="small" :type="allSoundsEnabled ? 'primary' : 'default'"
                    @click="toggleAllSounds(!allSoundsEnabled)">
                    <template #icon>
                        <SoundOutlined v-if="allSoundsEnabled" />
                        <StopOutlined v-else />
                    </template>
                    {{ allSoundsEnabled ? "关闭所有音效" : "开启所有音效" }}
                </a-button>
            </div>
        </div>
        <div class="filter-container">
            <div class="checkbox-grid">
                <div v-for="option in options" :key="option.value" class="checkbox-item">
                    <a-checkbox :value="option.value"
                        :checked="state.checkedList.some((item) => item.value === option.value)"
                        @change="(e) => handleCheckboxChange(e, option.value)">
                        <span class="checkbox-content">
                            <component :is="getOptionIcon(option.value)" class="option-icon" />
                            {{ option.label }}
                        </span>
                    </a-checkbox>
                </div>
            </div>
            <div class="settings-grid">
                <div v-for="option in options" :key="option.value" class="settings-item"
                    v-show="state.checkedList.some((item) => item.value === option.value)">
                    <div class="option-label">{{ option.label }}设置：</div>
                    <div class="settings-content">
                        <div class="sound-control">
                            <a-switch v-model:checked="soundEnabledMap[option.value]" size="small"
                                @change="(val) => updateSound(option.value, val)" />
                            <span class="sound-status">
                                {{ soundEnabledMap[option.value] ? "音效开启" : "音效关闭" }}
                            </span>
                        </div>
                        <div class="color-pickers">
                            <div class="color-picker">
                                <span class="color-label">边框/文字颜色：</span>
                                <a-input type="color" :value="colorMap[option.value] || '#ff0000'"
                                    @change="(e) => updateColor(option.value, e.target.value)"
                                    style="width: 60px; height: 24px; padding: 0;" />
                            </div>
                            <div class="color-picker">
                                <span class="color-label">背景颜色：</span>
                                <a-input type="color" :value="bgColorMap[option.value] || '#ffffff'"
                                    @change="(e) => updateBgColor(option.value, e.target.value)"
                                    style="width: 60px; height: 24px; padding: 0;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from "vue";
import {
    MoneyCollectOutlined,
    CompassOutlined,
    StarOutlined,
    ExperimentOutlined,
    ThunderboltOutlined,
    CrownOutlined,
    InboxOutlined,
    AppstoreOutlined,
    CheckOutlined,
    SoundOutlined,
    StopOutlined,
} from "@ant-design/icons-vue";

const getIcon = (type: string) => {
    switch (type) {
        case 'currency':
            return MoneyCollectOutlined;
        case 'equipment':
            return CompassOutlined;
        case 'jewel':
            return StarOutlined;
        case 'flask':
            return ExperimentOutlined;
        case 'skillgem':
            return ThunderboltOutlined;
        case 'unique':
            return CrownOutlined;
        case 'normalequipment':
            return InboxOutlined;
        default:
            return AppstoreOutlined;
    }
};

const getOptionIcon = (value: string) => {
    // 根据选项值返回对应的图标组件
    switch (true) {
        // 通货相关
        case /chaos|exalted|divine|mirror/i.test(value):
            return MoneyCollectOutlined;
        // 地图相关
        case /map|atlas/i.test(value):
            return CompassOutlined;
        // 珠宝相关
        case /jewel|abyss/i.test(value):
            return StarOutlined;
        // 药剂相关
        case /flask|potion/i.test(value):
            return ExperimentOutlined;
        // 技能石相关
        case /gem|skill/i.test(value):
            return ThunderboltOutlined;
        // 传奇装备相关
        case /unique|rare/i.test(value):
            return CrownOutlined;
        // 普通装备相关
        case /armor|weapon|shield/i.test(value):
            return InboxOutlined;
        default:
            return AppstoreOutlined;
    }
};

interface FilterOption {
    label: string;
    value: string;
}

interface Props {
    type: 'currency' | 'equipment' | 'jewel' | 'flask' | 'skillgem' | 'unique' | 'normalequipment';
    title: string;
    options: FilterOption[];
    modelValue: Array<{ value: string; soundEnabled: boolean; color?: string; bgColor?: string }>;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const soundEnabledMap = reactive(
    props.options.reduce((acc, option) => {
        acc[option.value] = true;
        return acc;
    }, {} as Record<string, boolean>)
);

const colorMap = reactive(
    props.options.reduce((acc, option) => {
        acc[option.value] = '#ff0000';  // 设置默认颜色为红色
        return acc;
    }, {} as Record<string, string>)
);

const bgColorMap = reactive(
    props.options.reduce((acc, option) => {
        acc[option.value] = '#ffffff';  // 设置默认背景色为白色
        return acc;
    }, {} as Record<string, string>)
);

const state = reactive({
    indeterminate: false,
    checkAll: false,
    checkedList: [],
});

// 状态管理函数
const updateCheckAllState = () => {
    const checkedCount = state.checkedList.length;
    state.checkAll = checkedCount === props.options.length;
    state.indeterminate = checkedCount > 0 && checkedCount < props.options.length;
};

const allSoundsEnabled = computed(() => {
    return state.checkedList.every((item) => item.soundEnabled);
});

const updateColor = (value: string, color: string) => {
    colorMap[value] = color;
    const index = state.checkedList.findIndex((item) => item.value === value);
    if (index !== -1) {
        state.checkedList[index].color = color;
        state.checkedList[index].bgColor = bgColorMap[value];  // 确保背景色也被包含
    }
    emit("update:modelValue", state.checkedList);
};

const updateBgColor = (value: string, color: string) => {
    bgColorMap[value] = color;
    const index = state.checkedList.findIndex((item) => item.value === value);
    if (index !== -1) {
        const updatedItem = { ...state.checkedList[index], bgColor: color };
        state.checkedList.splice(index, 1, updatedItem);
    }
    emit("update:modelValue", [...state.checkedList]);
};

const updateSound = (value: string, enabled: boolean) => {
    soundEnabledMap[value] = enabled;
    const index = state.checkedList.findIndex((item) => item.value === value);
    if (index !== -1) {
        state.checkedList[index].soundEnabled = enabled;
    }
    emit("update:modelValue", state.checkedList);
};

const handleCheckboxChange = (e: { target: { checked: boolean } }, value: string) => {
    if (e.target.checked) {
        if (!state.checkedList.some((item) => item.value === value)) {
            state.checkedList.push({
                value,
                soundEnabled: soundEnabledMap[value],
                color: colorMap[value],
                bgColor: bgColorMap[value],
            });
        }
    } else {
        state.checkedList = state.checkedList.filter((item) => item.value !== value);
    }
    updateCheckAllState();
    emit("update:modelValue", state.checkedList);
};

const onCheckAllChange = (e: { target: { checked: boolean } }) => {
    if (e.target.checked) {
        state.checkedList = props.options.map((option) => ({
            value: option.value,
            soundEnabled: soundEnabledMap[option.value],
            color: colorMap[option.value],
            bgColor: bgColorMap[option.value],
        }));
    } else {
        state.checkedList = [];
    }
    updateCheckAllState();
    emit("update:modelValue", state.checkedList);
};

const toggleAllSounds = (enabled: boolean) => {
    state.checkedList.forEach((item) => {
        item.soundEnabled = enabled;
        soundEnabledMap[item.value] = enabled;
    });
    emit("update:modelValue", state.checkedList);
};

// 初始化和监听 modelValue 的变化
watch(() => props.modelValue, (newValue) => {
    state.checkedList = newValue ? [...newValue] : [];
    // 更新颜色映射
    if (newValue) {
        newValue.forEach(item => {
            if (item.color) {
                colorMap[item.value] = item.color;
            }
            if (item.bgColor) {
                bgColorMap[item.value] = item.bgColor;
            }
        });
    }
    updateCheckAllState();
}, { immediate: true, deep: true });
</script>

<style scoped>
.filter-section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin-bottom: 24px;
}

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

.checkbox-content {
    display: flex;
    align-items: center;
    gap: 6px;
}

.option-icon {
    font-size: 14px;
    color: #1890ff;
}

:deep(.anticon) {
    display: flex;
    align-items: center;
    justify-content: center;
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

:deep(.ant-btn-primary) {
    background: #1890ff;
    border-color: #1890ff;
}

:deep(.ant-btn-primary:hover) {
    background: #40a9ff;
    border-color: #40a9ff;
}

.checkbox-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.color-pickers {
    display: flex;
    flex-direction: column;
    gap: 8px;
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

.checkbox-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
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

.checkbox-item .ant-checkbox-wrapper {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 13px;
}

.checkbox-item .ant-checkbox-checked+span {
    color: #1890ff;
    font-weight: 500;
}

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
}

.sound-control {
    display: flex;
    align-items: center;
    gap: 8px;
}

.sound-status {
    font-size: 12px;
    color: #666;
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