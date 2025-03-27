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
        <a-menu-item key="3" @click="joinUs">
          <ApiTwoTone />
          <span>加入我们</span>
        </a-menu-item>
        <a-menu-item key="4" @click="showDonation">
          <CrownTwoTone />
          <span>赞助</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 10px">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <div style="float: right;">
          <a-button type="primary" style="margin-right: 10px" @click="exportFilter">
            <template #icon>
              <DownloadOutlined />
            </template>
            导出过滤器
          </a-button>
          <a-button type="primary" @click="showPreview">
            <template #icon>
              <EyeOutlined />
            </template>
            预览过滤器
          </a-button>
        </div>
      </a-layout-header>
      <a-layout-content :style="{
        margin: '24px 16px',
        padding: '24px',
        background: '#fff',
        minHeight: '800px',
      }">
        <a-collapse v-model:activeKey="activeKeys">
          <a-collapse-panel key="1" header="通货">
            <CurrencyFilterContainer v-model:modelValue="currencyCheckedList" />
          </a-collapse-panel>

          <a-collapse-panel key="2" header="地图">
            <EquipmentFilterContainer v-model:modelValue="equipmentCheckedList" />
          </a-collapse-panel>

          <a-collapse-panel key="3" header="珠宝">
            <JewelFilterContainer v-model:modelValue="jewelCheckedList" />
          </a-collapse-panel>

          <a-collapse-panel key="4" header="药剂">
            <FlaskFilterContainer v-model:modelValue="flaskCheckedList" />
          </a-collapse-panel>

          <a-collapse-panel key="5" header="技能石">
            <SkillGemFilterContainer v-model:modelValue="skillGemCheckedList" />
          </a-collapse-panel>

          <a-collapse-panel key="6" header="传奇装备">
            <UniqueFilterContainer v-model:modelValue="uniqueCheckedList" />
          </a-collapse-panel>

          <a-collapse-panel key="7" header="装备">
            <NormalEquipmentFilterContainer v-model:modelValue="normalEquipmentCheckedList" />
          </a-collapse-panel>
        </a-collapse>

        <a-modal v-model:visible="previewVisible" title="过滤器预览" width="800px" @cancel="hidePreview">
          <a-textarea :value="filterContent" :rows="20" readonly placeholder="生成的过滤器内容将显示在这里..." />
          <template #footer>
            <a-button @click="hidePreview">关闭</a-button>
          </template>
        </a-modal>

        <a-modal v-model:visible="donationVisible" title="赞助支持" width="400px" @cancel="hideDonation">
          <div style="text-align: center; margin-bottom: 20px;">
            <p style="font-size: 16px; color: #666; line-height: 1.8;">
              感谢您对我们的支持！您的每一份赞助都是我们前进的动力。
              我们会继续努力，为大家提供更好的POE过滤器工具。
              您的支持将帮助我们：
            </p>
            <ul style="list-style: none; padding: 0; color: #666; margin-bottom: 20px;">
              <li>✨ 持续优化和更新功能</li>
              <li>🚀 提供更稳定的服务器支持</li>
              <li>💡 开发更多实用的工具</li>
              <li>🌟 创造更好的用户体验</li>
            </ul>
          </div>
          <img src="../assets/home.png" alt="赞助二维码" style="width: 100%; height: auto;" />
          <template #footer>
            <a-button @click="hideDonation">关闭</a-button>
          </template>
        </a-modal>
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
  EyeOutlined,
} from "@ant-design/icons-vue";
import CurrencyFilterContainer from "./filters/CurrencyFilterContainer.vue";
import EquipmentFilterContainer from "./filters/EquipmentFilterContainer.vue";
import JewelFilterContainer from "./filters/JewelFilterContainer.vue";
import FlaskFilterContainer from "./filters/FlaskFilterContainer.vue";
import SkillGemFilterContainer from "./filters/SkillGemFilterContainer.vue";
import UniqueFilterContainer from "./filters/UniqueFilterContainer.vue";
import NormalEquipmentFilterContainer from "./filters/NormalEquipmentFilterContainer.vue";
import { generateFilterContent } from '../utils/filterGenerator';
import '../styles/HelloWorld.css';

const selectedKeys = ref<string[]>(["1"]);
const collapsed = ref<boolean>(false);
const activeKeys = ref<string[]>(["1", "2", "3", "4", "5", "6", "7"]);
const previewVisible = ref<boolean>(false);
const donationVisible = ref<boolean>(false);

const showPreview = () => {
  if (currencyCheckedList.value.length === 0 &&
    equipmentCheckedList.value.length === 0 &&
    jewelCheckedList.value.length === 0 &&
    flaskCheckedList.value.length === 0 &&
    skillGemCheckedList.value.length === 0 &&
    uniqueCheckedList.value.length === 0 &&
    normalEquipmentCheckedList.value.length === 0) {
    message.warning("请至少选择一个过滤项");
    return;
  }
  previewVisible.value = true;
};

const hidePreview = () => {
  previewVisible.value = false;
};

const joinUs = () => {
  window.open('https://kook.vip/8lhssl', '_blank');
};

const showDonation = () => {
  donationVisible.value = true;
};

const hideDonation = () => {
  donationVisible.value = false;
};
const currencyCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const equipmentCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const jewelCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const flaskCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const skillGemCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const uniqueCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);
const normalEquipmentCheckedList = ref<Array<{ value: string; soundEnabled: boolean; color?: string }>>([]);

// 生成过滤器内容
const filterContent = computed(() => {
  return generateFilterContent(
    currencyCheckedList.value,
    equipmentCheckedList.value,
    jewelCheckedList.value,
    flaskCheckedList.value,
    skillGemCheckedList.value,
    uniqueCheckedList.value,
    normalEquipmentCheckedList.value
  );
});

const exportFilter = () => {
  if (currencyCheckedList.value.length === 0 &&
    equipmentCheckedList.value.length === 0 &&
    jewelCheckedList.value.length === 0 &&
    flaskCheckedList.value.length === 0 &&
    skillGemCheckedList.value.length === 0 &&
    uniqueCheckedList.value.length === 0 &&
    normalEquipmentCheckedList.value.length === 0) {
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