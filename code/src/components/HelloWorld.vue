<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
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
        <!-- 添加导出按钮 -->
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
        <div>
          <a-checkbox
            v-model:checked="state.checkAll"
            :indeterminate="state.indeterminate"
            @change="onCheckAllChange"
          >
            通货
          </a-checkbox>
        </div>
        <a-divider />
        <a-checkbox-group
          v-model:value="state.checkedList"
          :options="plainOptions"
          :field-names="{ label: 'label', value: 'value' }"
        />

        <!-- 添加预览区域 -->
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
// 修改复选框组的选项配置（移除.map转换）
const plainOptions = [
  { label: "神圣石", value: "Divine Orb" },
  { label: "崇高石", value: "Exalted Orb" },
  { label: "混沌石", value: "Chaos Orb" },
  { label: "墨镜", value: "Mirror of Kalandra" },
  { label: "碎片", value: "Splinter" },
  { label: "手打", value: "Hand of Wisdom and Action" },
];

const state = reactive({
  indeterminate: false,
  checkAll: false,
  checkedList: [] as string[],
});

// 修改后的计算属性
const filterContent = computed(() => {
  if (state.checkedList.length === 0) return "";

  const header = `# 呆橘过滤器生成器生成\n# 生成时间: ${new Date().toLocaleString()}\n\n`;
  const rules = state.checkedList
    .map((itemValue) => {
      const itemLabel =
        plainOptions.find((opt) => opt.value === itemValue)?.label || itemValue;
      return `Show #"通货-${itemLabel}"\n    BaseType "${itemValue}"\n    SetTextColor 255 255 255\n    SetBackgroundColor 50 50 50\n    SetFontSize 42\n`;
    })
    .join("\n");

  return header + rules;
});

// 修改全选功能逻辑
const onCheckAllChange = (e: any) => {
  Object.assign(state, {
    checkedList: e.target.checked ? plainOptions.map((opt) => opt.value) : [], // 获取value数组
    indeterminate: false,
  });
};

watch(
  () => state.checkedList,
  (val) => {
    state.indeterminate = !!val.length && val.length < plainOptions.length;
    state.checkAll = val.length === plainOptions.length;
    console.log("当前选中值:", val);
  }
);

// 导出过滤器功能
const exportFilter = () => {
  if (state.checkedList.length === 0) {
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
}

.site-layout .site-layout-background {
  background: #fff;
}

/* 新增样式 */
.ant-layout-header {
  display: flex;
  align-items: center;
}

.ant-btn {
  margin-left: 10px;
}
</style>
