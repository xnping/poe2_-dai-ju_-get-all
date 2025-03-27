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
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <a-button type="primary" style="float: right; margin-right: 20px" @click="exportFilter">
          <template #icon>
            <DownloadOutlined />
          </template>
          导出过滤器
        </a-button>
      </a-layout-header>
      <a-layout-content :style="{
        margin: '24px 16px',
        padding: '24px',
        background: '#fff',
        minHeight: '800px',
      }">
        <CurrencyFilterContainer v-model:modelValue="currencyCheckedList" />

        <EquipmentFilterContainer v-model:modelValue="equipmentCheckedList" />

        <a-divider>过滤器预览</a-divider>
        <a-textarea :value="filterContent" :rows="20" readonly placeholder="生成的过滤器内容将显示在这里..." />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { message } from "ant-design-vue";
import {
  PlusSquareTwoTone,
  VideoCameraTwoTone,
  ApiTwoTone,
  CrownTwoTone,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import CurrencyFilterContainer from "./filters/CurrencyFilterContainer.vue";
import EquipmentFilterContainer from "./filters/EquipmentFilterContainer.vue";
import { currencyOptions } from './options/CurrencyOptions';
import { equipmentOptions } from './options/EquipmentOptions';

const selectedKeys = ref<string[]>(["1"]);
const collapsed = ref<boolean>(false);
const currencyCheckedList = ref<Array<{ value: string; soundEnabled: boolean }>>([]);
const equipmentCheckedList = ref<Array<{ value: string; soundEnabled: boolean }>>([]);

// 生成过滤器内容
const filterContent = computed(() => {
  if (currencyCheckedList.value.length === 0 && equipmentCheckedList.value.length === 0)
    return "";

  const header = `# POE过滤器生成器\n# 生成时间: ${new Date().toLocaleString()}\n\n`;

  // 通货具体选项规则
  const currencyRules = currencyCheckedList.value
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
  const equipmentRules = equipmentCheckedList.value
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
  if (currencyCheckedList.value.length === 0 && equipmentCheckedList.value.length === 0) {
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

.checkbox-grid::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #f0f0f0;
}

.checkbox-grid {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  padding: 8px;
}

.checkbox-item {
  min-width: 150px;
  max-width: 150px;
  flex: 1;
}

.checkbox-wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 8px;
  height: 100%;
}

.sound-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.sound-status {
  font-size: 12px;
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

.ant-checkbox-wrapper>span:last-child {
  padding-right: 4px;
}

/* 悬停效果 */
.checkbox-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}
</style>