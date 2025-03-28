<template>
    <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible @update:collapsed="updateCollapsed">
        <div class="logo">呆橘过滤器</div>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
    PlusSquareTwoTone,
    VideoCameraTwoTone,
    ApiTwoTone,
    CrownTwoTone,
} from '@ant-design/icons-vue';
import './styles/AppSider.css';

defineProps<{
    collapsed: boolean
}>();

const emit = defineEmits<{
    'update:collapsed': [value: boolean]
    'showDonation': []
}>();

const selectedKeys = ref<string[]>(['1']);

const joinUs = () => {
    window.open('https://kook.vip/8lhssl', '_blank');
};

const showDonation = () => {
    emit('showDonation');
};

const updateCollapsed = (value: boolean) => {
    emit('update:collapsed', value);
};
</script>