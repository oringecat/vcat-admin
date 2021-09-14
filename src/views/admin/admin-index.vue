<template>
    <cat-view class="admin-index" loading>
        <template #headerLeft>
            <el-button-group>
                <el-button type="primary" size="medium" icon="el-icon-plus">添加</el-button>
                <el-button type="primary" size="medium" icon="el-icon-delete">删除</el-button>
            </el-button-group>
        </template>
        <template #headerRight>
            <el-input size="medium" placeholder="请输入关键字">
                <template #append>
                    <el-button icon="el-icon-search"></el-button>
                </template>
            </el-input>
        </template>
        <el-table class="cat-table" :data="adminList">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column label="头像">
                <template #default="scope">
                    <img class="cat-image-avatar" :src="scope.row.avatar" />
                </template>
            </el-table-column>
            <el-table-column prop="account" label="账号"></el-table-column>
            <el-table-column prop="realName" label="姓名"></el-table-column>
            <el-table-column prop="createdBy" label="日期"></el-table-column>
        </el-table>
    </cat-view>
</template>

<script lang="ts">
    import { defineComponent, reactive } from "vue";
    import { Admin, IAdmin, AdminService } from "@/api/admin";

    export default defineComponent({
        name: "AdminIndex",
        setup() {
            const adminList: Admin[] = reactive([]);

            AdminService.getList({
                success: (res) => {
                    res.data.forEach((e: IAdmin) => adminList.push(new Admin(e)));
                }
            });

            return {
                adminList,
            }
        }
    });
</script>

<style lang="less">
    @import "./admin.less";
</style>