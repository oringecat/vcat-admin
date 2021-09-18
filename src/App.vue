<template>
    <el-config-provider :locale="locale">
        <router-view></router-view>
    </el-config-provider>
</template>

<script lang="ts">
    import { defineComponent, onMounted, computed, provide } from "vue";
    import { store } from "@/store";
    import { getAppTheme } from "@/utils/mixin";
    import { ElConfigProvider } from "element-plus"
    import zhCn from "element-plus/lib/locale/lang/zh-cn"

    export default defineComponent({
        name: "App",
        components: {
            ElConfigProvider,
        },
        setup() {
            const loginInfo = computed(() => store.state.user.loginInfo);
            // 全局共享登陆信息
            provide("loginInfo", loginInfo);

            onMounted(() => {
                getAppTheme();
            })

            return {
                locale: zhCn,
            }
        },
    });
</script>

<style lang="less">
    @import "./themes/style.less";
</style>
