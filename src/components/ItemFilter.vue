<template>
    <div>
        <div class="section-header" :style="{ marginTop: type === 'equipment' ? '24px' : '0' }">
            <div class="section-title">{{ title }}</div>
            <div class="section-actions">
                <a-checkbox :indeterminate="state.indeterminate" v-model:checked="state.checkAll"
                    @change="onCheckAllChange">
                    全选
                </a-checkbox>
                <a-button size="small" type="link" @click="toggleAllSounds(!allSoundsEnabled)">
                    {{ allSoundsEnabled ? "关闭所有音效" : "开启所有音效" }}
                </a-button>
            </div>
        </div>
        <a-divider />
        <div class="checkbox-grid">
            <div v-for="option in options" :key="option.value" class="checkbox-item">
                <div class="checkbox-wrapper">
                    <a-checkbox :value="option.value"
                        :checked="state.checkedList.some((item) => item.value === option.value)"
                        @change="(e) => handleCheckboxChange(e, option.value)">
                        {{ option.label }}
                    </a-checkbox>
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
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from "vue";

interface FilterOption {
    label: string;
    value: string;
}

interface Props {
    type: 'currency' | 'equipment';
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

.checkbox-item {
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.checkbox-item:hover {
    background-color: rgba(0, 0, 0, 0.02);
}
</style>