
import type { FilterItem } from '../../ItemFilter/types';

// 过滤器配置接口
export interface FilterConfig {
    version: string;
    lastModified?: string;
    filters: {
        [key: string]: {
            enabled: boolean;
            items: FilterItem[];
        };
    };
    metadata?: {
        name?: string;
        description?: string;
        author?: string;
        tags?: string[];
    };
}

// 预设模板接口
export interface FilterTemplate {
    id: string;
    name: string;
    description: string;
    config: FilterConfig;
    tags?: string[];
    author?: string;
    createDate?: string;
}

// 配置历史记录接口
export interface ConfigHistory {
    version: string;
    timestamp: string;
    config: FilterConfig;
    description?: string;
}

// 配置管理器状态接口
export interface ConfigManagerState {
    currentConfig: FilterConfig;
    history: ConfigHistory[];
    templates: FilterTemplate[];
}

// 配置迁移接口
export interface ConfigMigration {
    fromVersion: string;
    toVersion: string;
    migrate: (config: FilterConfig) => FilterConfig;
}

// 配置验证结果接口
export interface ConfigValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

// 配置存储服务接口
export interface ConfigStorageService {
    saveConfig(config: FilterConfig): Promise<void>;
    loadConfig(): Promise<FilterConfig>;
    saveTemplate(template: FilterTemplate): Promise<void>;
    loadTemplates(): Promise<FilterTemplate[]>;
    saveHistory(history: ConfigHistory): Promise<void>;
    loadHistory(): Promise<ConfigHistory[]>;
}

// 导出所有类型
export type {
    FilterConfig,
    FilterTemplate,
    ConfigHistory,
    ConfigManagerState,
    ConfigMigration,
    ConfigValidationResult,
    ConfigStorageService
};