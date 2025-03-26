<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">POE过滤器</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <PlusSquareTwoTone />
          <span>过滤器</span>
        </a-menu-item>
        <a-menu-item key="2">
          <VideoCameraTwoTone />
          <span>视频教程</span>
        </a-menu-item>
        <a-menu-item key="3">
          <ApiTwoTone />
          <span>加入我们</span>
        </a-menu-item>
        <a-menu-item key="4">
          <CrownTwoTone />
          <span>赞助</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 10px">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <a-button
          type="primary"
          style="float: right; margin-right: 20px"
          @click="exportFilter"
        >
          <template #icon><DownloadOutlined /></template>
          导出过滤器
        </a-button>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '800px',
        }"
      >
        <!-- 通货部分 -->
        <div class="section-header">
          <div class="section-title">通货</div>
          <div class="section-actions">
            <a-checkbox
              :indeterminate="currencyState.indeterminate"
              v-model:checked="currencyState.checkAll"
              @change="onCurrencyCheckAllChange"
            >
              全选
            </a-checkbox>
            <a-button
              size="small"
              type="link"
              @click="toggleAllCurrencySounds(!allCurrencySoundsEnabled)"
            >
              {{ allCurrencySoundsEnabled ? "关闭所有音效" : "开启所有音效" }}
            </a-button>
          </div>
        </div>
        <a-divider />
        <div class="checkbox-grid">
          <div
            v-for="option in currencyOptions"
            :key="option.value"
            class="checkbox-item"
          >
            <div class="checkbox-wrapper">
              <a-checkbox
                :value="option.value"
                :checked="
                  currencyState.checkedList.some((item) => item.value === option.value)
                "
                @change="(e) => handleCurrencyCheckboxChange(e, option.value)"
              >
                {{ option.label }}
              </a-checkbox>
              <div class="sound-control">
                <a-switch
                  v-model:checked="currencySoundEnabledMap[option.value]"
                  size="small"
                  @change="(val) => updateCurrencySound(option.value, val)"
                />
                <span class="sound-status">
                  {{ currencySoundEnabledMap[option.value] ? "音效开启" : "音效关闭" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 装备部分 -->
        <div class="section-header" style="margin-top: 24px">
          <div class="section-title">装备</div>
          <div class="section-actions">
            <a-checkbox
              :indeterminate="equipmentState.indeterminate"
              v-model:checked="equipmentState.checkAll"
              @change="onEquipmentCheckAllChange"
            >
              全选
            </a-checkbox>
            <a-button
              size="small"
              type="link"
              @click="toggleAllEquipmentSounds(!allEquipmentSoundsEnabled)"
            >
              {{ allEquipmentSoundsEnabled ? "关闭所有音效" : "开启所有音效" }}
            </a-button>
          </div>
        </div>
        <a-divider />
        <div class="checkbox-grid">
          <div
            v-for="option in equipmentOptions"
            :key="option.value"
            class="checkbox-item"
          >
            <div class="checkbox-wrapper">
              <a-checkbox
                :value="option.value"
                :checked="
                  equipmentState.checkedList.some((item) => item.value === option.value)
                "
                @change="(e) => handleEquipmentCheckboxChange(e, option.value)"
              >
                {{ option.label }}
              </a-checkbox>
              <div class="sound-control">
                <a-switch
                  v-model:checked="equipmentSoundEnabledMap[option.value]"
                  size="small"
                  @change="(val) => updateEquipmentSound(option.value, val)"
                />
                <span class="sound-status">
                  {{ equipmentSoundEnabledMap[option.value] ? "音效开启" : "音效关闭" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <a-divider>过滤器预览</a-divider>
        <a-textarea
          v-model:value="filterContent"
          :rows="20"
          readonly
          placeholder="生成的过滤器内容将显示在这里..."
        />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import {
  PlusSquareTwoTone,
  VideoCameraTwoTone,
  ApiTwoTone,
  CrownTwoTone,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const selectedKeys = ref<string[]>(["1"]);
const collapsed = ref<boolean>(false);

// 通货相关配置
const currencyOptions = [
  { label: "神圣石", value: "Divine Orb" },
  { label: "崇高石", value: "Exalted Orb" },
  { label: "混沌石", value: "Chaos Orb" },
  { label: "镜子", value: "Mirror of Kalandra" },
  { label: "碎片", value: "Splinter" },
  { label: "手工艺品", value: "Crafting Item" },
  { label: "地图", value: "Map" },
  { label: "命运卡", value: "Divination Card" },
  { label: "精髓", value: "Essence" },
  { label: "化石", value: "Fossil" },
  { label: "催化剂", value: "Catalyst" },
  { label: "油", value: "Oil" },
];

const currencySoundEnabledMap = reactive(
  currencyOptions.reduce((acc, option) => {
    acc[option.value] = true;
    return acc;
  }, {} as Record<string, boolean>)
);

const currencyState = reactive({
  indeterminate: false,
  checkAll: false,
  checkedList: [] as Array<{ value: string; soundEnabled: boolean }>,
});

// 装备相关配置
const equipmentOptions = [
  { label: "六连装备", value: "Six-Link" },
  { label: "传奇装备", value: "Unique" },
  { label: "高物品等级", value: "High iLvl" },
  { label: "高抗性", value: "High Resistance" },
  { label: "高生命", value: "High Life" },
  { label: "高伤害", value: "High Damage" },
  { label: "高护甲", value: "High Armor" },
  { label: "高闪避", value: "High Evasion" },
  { label: "高能量护盾", value: "High ES" },
  { label: "高属性", value: "High Attribute" },
  { label: "高移动速度", value: "High Movement" },
  { label: "高暴击", value: "High Crit" },
];

const equipmentSoundEnabledMap = reactive(
  equipmentOptions.reduce((acc, option) => {
    acc[option.value] = true;
    return acc;
  }, {} as Record<string, boolean>)
);

const equipmentState = reactive({
  indeterminate: false,
  checkAll: false,
  checkedList: [] as Array<{ value: string; soundEnabled: boolean }>,
});

// 计算是否所有通货音效都开启
const allCurrencySoundsEnabled = computed(() => {
  return currencyState.checkedList.every((item) => item.soundEnabled);
});

// 计算是否所有装备音效都开启
const allEquipmentSoundsEnabled = computed(() => {
  return equipmentState.checkedList.every((item) => item.soundEnabled);
});

// 更新通货音效状态
const updateCurrencySound = (value: string, enabled: boolean) => {
  currencySoundEnabledMap[value] = enabled;
  const index = currencyState.checkedList.findIndex((item) => item.value === value);
  if (index !== -1) {
    currencyState.checkedList[index].soundEnabled = enabled;
  }
};

// 更新装备音效状态
const updateEquipmentSound = (value: string, enabled: boolean) => {
  equipmentSoundEnabledMap[value] = enabled;
  const index = equipmentState.checkedList.findIndex((item) => item.value === value);
  if (index !== -1) {
    equipmentState.checkedList[index].soundEnabled = enabled;
  }
};

// 通货复选框变化处理
const handleCurrencyCheckboxChange = (e: any, value: string) => {
  if (e.target.checked) {
    if (!currencyState.checkedList.some((item) => item.value === value)) {
      currencyState.checkedList.push({
        value,
        soundEnabled: currencySoundEnabledMap[value],
      });
    }
  } else {
    currencyState.checkedList = currencyState.checkedList.filter(
      (item) => item.value !== value
    );
  }
  updateCurrencyCheckAllState();
};

// 装备复选框变化处理
const handleEquipmentCheckboxChange = (e: any, value: string) => {
  if (e.target.checked) {
    if (!equipmentState.checkedList.some((item) => item.value === value)) {
      equipmentState.checkedList.push({
        value,
        soundEnabled: equipmentSoundEnabledMap[value],
      });
    }
  } else {
    equipmentState.checkedList = equipmentState.checkedList.filter(
      (item) => item.value !== value
    );
  }
  updateEquipmentCheckAllState();
};

// 通货全选变化
const onCurrencyCheckAllChange = (e: any) => {
  if (e.target.checked) {
    currencyState.checkedList = currencyOptions.map((option) => ({
      value: option.value,
      soundEnabled: currencySoundEnabledMap[option.value],
    }));
  } else {
    currencyState.checkedList = [];
  }
  updateCurrencyCheckAllState();
};

// 装备全选变化
const onEquipmentCheckAllChange = (e: any) => {
  if (e.target.checked) {
    equipmentState.checkedList = equipmentOptions.map((option) => ({
      value: option.value,
      soundEnabled: equipmentSoundEnabledMap[option.value],
    }));
  } else {
    equipmentState.checkedList = [];
  }
  updateEquipmentCheckAllState();
};

// 更新通货全选状态
const updateCurrencyCheckAllState = () => {
  const checkedCount = currencyState.checkedList.length;
  currencyState.checkAll = checkedCount === currencyOptions.length;
  currencyState.indeterminate = checkedCount > 0 && checkedCount < currencyOptions.length;
};

// 更新装备全选状态
const updateEquipmentCheckAllState = () => {
  const checkedCount = equipmentState.checkedList.length;
  equipmentState.checkAll = checkedCount === equipmentOptions.length;
  equipmentState.indeterminate =
    checkedCount > 0 && checkedCount < equipmentOptions.length;
};

// 切换所有通货音效
const toggleAllCurrencySounds = (enabled: boolean) => {
  currencyState.checkedList.forEach((item) => {
    item.soundEnabled = enabled;
    currencySoundEnabledMap[item.value] = enabled;
  });
};

// 切换所有装备音效
const toggleAllEquipmentSounds = (enabled: boolean) => {
  equipmentState.checkedList.forEach((item) => {
    item.soundEnabled = enabled;
    equipmentSoundEnabledMap[item.value] = enabled;
  });
};

// 生成过滤器内容
const filterContent = computed(() => {
  if (currencyState.checkedList.length === 0 && equipmentState.checkedList.length === 0)
    return "";

  const header = `# POE过滤器生成器\n# 生成时间: ${new Date().toLocaleString()}\n\n`;

  // 通货具体选项规则
  const currencyRules = currencyState.checkedList
    .map((item) => {
      const option = currencyOptions.find((opt) => opt.value === item.value);
      const itemLabel = option?.label || item.value;

      const soundSetting = item.soundEnabled
        ? `  CustomAlertSound "音效\\${itemLabel}.mp3"`
        : "  DisableDropSound True\n  DisableAlertSound True";

      return `Show #"通货-${itemLabel}"\n  class "Stackable Currency"\n  BaseType "${item.value}"\n  SetTextColor 255 255 255\n  SetBackgroundColor 50 50 50\n  SetBorderColor 255 0 0\n  SetFontSize 60\n${soundSetting}\n  MinimapIcon 0 Red Circle\n  PlayEffect Red`;
    })
    .join("\n\n");

  // 装备具体选项规则
  const equipmentRules = equipmentState.checkedList
    .map((item) => {
      const option = equipmentOptions.find((opt) => opt.value === item.value);
      const itemLabel = option?.label || item.value;

      const soundSetting = item.soundEnabled
        ? `  CustomAlertSound "音效\\${itemLabel}.mp3"`
        : "  DisableDropSound True\n  DisableAlertSound True";

      return `Show #"装备-${itemLabel}"\n  class "Equipment"\n  BaseType "${item.value}"\n  SetTextColor 255 255 255\n  SetBackgroundColor 50 50 50\n  SetBorderColor 0 255 0\n  SetFontSize 60\n${soundSetting}\n  MinimapIcon 0 Green Circle\n  PlayEffect Green`;
    })
    .join("\n\n");

  return (
    header +
    currencyRules +
    (currencyRules && equipmentRules ? "\n" : "") +
    equipmentRules
  );
});

const exportFilter = () => {
  if (currencyState.checkedList.length === 0 && equipmentState.checkedList.length === 0) {
    message.warning("请至少选择一个过滤项");
    return;
  }

  const blob = new Blob([filterContent.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `POE_Filter_${new Date().getTime()}.filter`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  message.success("过滤器导出成功");
};
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 52px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.site-layout .site-layout-background {
  background: #fff;
}

.ant-layout-header {
  display: flex;
  align-items: center;
}

.ant-btn {
  margin-left: 10px;
}

.checkbox-item {
  margin-bottom: 8px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.sound-control {
  display: flex;
  align-items: center;
  margin-left: 8px;
  gap: 4px;
}

.sound-status {
  font-size: 12px;
  width: 60px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #1890ff;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
}

.ant-divider {
  margin: 12px 0;
}

.ant-textarea {
  font-family: monospace;
  font-size: 14px;
}

.ant-checkbox-wrapper {
  margin-right: 0;
  white-space: nowrap;
}

.ant-checkbox-wrapper > span:last-child {
  padding-right: 4px;
}
</style>
