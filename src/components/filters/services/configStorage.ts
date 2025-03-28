
import type {
    FilterConfig,
    FilterTemplate,
    ConfigHistory,
    ConfigStorageService
} from '../types/config';

const STORAGE_KEYS = {
    CONFIG: 'poe2-filter-config',
    TEMPLATES: 'poe2-filter-templates',
    HISTORY: 'poe2-filter-history'
};

const MAX_HISTORY_SIZE = 10;

export class LocalStorageConfigService implements ConfigStorageService {
    async saveConfig(config: FilterConfig): Promise<void> {
        try {
            // 添加最后修改时间
            const configToSave = {
                ...config,
                lastModified: new Date().toISOString()
            };

            // 保存配置
            localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(configToSave));

            // 添加到历史记录
            await this.addToHistory(configToSave);
        } catch (error) {
            console.error('Failed to save config:', error);
            throw new Error('配置保存失败');
        }
    }

    async loadConfig(): Promise<FilterConfig> {
        try {
            const configStr = localStorage.getItem(STORAGE_KEYS.CONFIG);
            if (!configStr) {
                return this.getDefaultConfig();
            }
            return JSON.parse(configStr);
        } catch (error) {
            console.error('Failed to load config:', error);
            throw new Error('配置加载失败');
        }
    }

    async saveTemplate(template: FilterTemplate): Promise<void> {
        try {
            const templates = await this.loadTemplates();
            const existingIndex = templates.findIndex(t => t.id === template.id);

            if (existingIndex >= 0) {
                templates[existingIndex] = template;
            } else {
                templates.push(template);
            }

            localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
        } catch (error) {
            console.error('Failed to save template:', error);
            throw new Error('模板保存失败');
        }
    }

    async loadTemplates(): Promise<FilterTemplate[]> {
        try {
            const templatesStr = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
            if (!templatesStr) {
                return this.getDefaultTemplates();
            }
            return JSON.parse(templatesStr);
        } catch (error) {
            console.error('Failed to load templates:', error);
            throw new Error('模板加载失败');
        }
    }

    async saveHistory(history: ConfigHistory): Promise<void> {
        try {
            const histories = await this.loadHistory();
            histories.unshift(history);

            // 限制历史记录数量
            if (histories.length > MAX_HISTORY_SIZE) {
                histories.pop();
            }

            localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(histories));
        } catch (error) {
            console.error('Failed to save history:', error);
            throw new Error('历史记录保存失败');
        }
    }

    async loadHistory(): Promise<ConfigHistory[]> {
        try {
            const historyStr = localStorage.getItem(STORAGE_KEYS.HISTORY);
            if (!historyStr) {
                return [];
            }
            return JSON.parse(historyStr);
        } catch (error) {
            console.error('Failed to load history:', error);
            throw new Error('历史记录加载失败');
        }
    }

    private async addToHistory(config: FilterConfig): Promise<void> {
        const history: ConfigHistory = {
            version: config.version,
            timestamp: new Date().toISOString(),
            config: config,
            description: '自动保存'
        };

        await this.saveHistory(history);
    }

    private getDefaultConfig(): FilterConfig {
        return {
            version: '1.0.0',
            filters: {
                currency: {
                    enabled: true,
                    items: []
                },
                equipment: {
                    enabled: true,
                    items: []
                },
                jewel: {
                    enabled: true,
                    items: []
                },
                flask: {
                    enabled: true,
                    items: []
                },
                skillgem: {
                    enabled: true,
                    items: []
                },
                unique: {
                    enabled: true,
                    items: []
                },
                normalequipment: {
                    enabled: true,
                    items: []
                }
            },
            metadata: {
                name: '默认配置',
                description: '新建的过滤器配置',
                author: '系统'
            }
        };
    }

    private getDefaultTemplates(): FilterTemplate[] {
        return [
            {
                id: 'basic',
                name: '基础过滤模板',
                description: '适合新手的基础过滤设置',
                config: {
                    version: '1.0.0',
                    filters: {
                        currency: {
                            enabled: true,
                            items: [
                                { value: 'chaos', soundEnabled: true, color: '#FF7F50' },
                                { value: 'exalted', soundEnabled: true, color: '#FFD700' }
                            ]
                        },
                        equipment: {
                            enabled: true,
                            items: []
                        },
                        jewel: {
                            enabled: true,
                            items: []
                        },
                        flask: {
                            enabled: true,
                            items: []
                        },
                        skillgem: {
                            enabled: true,
                            items: []
                        },
                        unique: {
                            enabled: true,
                            items: []
                        },
                        normalequipment: {
                            enabled: true,
                            items: []
                        }
                    }
                }
            },
            {
                id: 'advanced',
                name: '进阶过滤模板',
                description: '包含更多高级过滤选项',
                config: {
                    version: '1.0.0',
                    filters: {
                        currency: {
                            enabled: true,
                            items: [
                                { value: 'mirror', soundEnabled: true, color: '#FF0000' },
                                { value: 'exalted', soundEnabled: true, color: '#FFD700' },
                                { value: 'chaos', soundEnabled: true, color: '#FF7F50' }
                            ]
                        },
                        equipment: {
                            enabled: true,
                            items: []
                        },
                        jewel: {
                            enabled: true,
                            items: []
                        },
                        flask: {
                            enabled: true,
                            items: []
                        },
                        skillgem: {
                            enabled: true,
                            items: []
                        },
                        unique: {
                            enabled: true,
                            items: []
                        },
                        normalequipment: {
                            enabled: true,
                            items: []
                        }
                    }
                }
            }
        ];
    }
}

// 导出配置存储服务实例
export const configStorageService = new LocalStorageConfigService();