<template>
    <cat-auth class="admin-register" title="注册"></cat-auth>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import catAuth from "./components/auth/index.vue"

    export default defineComponent({
        name: "Register",
        components: {
            catAuth
        },
    });
</script>

<style lang="less">
    @import "./admin.less";
</style>
