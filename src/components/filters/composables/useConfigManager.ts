
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import type {
    FilterConfig,
    FilterTemplate,
    ConfigHistory,
    ConfigValidationResult
} from '../types/config';
import { configStorageService } from '../services/configStorage';

export function useConfigManager() {
    const currentConfig = ref<FilterConfig | null>(null);
    const configHistory = ref<ConfigHistory[]>([]);
    const templates = ref<FilterTemplate[]>([]);
    const isLoading = ref(false);

    // 加载配置
    const loadConfig = async () => {
        try {
            isLoading.value = true;
            currentConfig.value = await configStorageService.loadConfig();
            configHistory.value = await configStorageService.loadHistory();
            templates.value = await configStorageService.loadTemplates();
        } catch (error) {
            message.error('加载配置失败');
            console.error('Load config error:', error);
        } finally {
            isLoading.value = false;
        }
    };

    // 保存配置
    const saveConfig = async (config: FilterConfig) => {
        try {
            await configStorageService.saveConfig(config);
            currentConfig.value = config;
            message.success('配置保存成功');

            // 重新加载历史记录
            configHistory.value = await configStorageService.loadHistory();
        } catch (error) {
            message.error('保存配置失败');
            console.error('Save config error:', error);
        }
    };

    // 导出配置
    const exportConfig = () => {
        if (!currentConfig.value) {
            message.error('没有可导出的配置');
            return;
        }

        try {
            const configStr = JSON.stringify(currentConfig.value, null, 2);
            const blob = new Blob([configStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `poe2-filter-config-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            message.success('配置导出成功');
        } catch (error) {
            message.error('配置导出失败');
            console.error('Export error:', error);
        }
    };

    // 导入配置
    const importConfig = async (configFile: File): Promise<boolean> => {
        try {
            const content = await readFileContent(configFile);
            const config = JSON.parse(content);

            // 验证配置
            const validationResult = validateConfig(config);
            if (!validationResult.isValid) {
                message.error(`配置验证失败: ${validationResult.errors.join(', ')}`);
                return false;
            }

            // 保存配置
            await saveConfig(config);
            return true;
        } catch (error) {
            message.error('配置导入失败');
            console.error('Import error:', error);
            return false;
        }
    };

    // 应用模板
    const applyTemplate = async (templateId: string) => {
        try {
            const template = templates.value.find(t => t.id === templateId);
            if (!template) {
                throw new Error('模板不存在');
            }

            await saveConfig(template.config);
            message.success(`已应用模板：${template.name}`);
        } catch (error) {
            message.error('应用模板失败');
            console.error('Apply template error:', error);
        }
    };

    // 保存为模板
    const saveAsTemplate = async (name: string, description: string) => {
        if (!currentConfig.value) {
            message.error('没有可保存的配置');
            return;
        }

        try {
            const template: FilterTemplate = {
                id: `template-${Date.now()}`,
                name,
                description,
                config: currentConfig.value,
                createDate: new Date().toISOString()
            };

            await configStorageService.saveTemplate(template);
            templates.value = await configStorageService.loadTemplates();
            message.success('保存为模板成功');
        } catch (error) {
            message.error('保存为模板失败');
            console.error('Save template error:', error);
        }
    };

    // 恢复历史版本
    const restoreHistory = async (historyId: string) => {
        try {
            const history = configHistory.value.find(h =>
                h.timestamp === historyId
            );

            if (!history) {
                throw new Error('历史版本不存在');
            }

            await saveConfig(history.config);
            message.success('恢复历史版本成功');
        } catch (error) {
            message.error('恢复历史版本失败');
            console.error('Restore history error:', error);
        }
    };

    // 辅助函数：读取文件内容
    const readFileContent = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    };

    // 辅助函数：验证配置
    const validateConfig = (config: any): ConfigValidationResult => {
        const errors: string[] = [];
        const warnings: string[] = [];

        // 检查基本结构
        if (!config.version) {
            errors.push('缺少版本信息');
        }

        if (!config.filters || typeof config.filters !== 'object') {
            errors.push('缺少过滤器配置或格式错误');
        } else {
            // 检查每个过滤器的结构
            for (const filterType in config.filters) {
                const filter = config.filters[filterType];
                if (!filter.enabled || !Array.isArray(filter.items)) {
                    errors.push(`过滤器 "${filterType}" 格式错误`);
                    continue;
                }

                // 检查过滤器项
                filter.items.forEach((item: any, index: number) => {
                    if (!item.value || typeof item.soundEnabled !== 'boolean') {
                        errors.push(`过滤器 "${filterType}" 中第 ${index + 1} 项格式错误`);
                    }
                });
            }
        }

        // 检查元数据（可选）
        if (config.metadata) {
            if (typeof config.metadata !== 'object') {
                warnings.push('元数据格式错误');
            }
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    };

    // 初始加载
    loadConfig();

    return {
        currentConfig,
        configHistory,
        templates,
        isLoading,
        loadConfig,
        saveConfig,
        exportConfig,
        importConfig,
        applyTemplate,
        saveAsTemplate,
        restoreHistory
    };
}