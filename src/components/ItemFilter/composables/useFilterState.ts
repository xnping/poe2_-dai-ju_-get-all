
import { reactive, computed, watch } from 'vue';
import type { FilterOption, FilterItem } from '../types';

// 创建唯一键的函数
function createKey(value: string, label: string): string {
    return `${value}|${label}`;
}

export function useFilterState(
    options: FilterOption[],
    modelValue: FilterItem[],
    emit: (event: 'update:modelValue', value: FilterItem[]) => void
) {
    // 状态管理
    const state = reactive({
        indeterminate: false,
        checkAll: false,
        checkedList: [] as FilterItem[],
    });

    // 颜色和声音状态映射，使用 value|label 作为键
    const soundEnabledMap = reactive<Record<string, boolean>>(
        Object.fromEntries(options.map(option => [createKey(option.value, option.label), true]))
    );

    const colorMap = reactive<Record<string, string>>(
        Object.fromEntries(options.map(option => [createKey(option.value, option.label), '#ff0000']))
    );

    const bgColorMap = reactive<Record<string, string>>(
        Object.fromEntries(options.map(option => [createKey(option.value, option.label), '#ffffff']))
    );

    // 计算属性
    const allSoundsEnabled = computed(() => {
        return state.checkedList.every((item) => item.soundEnabled);
    });

    // 状态更新函数
    const updateCheckAllState = () => {
        const checkedCount = state.checkedList.length;
        state.checkAll = checkedCount === options.length;
        state.indeterminate = checkedCount > 0 && checkedCount < options.length;
    };

    // 更新函数
    const updateColor = (value: string, color: string, label: string) => {
        const key = createKey(value, label);
        colorMap[key] = color;
        const index = state.checkedList.findIndex((item) => item.value === value && item.label === label);
        if (index !== -1) {
            state.checkedList[index].color = color;
            state.checkedList[index].bgColor = bgColorMap[key];
        }
        emit('update:modelValue', state.checkedList);
    };

    const updateBgColor = (value: string, color: string, label: string) => {
        const key = createKey(value, label);
        bgColorMap[key] = color;
        const index = state.checkedList.findIndex((item) => item.value === value && item.label === label);
        if (index !== -1) {
            const updatedItem = { ...state.checkedList[index], bgColor: color };
            state.checkedList.splice(index, 1, updatedItem);
        }
        emit('update:modelValue', [...state.checkedList]);
    };

    const updateSound = (value: string, enabled: boolean, label: string) => {
        const key = createKey(value, label);
        soundEnabledMap[key] = enabled;
        const index = state.checkedList.findIndex((item) => item.value === value && item.label === label);
        if (index !== -1) {
            state.checkedList[index].soundEnabled = enabled;
        }
        emit('update:modelValue', state.checkedList);
    };

    const handleCheckboxChange = (checked: boolean, value: string, label: string) => {
        const key = createKey(value, label);
        if (checked) {
            if (!state.checkedList.some((item) => item.value === value && item.label === label)) {
                state.checkedList.push({
                    value,
                    label,
                    soundEnabled: soundEnabledMap[key],
                    color: colorMap[key],
                    bgColor: bgColorMap[key],
                });
            }
        } else {
            state.checkedList = state.checkedList.filter((item) => !(item.value === value && item.label === label));
        }
        updateCheckAllState();
        emit('update:modelValue', state.checkedList);
    };

    const onCheckAllChange = (checked: boolean) => {
        if (checked) {
            state.checkedList = options.map((option) => {
                const key = createKey(option.value, option.label);
                return {
                    value: option.value,
                    label: option.label,
                    soundEnabled: soundEnabledMap[key],
                    color: colorMap[key],
                    bgColor: bgColorMap[key],
                };
            });
        } else {
            state.checkedList = [];
        }
        updateCheckAllState();
        emit('update:modelValue', state.checkedList);
    };

    const toggleAllSounds = (enabled: boolean) => {
        state.checkedList.forEach((item) => {
            const key = createKey(item.value, item.label);
            item.soundEnabled = enabled;
            soundEnabledMap[key] = enabled;
        });
        emit('update:modelValue', state.checkedList);
    };

    // 监听 modelValue 变化
    watch(() => modelValue, (newValue) => {
        state.checkedList = newValue ? [...newValue] : [];
        if (newValue) {
            newValue.forEach(item => {
                const key = createKey(item.value, item.label);
                if (item.color) {
                    colorMap[key] = item.color;
                }
                if (item.bgColor) {
                    bgColorMap[key] = item.bgColor;
                }
            });
        }
        updateCheckAllState();
    }, { immediate: true, deep: true });

    return {
        state,
        soundEnabledMap,
        colorMap,
        bgColorMap,
        allSoundsEnabled,
        updateColor,
        updateBgColor,
        updateSound,
        handleCheckboxChange,
        onCheckAllChange,
        toggleAllSounds,
    };
}