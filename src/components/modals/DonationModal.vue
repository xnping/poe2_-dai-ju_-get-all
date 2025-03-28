<template>
    <a-modal :open="visible" title="赞助支持" width="400px" @cancel="hide" @update:open="updateVisible">
        <div class="donation-content">
            <p class="donation-text">
                感谢您对我们的支持！您的每一份赞助都是我们前进的动力。
                我们会继续努力，为大家提供更好的POE过滤器工具。
                您的支持将帮助我们：
            </p>
            <ul class="donation-list">
                <li>✨ 持续优化和更新功能</li>
                <li>🚀 提供更稳定的服务器支持</li>
                <li>💡 开发更多实用的工具</li>
                <li>🌟 创造更好的用户体验</li>
            </ul>
        </div>
        <img src="../../assets/home.png" alt="赞助二维码" class="donation-qr" />
        <template #footer>
            <a-button @click="hide">关闭</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
defineProps<{
    visible: boolean
}>();

const emit = defineEmits<{
    'update:visible': [value: boolean]
}>();

const hide = () => {
    emit('update:visible', false);
};

const updateVisible = (value: boolean) => {
    emit('update:visible', value);
};
</script>

<style scoped>
.donation-content {
    text-align: center;
    margin-bottom: 20px;
}

.donation-text {
    font-size: 16px;
    color: #666;
    line-height: 1.8;
}

.donation-list {
    list-style: none;
    padding: 0;
    color: #666;
    margin-bottom: 20px;
}

.donation-qr {
    width: 100%;
    height: auto;
}
</style>