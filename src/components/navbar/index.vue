<template>
    <div class="cat-navbar">
        <div class="cat-navbar__left">
            <slot name="left"></slot>
            <el-breadcrumb separator-class="el-icon-arrow-right" v-show="!isMobile">
                <template v-for="(item,index) in matched" :key="index">
                    <el-breadcrumb-item :to="{ path: item.path }">
                        <!--<i :class="item.meta.icon" v-if="item.meta.icon"></i>-->
                        <span>{{ item.meta.title ?? 'item.name' }}</span>
                    </el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </div>
        <div class="cat-navbar__right">
            <slot name="right"></slot>
            <div class="iconbar">
                <el-badge type="danger" is-dot>
                    <span class="cat-icon-notice"></span>
                </el-badge>
                <span class="cat-icon-minimize" @click="exitFullSreen" v-if="fullScreen"></span>
                <span class="cat-icon-maximize" @click="setFullSreen" v-else></span>
            </div>
            <el-dropdown class="user-dropdown" trigger="click">
                <span class="user-dropdown__link">
                    <img class="cat-image--avatar" :src="loginInfo.avatar" :title="loginInfo.realName" />
                    <span v-if="!isMobile">{{loginInfo.realName}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="el-icon-key">修改密码</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-29
     */

    import { defineComponent, ref, computed, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import { store } from "@/store";
    import { debounce } from "@/utils"

    export default defineComponent({
        name: "CatNavbar",
        setup() {
            const route = useRoute(),
                loginInfo = computed(() => store.state.user.loginInfo),
                isMobile = computed(() => store.state.app.isMobile),
                matched = computed(() => route.matched), // 面包屑
                fullScreen = ref(false);

            // 全屏
            const setFullSreen = () => {
                document.documentElement.requestFullscreen();
            }

            // 退出全屏
            const exitFullSreen = () => {
                document.exitFullscreen();
            }

            const logout = () => {
                store.dispatch("user/logout", () => {
                    window.location.reload();
                })
            }

            onMounted(() => {
                // 监听全屏变化
                window.addEventListener('resize', debounce(() => {
                    if (window.innerHeight === window.screen.height) {
                        fullScreen.value = true;
                    } else {
                        fullScreen.value = false;
                    }
                }, 100));
            })

            return {
                loginInfo,
                isMobile,
                matched,
                fullScreen,
                setFullSreen,
                exitFullSreen,
                logout,
            }
        }
    });
</script>

<style lang="less">
    @import "./index.less";
</style>
