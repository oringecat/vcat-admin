<template>
    <cat-view class="home-index">
        <template #headerLeft>
            左边
        </template>
        <template #headerRight>
            右边
        </template>
        <div class="content">首页：{{ loginInfo }}</div>
        <el-input v-model="inputValue" style="width:200px;"></el-input>
        <template #footer>
            底边
        </template>
    </cat-view>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  name: "HomeIndex",
  setup() {
    const loginInfo = inject("loginInfo"),
      inputValue = ref();

    return {
      loginInfo,
      inputValue,
    };
  },
});
</script>

<style lang="less">
    @import "./home.less";
</style>