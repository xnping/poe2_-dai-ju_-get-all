<template>
  <a-layout>
    <!-- 侧边栏布局 -->
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <!-- 侧边栏logo -->
      <div class="logo" />
      <!-- 侧边栏菜单 -->
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <!-- 菜单项：过滤器 -->
        <a-menu-item key="1">
          <PlusSquareTwoTone />
          <span>过滤器</span>
        </a-menu-item>
        <!-- 菜单项：视频教程 -->
        <a-menu-item key="2">
          <VideoCameraTwoTone />
          <span>视频教程</span>
        </a-menu-item>
        <!-- 菜单项：加入我们 -->
        <a-menu-item key="3">
          <ApiTwoTone />
          <span>加入我们</span>
        </a-menu-item>
        <a-menu-item key="3">
          <CrownTwoTone />
          <span>赞助</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 主布局 -->
    <a-layout>
      <!-- 头部布局 -->
      <a-layout-header style="background: #fff; padding: 0">
        <!-- 折叠按钮：展开 -->
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <!-- 折叠按钮：折叠 -->
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <!-- 内容布局 -->
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  CheckOutlined,
  PlusSquareTwoTone,
  VideoCameraTwoTone,
  ApiTwoTone,
  CrownTwoTone,
} from "@ant-design/icons-vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
// 定义选中的菜单项
const selectedKeys = ref<string[]>(["1"]);
// 定义侧边栏是否折叠
const collapsed = ref<boolean>(false);
</script>
<style>
/* 折叠按钮样式 */
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

/* 侧边栏logo样式 */
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

/* 内容布局背景样式 */
.site-layout .site-layout-background {
  background: #fff;
}
</style>
