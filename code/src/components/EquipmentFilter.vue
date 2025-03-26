<template>
  <div>
    <div class="section-header" style="margin-top: 24px">
      <div class="section-title">装备</div>
      <div class="section-actions">
        <a-checkbox
          :indeterminate="state.indeterminate"
          v-model:checked="state.checkAll"
          @change="onCheckAllChange"
        >
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
          <a-checkbox
            :value="option.value"
            :checked="state.checkedList.some((item) => item.value === option.value)"
            @change="(e) => handleCheckboxChange(e, option.value)"
          >
            {{ option.label }}
          </a-checkbox>
          <div class="sound-control">
            <a-switch
              v-model:checked="soundEnabledMap[option.value]"
              size="small"
              @change="(val) => updateSound(option.value, val)"
            />
            <span class="sound-status">
              {{ soundEnabledMap[option.value] ? "音效开启" : "音效关闭" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";

interface FilterOption {
  label: string;
  value: string;
}

interface Props {
  options: FilterOption[];
  modelValue: Array<{ value: string; soundEnabled: boolean }>;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const soundEnabledMap = reactive(
  props.options.reduce((acc, option) => {
    acc[option.value] = true;
    return acc;
  }, {} as Record<string, boolean>)
);

const state = reactive({
  indeterminate: false,
  checkAll: false,
  checkedList: [...props.modelValue],
});

const allSoundsEnabled = computed(() => {
  return state.checkedList.every((item) => item.soundEnabled);
});

const updateSound = (value: string, enabled: boolean) => {
  soundEnabledMap[value] = enabled;
  const index = state.checkedList.findIndex((item) => item.value === value);
  if (index !== -1) {
    state.checkedList[index].soundEnabled = enabled;
  }
  emit("update:modelValue", state.checkedList);
};

const handleCheckboxChange = (e: any, value: string) => {
  if (e.target.checked) {
    if (!state.checkedList.some((item) => item.value === value)) {
      state.checkedList.push({
        value,
        soundEnabled: soundEnabledMap[value],
      });
    }
  } else {
    state.checkedList = state.checkedList.filter((item) => item.value !== value);
  }
  updateCheckAllState();
  emit("update:modelValue", state.checkedList);
};

const onCheckAllChange = (e: any) => {
  if (e.target.checked) {
    state.checkedList = props.options.map((option) => ({
      value: option.value,
      soundEnabled: soundEnabledMap[option.value],
    }));
  } else {
    state.checkedList = [];
  }
  updateCheckAllState();
  emit("update:modelValue", state.checkedList);
};

const updateCheckAllState = () => {
  const checkedCount = state.checkedList.length;
  state.checkAll = checkedCount === props.options.length;
  state.indeterminate = checkedCount > 0 && checkedCount < props.options.length;
};

const toggleAllSounds = (enabled: boolean) => {
  state.checkedList.forEach((item) => {
    item.soundEnabled = enabled;
    soundEnabledMap[item.value] = enabled;
  });
  emit("update:modelValue", state.checkedList);
};
</script>
