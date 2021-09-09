<template>
    <router-view :class="{ mobile: isMobile }"></router-view>
</template>

<script lang="ts">
    import { defineComponent, onMounted, computed, provide } from "vue";
    import { store } from "@/store";
    import { localData } from "@/lib/storage";

    export default defineComponent({
        name: "App",
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
                isMobile,
            }
        },
    });
</script>

<style lang="less">
    @import "./themes/style.less";
</style>
