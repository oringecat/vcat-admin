<template>
    <div class="cat-navbar">
        <div class="cat-navbar__left">
            导航
        </div>
        <div class="cat-navbar__right">
            用户
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

    export default defineComponent({
        name: "CatNavbar",
    });
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
