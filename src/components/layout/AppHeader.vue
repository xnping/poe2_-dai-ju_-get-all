<template>
    <a-layout-header style="background: #fff; padding: 10px">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapse" />
        <menu-fold-outlined v-else class="trigger" @click="toggleCollapse" />
        <div class="header-actions">
            <a-button-group class="action-group">
                <a-button type="primary" @click="showConfigManager">
                    <template #icon>
                        <SettingOutlined />
                    </template>
                    配置管理1
                </a-button>
                <a-button type="primary" @click="exportFilter">
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
            </a-button-group>
        </div>
    </a-layout-header>
</template>

<script lang="ts" setup>
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownloadOutlined,
    EyeOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue';
import './styles/AppHeader.css';

const props = defineProps<{
    collapsed: boolean
}>();

const emit = defineEmits<{
    'update:collapsed': [value: boolean]
    'showPreview': []
    'exportFilter': []
    'showConfigManager': []
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

const showConfigManager = () => {
    emit('showConfigManager');
};
</script>