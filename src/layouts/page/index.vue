<template>
    <div class="cat-page">
        <div class="cat-page__sidebar">
            <cat-sidebar></cat-sidebar>
        </div>
        <div class="cat-page__container">
            <div class="header">
                <cat-navbar></cat-navbar>
                <cat-tabbar></cat-tabbar>
            </div>
            <div class="main">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <keep-alive :exclude="excludePages">
                            <component :is="Component" :key="$route.fullPath" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-29
     */

    import { defineComponent, computed, watch } from "vue";
    import { useRoute } from "vue-router";
    import { store } from "@/store";

    export default defineComponent({
        name: "CatPage",
        setup() {
            const route = useRoute(),
                excludePages = computed(() => store.state.router.excludePages);

            watch(() => ({
                name: route.name,
                title: route.meta.title || "标签页",
                fullPath: route.fullPath
            }), (value) => {
                //添加到store路由历史列表
                store.dispatch("router/addHistory", value);
            }, {
                immediate: true
            })

            return {
                excludePages,
            };
        },
    });
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
