<template>
    <div class="cat-page">
        <div class="cat-page__sidebar">
            <div class="logo">
                <span>后台管理系统</span>
            </div>
            <div class="nav">
                <router-link :to="{ name: 'HomeIndex' }" style="color: #fff; display: block" replace>首页</router-link>
                <router-link :to="{ name: 'ProductIndex' }" style="color: #fff; display: block" replace>产品</router-link>
                <router-link :to="{ name: 'ProductDetail', query: { a: '333', b: 1 } }" style="color: #fff; display: block" replace>详情</router-link>
                <router-link :to="{ name: 'AdminIndex' }" style="color: #fff; display: block" replace>管理员</router-link>
                <router-link :to="{ name: 'AdminEdit' }" style="color: #fff; display: block" replace>编辑</router-link>
                <router-link :to="{ name: 'AdminRole' }" style="color: #fff; display: block" replace>角色</router-link>
            </div>
            <div class="copyright">
                <span>@2021 teamwei.com</span>
                <a href="https://github.com/oringecat/vcat-admin" target="_blank">GitHub</a>
            </div>
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
                //添加到store路由列表
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
