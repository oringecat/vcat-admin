<template>
    <div class="cat-page">
        <cat-sidebar class="cat-page__sidebar" :is-collapse="isCollapse"></cat-sidebar>
        <div class="cat-page__container">
            <div class="header">
                <cat-navbar>
                    <template #left>
                        <el-icon class="icon-fold-expand" title="折叠/展开" @click="isCollapse = !isCollapse">
                            <expand v-if="isCollapse" />
                            <fold v-else />
                        </el-icon>
                    </template>
                </cat-navbar>
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

    import { defineComponent,ref, computed, watch } from "vue";
    import { useRoute } from "vue-router";
    import { store } from "@/store";

    export default defineComponent({
        name: "CatPage",
        setup() {
            const route = useRoute(),
                excludePages = computed(() => store.state.router.excludePages),
                isCollapse = ref(false);

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
                isCollapse,
            };
        },
    });
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
