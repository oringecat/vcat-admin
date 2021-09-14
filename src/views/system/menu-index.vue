<template>
    <cat-view class="menu-index">
        <template #headerLeft>
            <el-button type="primary" size="medium" icon="el-icon-plus">添加</el-button>
        </template>
        <el-table :data="menuList" row-key="id" :tree-props="{children: 'children'}" default-expand-all>
            <el-table-column prop="meta.title" label="标题"></el-table-column>
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="component" label="组件"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="info" size="mini" icon="el-icon-edit" @click="edit(scope.row.id)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <eidt-dialog v-model="eidtVisible" :menu-id="currentId" @confirm="onConfirm" v-if="eidtVisible"></eidt-dialog>
    </cat-view>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from "vue";
    import { AdminRoute } from "@/api/admin";
    import { sessionData } from "@/lib/storage"
    import eidtDialog from "./components/menu-eidt.vue"

    export default defineComponent({
        name: "MenuIndex",
        components: {
            eidtDialog
        },
        setup() {
            const menuList: AdminRoute[] = reactive(sessionData.get("routerMap")),
                eidtVisible = ref(false),
                currentId = ref(0);

            const edit = (id: number) => {
                currentId.value = id;
                eidtVisible.value = true;
            }

            const onConfirm = (item: AdminRoute) => {
                console.log(item)
            }

            return {
                menuList,
                eidtVisible,
                currentId,
                edit,
                onConfirm
            }
        }
    });
</script>

<style lang="less">
    @import "./system.less";
</style>