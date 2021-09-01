<template>
    <cat-view class="product-index">
        <div>产品：{{ loginInfo }}</div>
        <el-input v-model="inputValue" style="width:200px;"></el-input>
    </cat-view>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  name: "ProductIndex",
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
