<template>
    <a-layout-header style="background: #fff; padding: 10px">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapse" />
        <menu-fold-outlined v-else class="trigger" @click="toggleCollapse" />
        <div class="header-actions">
            <a-button type="primary" class="action-button" @click="exportFilter">
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
</template>

<script lang="ts" setup>
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownloadOutlined,
    EyeOutlined,
} from '@ant-design/icons-vue';

const props = defineProps<{
    collapsed: boolean
}>();

const emit = defineEmits<{
    'update:collapsed': [value: boolean]
    'showPreview': []
    'exportFilter': []
}>();

const toggleCollapse = () => {
    emit('update:collapsed', !props.collapsed);
};

const showPreview = () => {
    emit('showPreview');
};

const exportFilter = () => {
    emit('exportFilter');
};
</script>

<style scoped>
.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}

.header-actions {
    float: right;
}

.action-button {
    margin-right: 10px;
}
</style>