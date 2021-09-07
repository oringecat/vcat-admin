<template>
    <div class="cat-navbar">
        <div class="cat-navbar__left">
            <slot name="left"></slot>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <template v-for="(item,index) in matched" :key="index">
                    <el-breadcrumb-item :to="{ path: item.path }">
                        <!--<i :class="item.meta.icon" v-if="item.meta.icon"></i>-->
                        <span>{{ item.meta.title ?? 'item.name' }}</span>
                    </el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </div>
        <div class="cat-navbar__right" @click="logout" style="cursor:pointer;">
            退出
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-29
     */

    import { defineComponent, computed } from "vue";
    import { useRoute } from "vue-router";
    import { store } from "@/store";

    export default defineComponent({
        name: "CatNavbar",
        setup() {
            const route = useRoute(),
                matched = computed(() => route.matched);

            const logout = () => {
                store.dispatch("user/logout", () => {
                    window.location.reload();
                })
            }

            return {
                matched,
                logout,
            }
        }
    });
</script>

<style lang="less">
    @import "./index.less";
</style>
