<template>
    <div class="filter-config-manager">
        <!-- 主要操作按钮组 -->
        <div class="config-actions">
            <a-space>
                <a-button-group>
                    <a-button type="primary" @click="exportConfig">
                        <template #icon>
                            <ExportOutlined />
                        </template>
                        导出配置
                    </a-button>
                    <a-button type="primary" @click="showImportModal">
                        <template #icon>
                            <ImportOutlined />
                        </template>
                        导入配置
                    </a-button>
                </a-button-group>
                <a-button-group>
                    <a-button @click="showTemplatesModal">
                        <template #icon>
                            <AppstoreOutlined />
                        </template>
                        预设模板
                    </a-button>
                    <a-button @click="showSaveTemplateModal">
                        <template #icon>
                            <SaveOutlined />
                        </template>
                        保存为模板
                    </a-button>
                </a-button-group>
                <a-button @click="showHistoryModal">
                    <template #icon>
                        <HistoryOutlined />
                    </template>
                    历史记录
                </a-button>
            </a-space>
        </div>

        <!-- 导入配置对话框 -->
        <a-modal v-model:visible="importModalVisible" title="导入配置" @ok="handleImport" :confirmLoading="isImporting">
            <a-upload-dragger v-model:fileList="fileList" :beforeUpload="handleBeforeUpload" :showUploadList="false">
                <p class="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p class="ant-upload-text">点击或拖拽配置文件到此区域</p>
                <p class="ant-upload-hint">支持.json格式的配置文件</p>
            </a-upload-dragger>
            <div v-if="importContent" class="preview-content">
                <p>配置预览：</p>
                <a-textarea v-model:value="importContent" :rows="4" readonly />
            </div>
        </a-modal>

        <!-- 预设模板对话框 -->
        <a-modal v-model:visible="templatesModalVisible" title="预设模板" :footer="null" width="700px">
            <a-list :data-source="templates" class="template-list">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <a-list-item-meta>
                            <template #title>
                                <div class="template-title">
                                    {{ item.name }}
                                    <a-tag v-if="item.createDate" color="blue">
                                        {{ formatDate(item.createDate) }}
                                    </a-tag>
                                </div>
                            </template>
                            <template #description>
                                <div class="template-description">{{ item.description }}</div>
                            </template>
                        </a-list-item-meta>
                        <a-button type="primary" @click="handleApplyTemplate(item.id)">
                            应用模板
                        </a-button>
                    </a-list-item>
                </template>
            </a-list>
        </a-modal>

        <!-- 保存为模板对话框 -->
        <a-modal v-model:visible="saveTemplateModalVisible" title="保存为模板" @ok="handleSaveTemplate"
            :confirmLoading="isSavingTemplate">
            <a-form :model="templateForm" layout="vertical">
                <a-form-item label="模板名称" required>
                    <a-input v-model:value="templateForm.name" placeholder="请输入模板名称" />
                </a-form-item>
                <a-form-item label="模板描述">
                    <a-textarea v-model:value="templateForm.description" placeholder="请输入模板描述" :rows="3" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- 历史记录对话框 -->
        <a-modal v-model:visible="historyModalVisible" title="历史记录" :footer="null" width="700px">
            <a-timeline>
                <a-timeline-item v-for="history in configHistory" :key="history.timestamp"
                    :color="getHistoryItemColor(history)">
                    <template #dot>
                        <ClockCircleOutlined v-if="isCurrentVersion(history)" />
                    </template>
                    <div class="history-item">
                        <div class="history-info">
                            <span class="history-time">{{ formatDate(history.timestamp) }}</span>
                            <a-tag color="blue">v{{ history.version }}</a-tag>
                            <span class="history-description">{{ history.description || '配置更新' }}</span>
                        </div>
                        <a-button type="link" @click="handleRestoreHistory(history.timestamp)"
                            :disabled="isCurrentVersion(history)">
                            恢复此版本
                        </a-button>
                    </div>
                </a-timeline-item>
            </a-timeline>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import {
    ExportOutlined,
    ImportOutlined,
    AppstoreOutlined,
    SaveOutlined,
    HistoryOutlined,
    InboxOutlined,
    ClockCircleOutlined
} from '@ant-design/icons-vue';
import { useConfigManager } from './composables/useConfigManager';
import type { FilterTemplate, ConfigHistory } from './types/config';
import './styles/FilterConfigManager.css';

// 状态管理
const {
    currentConfig,
    configHistory,
    templates,
    isLoading,
    exportConfig,
    importConfig,
    applyTemplate,
    saveAsTemplate,
    restoreHistory
} = useConfigManager();

// 模态框状态
const importModalVisible = ref(false);
const templatesModalVisible = ref(false);
const saveTemplateModalVisible = ref(false);
const historyModalVisible = ref(false);

// 导入相关状态
const importContent = ref('');
const fileList = ref([]);
const isImporting = ref(false);

// 模板表单状态
const templateForm = ref({
    name: '',
    description: ''
});
const isSavingTemplate = ref(false);

// 导入配置处理
const showImportModal = () => {
    importModalVisible.value = true;
    importContent.value = '';
    fileList.value = [];
};

const handleBeforeUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const content = e.target?.result as string;
            importContent.value = content;
        } catch (error) {
            message.error('文件读取失败');
        }
    };
    reader.readAsText(file);
    return false;
};

const handleImport = async () => {
    if (!importContent.value) {
        message.error('请先选择配置文件');
        return;
    }

    try {
        isImporting.value = true;
        const file = new File([importContent.value], 'config.json', { type: 'application/json' });
        const success = await importConfig(file);
        if (success) {
            importModalVisible.value = false;
        }
    } finally {
        isImporting.value = false;
    }
};

// 模板相关处理
const showTemplatesModal = () => {
    templatesModalVisible.value = true;
};

const showSaveTemplateModal = () => {
    templateForm.value = {
        name: '',
        description: ''
    };
    saveTemplateModalVisible.value = true;
};

const handleApplyTemplate = async (templateId: string) => {
    await applyTemplate(templateId);
    templatesModalVisible.value = false;
};

const handleSaveTemplate = async () => {
    if (!templateForm.value.name) {
        message.error('请输入模板名称');
        return;
    }

    try {
        isSavingTemplate.value = true;
        await saveAsTemplate(
            templateForm.value.name,
            templateForm.value.description
        );
        saveTemplateModalVisible.value = false;
    } finally {
        isSavingTemplate.value = false;
    }
};

// 历史记录相关处理
const showHistoryModal = () => {
    historyModalVisible.value = true;
};

const handleRestoreHistory = async (timestamp: string) => {
    await restoreHistory(timestamp);
    historyModalVisible.value = false;
};

const isCurrentVersion = (history: ConfigHistory) => {
    return currentConfig.value?.lastModified === history.timestamp;
};

const getHistoryItemColor = (history: ConfigHistory) => {
    return isCurrentVersion(history) ? 'blue' : 'gray';
};

// 工具函数
const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>