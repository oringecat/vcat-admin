<template>
    <cat-scrollbar class="cat-view">
        <div class="cat-view__header" v-if="$slots['headerLeft'] || $slots['headerRight']">
            <div class="left-panel">
                <slot name="headerLeft"></slot>
            </div>
            <div class="right-panel">
                <slot name="headerRight"></slot>
            </div>
        </div>
        <div class="cat-view__container" v-loading="loading && showLoading" v-loading.fullscreen="fullLoading && showLoading">
            <slot></slot>
        </div>
        <div class="cat-view__footer" v-if="$slots['footer']">
            <slot name="footer"></slot>
        </div>
    </cat-scrollbar>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-28
     */

    import { defineComponent, computed } from "vue";
    import { store } from "@/store";

    export default defineComponent({
        name: "CatView",
        props: {
            loading: Boolean,
            fullLoading: Boolean
        },
        setup() {
            const showLoading = computed(() => store.state.app.loading);

            return {
                showLoading,
            }
        }
    });
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
