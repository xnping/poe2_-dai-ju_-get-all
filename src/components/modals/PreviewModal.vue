<template>
    <a-modal :open="visible" title="过滤器预览" width="800px" @cancel="hide" @update:open="updateVisible">
        <a-textarea :value="content" :rows="20" readonly placeholder="生成的过滤器内容将显示在这里..." />
        <template #footer>
            <a-button @click="hide">关闭</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
defineProps<{
    visible: boolean
    content: string
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