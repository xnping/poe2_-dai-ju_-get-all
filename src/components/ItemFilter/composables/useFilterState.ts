
import { reactive, computed, watch } from 'vue';
import type { FilterOption, FilterItem } from '../types';

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

    // 颜色和声音状态映射
    const soundEnabledMap = reactive<Record<string, boolean>>(
        Object.fromEntries(options.map(option => [option.value, true]))
    );

    const colorMap = reactive<Record<string, string>>(
        Object.fromEntries(options.map(option => [option.value, '#ff0000']))
    );

    const bgColorMap = reactive<Record<string, string>>(
        Object.fromEntries(options.map(option => [option.value, '#ffffff']))
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
    const updateColor = (value: string, color: string) => {
        colorMap[value] = color;
        const index = state.checkedList.findIndex((item) => item.value === value);
        if (index !== -1) {
            state.checkedList[index].color = color;
            state.checkedList[index].bgColor = bgColorMap[value];
        }
        emit('update:modelValue', state.checkedList);
    };

    const updateBgColor = (value: string, color: string) => {
        bgColorMap[value] = color;
        const index = state.checkedList.findIndex((item) => item.value === value);
        if (index !== -1) {
            const updatedItem = { ...state.checkedList[index], bgColor: color };
            state.checkedList.splice(index, 1, updatedItem);
        }
        emit('update:modelValue', [...state.checkedList]);
    };

    const updateSound = (value: string, enabled: boolean) => {
        soundEnabledMap[value] = enabled;
        const index = state.checkedList.findIndex((item) => item.value === value);
        if (index !== -1) {
            state.checkedList[index].soundEnabled = enabled;
        }
        emit('update:modelValue', state.checkedList);
    };

    const handleCheckboxChange = (checked: boolean, value: string) => {
        if (checked) {
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
        emit('update:modelValue', state.checkedList);
    };

    const onCheckAllChange = (checked: boolean) => {
        if (checked) {
            state.checkedList = options.map((option) => ({
                value: option.value,
                soundEnabled: soundEnabledMap[option.value],
                color: colorMap[option.value],
                bgColor: bgColorMap[option.value],
            }));
        } else {
            state.checkedList = [];
        }
        updateCheckAllState();
        emit('update:modelValue', state.checkedList);
    };

    const toggleAllSounds = (enabled: boolean) => {
        state.checkedList.forEach((item) => {
            item.soundEnabled = enabled;
            soundEnabledMap[item.value] = enabled;
        });
        emit('update:modelValue', state.checkedList);
    };

    // 监听 modelValue 变化
    watch(() => modelValue, (newValue) => {
        state.checkedList = newValue ? [...newValue] : [];
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