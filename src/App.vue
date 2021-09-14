<template>
    <el-config-provider :locale="locale">
        <router-view :class="{ mobile: isMobile }"></router-view>
    </el-config-provider>
</template>

<script lang="ts">
    import { defineComponent, onMounted, computed, provide } from "vue";
    import { store } from "@/store";
    import { localData } from "@/lib/storage";
    import { ElConfigProvider } from "element-plus"
    import zhCn from "element-plus/lib/locale/lang/zh-cn"

    export default defineComponent({
        name: "App",
        components: {
            ElConfigProvider,
        },
        setup() {
            const loginInfo = computed(() => store.state.user.loginInfo),
                isMobile = computed(() => store.state.app.isMobile);

            // 全局共享登陆信息
            provide("loginInfo", loginInfo);

            onMounted(() => {
                const classList = document.body.classList;
                classList.add(localData.get("appTheme"));
            })

            return {
                locale: zhCn,
                isMobile,
            }
        },
    });
</script>

<style lang="less">
    @import "./themes/style.less";
</style>
