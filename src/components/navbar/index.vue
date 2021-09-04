<template>
    <div class="cat-navbar">
        <div class="cat-navbar__left">
            导航
        </div>
        <div class="cat-navbar__right" @click="logout" style="cursor:pointer;">
            退出
        </div>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-29
     */

    import { defineComponent } from "vue";
    import { store } from "@/store";

    export default defineComponent({
        name: "CatNavbar",
        setup() {
            const logout = () => {
                store.dispatch("user/logout", () => {
                    window.location.reload();
                })
            }

            return {
                logout
            }
        }
    });
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
