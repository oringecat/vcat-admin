<template>
    <el-scrollbar :class="[ 'cat-sidebar', modelValue && 'is-hide' ]" view-class="cat-sidebar__view">
        <div :class="[ 'cat-sidebar__header', modelValue && 'is-hide' ]">
            <span class="logo">后台管理系统</span>
        </div>
        <div class="cat-sidebar__menu">
            <el-menu :default-active="$route.name" :collapse="modelValue" @select="routerTo" unique-opened>
                <cat-submenu :data-list="authMenu"></cat-submenu>
            </el-menu>
        </div>
        <div :class="[ 'cat-sidebar__copyright', modelValue && 'is-hide' ]">
            <a href="https://github.com/oringecat/vcat-admin" target="_blank">vCat Admin - GitHub</a>
            <span>&copy;2007-{{ year }} teamwei.com</span>
        </div>
        <div :class="[ 'cat-sidebar__mask', modelValue && 'is-hide' ]" @click="hideSidebar(true)" v-if="isMobile"></div>
    </el-scrollbar>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-29
     */

    import { defineComponent, ref, reactive, computed } from "vue";
    import { getAuthMenu } from "@/router/dynamic";
    import { store } from "@/store";
    import router from "@/router";

    export default defineComponent({
        name: "CatSidebar",
        props: {
            // 折叠收起菜单栏
            modelValue: Boolean
        },
        setup(props, { emit }) {
            const authMenu = reactive(getAuthMenu()),
                year = ref(new Date().getFullYear());

            const hideSidebar = (value: boolean) => {
                emit("update:modelValue", value);
            }

            // 监听设备变化
            const isMobile = computed(() => {
                const flag = store.state.app.isMobile;
                if (flag) {
                    hideSidebar(true);
                } else {
                    hideSidebar(false);
                }
                return flag;
            });

            // 菜单跳转
            const routerTo = (routerName: string) => {
                isMobile.value && hideSidebar(true);
                router.replace({ name: routerName });
            }

            return {
                authMenu,
                isMobile,
                year,
                hideSidebar,
                routerTo,
            }
        }
    });
</script>

<style lang="less">
    @import "./index.less";
</style>
