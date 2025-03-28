import { computed, reactive, watch } from "vue";

export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterItem {
    value: string;
    soundEnabled: boolean;
    color?: string;
    bgColor?: string;
}

export interface Props {
    type: 'currency' | 'equipment' | 'jewel' | 'flask' | 'skillgem' | 'unique' | 'normalequipment';
    title: string;
    options: FilterOption[];
    modelValue: FilterItem[];
}

export function useItemFilter(props: Props, emit: (event: 'update:modelValue', value: FilterItem[]) => void) {
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
        checkedList: [] as FilterItem[],
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