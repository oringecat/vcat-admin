<template>
    <cat-view class="admin-index">
        AdminIndex
        <el-button @click="toEdit">编辑</el-button>
    </cat-view>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import router from "@/router";

    export default defineComponent({
        name: "AdminIndex",
        setup() {
            const toEdit = () => {
                router.replace({ name: "AdminEdit" });
            }

            return {
                toEdit
            }
        }
    });
</script>

<style lang="less">
    @import "./admin.less";
</style>