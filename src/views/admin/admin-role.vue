<template>
    <div class="admin-role">
        <cat-view class="admin-role__tree">
            <el-tree :data="routerMap" :props="defaultProps" :expand-on-click-node="false" highlight-current default-expand-all></el-tree>
        </cat-view>
        <cat-view class="admin-role__detail">
            <el-form class="cat-form" label-width="100px">
                <el-form-item label="name" required>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="路径" required>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="重定向">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="组件" required>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="标题" required>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="隐藏">
                    <el-switch></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">提交</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </cat-view>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive } from "vue";
    import { AdminRoute, IAdminRoute } from "@/api/admin";
    import { sessionData } from "@/lib/storage"

    export default defineComponent({
        name: "AdminRole",
        setup() {
            const routerMap: AdminRoute[] = reactive(sessionData.get("routerMap")),
                defaultProps = reactive({
                    children: 'children',
                    label: (data: IAdminRoute) => {
                        return data.meta?.title;
                    },
                });

            return {
                routerMap,
                defaultProps
            }
        }
    });
</script>

<style lang="less">
    @import "./admin.less";
</style>