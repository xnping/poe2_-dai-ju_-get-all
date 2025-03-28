<template>
    <a-layout class="main-layout">
        <AppSider :collapsed="collapsed" @update:collapsed="collapsed = $event" @showDonation="showDonation" />
        <a-layout>
            <AppHeader :collapsed="collapsed" @update:collapsed="collapsed = $event" @showPreview="showPreview"
                @exportFilter="exportFilter" @showConfigManager="showConfigManager" />
            <a-layout-content class="main-content">
                <FilterPanels ref="filterPanelsRef" />

                <PreviewModal :visible="previewVisible" :content="filterContent"
                    @update:visible="previewVisible = $event" />

                <DonationModal :visible="donationVisible" @update:visible="donationVisible = $event" />

                <a-drawer title="过滤器配置管理" :width="600" :visible="configManagerVisible"
                    @close="configManagerVisible = false" :destroyOnClose="false">
                    <FilterConfigManager v-if="configManagerVisible" :current-config="currentConfig"
                        @config-updated="handleConfigUpdate" />
                </a-drawer>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { message } from 'ant-design-vue';
import AppSider from './AppSider.vue';
import AppHeader from './AppHeader.vue';
import FilterPanels from '../filters/FilterPanels.vue';
import PreviewModal from '../modals/PreviewModal.vue';
import DonationModal from '../modals/DonationModal.vue';
import FilterConfigManager from '../filters/FilterConfigManager.vue';
import { generateFilterContent } from '../../utils/filterGenerator';
import type { FilterConfig } from '../filters/types/config';
import './styles/MainLayout.css';

const collapsed = ref<boolean>(false);
const previewVisible = ref<boolean>(false);
const donationVisible = ref<boolean>(false);
const configManagerVisible = ref<boolean>(false);
const filterPanelsRef = ref<InstanceType<typeof FilterPanels>>();

// 当前配置计算属性
const currentConfig = computed<FilterConfig>(() => {
    if (!filterPanelsRef.value) {
        return {
            version: '1.0.0',
            filters: {
                currency: { enabled: true, items: [] },
                equipment: { enabled: true, items: [] },
                jewel: { enabled: true, items: [] },
                flask: { enabled: true, items: [] },
                skillgem: { enabled: true, items: [] },
                unique: { enabled: true, items: [] },
                normalequipment: { enabled: true, items: [] }
            }
        };
    }
    return filterPanelsRef.value.getCurrentConfig();
});

const filterContent = computed(() => {
    if (!filterPanelsRef.value) return '';

    const {
        currencyCheckedList,
        equipmentCheckedList,
        jewelCheckedList,
        flaskCheckedList,
        skillGemCheckedList,
        uniqueCheckedList,
        normalEquipmentCheckedList,
    } = filterPanelsRef.value;

    return generateFilterContent(
        currencyCheckedList,
        equipmentCheckedList,
        jewelCheckedList,
        flaskCheckedList,
        skillGemCheckedList,
        uniqueCheckedList,
        normalEquipmentCheckedList
    );
});

const hasSelectedFilters = computed(() => {
    if (!filterPanelsRef.value) return false;

    const {
        currencyCheckedList,
        equipmentCheckedList,
        jewelCheckedList,
        flaskCheckedList,
        skillGemCheckedList,
        uniqueCheckedList,
        normalEquipmentCheckedList,
    } = filterPanelsRef.value;

    return currencyCheckedList.length > 0 ||
        equipmentCheckedList.length > 0 ||
        jewelCheckedList.length > 0 ||
        flaskCheckedList.length > 0 ||
        skillGemCheckedList.length > 0 ||
        uniqueCheckedList.length > 0 ||
        normalEquipmentCheckedList.length > 0;
});

const showPreview = () => {
    if (!hasSelectedFilters.value) {
        message.warning('请至少选择一个过滤项');
        return;
    }
    previewVisible.value = true;
};

const showDonation = () => {
    donationVisible.value = true;
};

const showConfigManager = () => {
    configManagerVisible.value = true;
};

const exportFilter = () => {
    if (!hasSelectedFilters.value) {
        message.warning('请至少选择一个过滤项');
        return;
    }

    const blob = new Blob([filterContent.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `POE_Filter_${new Date().getTime()}.filter`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    message.success('过滤器导出成功');
};

const handleConfigUpdate = (config: FilterConfig) => {
    if (!filterPanelsRef.value) {
        message.error('无法更新配置：组件未就绪');
        return;
    }

    try {
        filterPanelsRef.value.applyConfig(config);
        message.success('配置已更新');
    } catch (error) {
        message.error('配置更新失败');
        console.error('Config update error:', error);
    }
};
</script>