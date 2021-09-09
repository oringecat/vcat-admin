<template>
    <div class="cat-auth">
        <div class="cat-auth__wrapper">
            <div class="cat-auth__container">
                <div class="title">
                    <h1>李兔饼后台管理系统</h1>
                    <h2>{{ title }}</h2>
                </div>
                <div class="main">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "CatAuth",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    });
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
