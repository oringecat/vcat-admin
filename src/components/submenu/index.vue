<template>
    <template v-for="(item,index) in dataList" :key="index">
        <el-sub-menu :index="item.name" v-if="item.children">
            <template #title>
                <!--如果没有图标，用标题第一个字代替-->
                <i :class="[ item.icon, 'menu-icon' ]" v-if="item.icon"></i>
                <i class="text-icon menu-icon" v-else>{{ item.label.slice(0,1) }}</i>
                <span v-if="item.icon">{{ item.label }}</span>
                <span v-else>{{ item.label.slice(1) }}</span>
            </template>
            <!--如果存在子级，递归调用自身-->
            <cat-submenu :data-list="item.children"></cat-submenu>
        </el-sub-menu>
        <el-menu-item :index="item.name" :route="{ path: item.path, replace: true }" v-else>
            <i :class="[ item.icon, 'menu-icon' ]" v-if="item.icon"></i>
            <span>{{ item.label }}</span>
        </el-menu-item>
    </template>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-09-04
     */

    import { defineComponent } from "vue";

    export default defineComponent({
        name: "CatSubmenu",
        props: {
            dataList: {
                type: Array,
                required: true
            }
        },
    });
</script>