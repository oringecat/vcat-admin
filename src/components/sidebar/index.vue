<template>
    <div class="cat-sidebar">
        <div :class="[ 'cat-sidebar__header', isCollapse && 'is-fold' ]">
            <span class="logo">后台管理系统</span>
        </div>
        <div class="cat-sidebar__nav">
            <el-menu :default-active="$route.name" :collapse="isCollapse" router unique-opened>
                <cat-submenu :data-list="authMenu"></cat-submenu>
            </el-menu>
        </div>
        <div :class="[ 'cat-sidebar__copyright', isCollapse && 'is-fold' ]">
            <a href="https://github.com/oringecat/vcat-admin" target="_blank">vCat Admin - GitHub</a>
            <span>&copy;2007-{{ year }} teamwei.com</span>
        </div>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-29
     */

    import { defineComponent, ref, reactive } from "vue";
    import { getAuthMenu } from "@/router/dynamic";

    export default defineComponent({
        name: "CatSidebar",
        props: {
            // 是否折叠收起菜单
            isCollapse: Boolean
        },
        setup() {
            const authMenu = reactive(getAuthMenu()),
                year = ref(new Date().getFullYear());

            return {
                authMenu,
                year,
            }
        }
    });
</script>

<style lang="less">
    @import "./index.less";
</style>
