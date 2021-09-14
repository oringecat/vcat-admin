<template>
    <el-pagination class="cat-pagination" @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page.index"
                   :pager-count="7"
                   :page-sizes="[20, 30, 40]"
                   :page-size="page.size"
                   layout="total, sizes, prev, pager, next, jumper,"
                   :total="total"
                   background>
    </el-pagination>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-09-12
     */

    import { defineComponent, reactive } from "vue";

    export default defineComponent({
        name: "CatPagination",
        props: {
            // 总条数
            total: {
                type: Number,
                required: true
            },
            // 每页条数
            pageSize: {
                type: Number,
                default: 30
            },
            // 当前页数
            pageIndex: {
                type: Number,
                default: 1
            },
        },
        setup(props, { emit }) {
            const page = reactive({
                size: props.pageSize,
                index: props.pageIndex,
            });

            const handleSizeChange = (val: number) => {
                page.size = val;
                emit("update:pageSize", val);
            };

            const handleCurrentChange = (val: number) => {
                page.index = val;
                emit("update:pageIndex", val);
                emit("pageChange", val);
            };

            return {
                page,
                handleSizeChange,
                handleCurrentChange,
            }
        }
    });
</script>

<style lang="less">
    @import "./index.less";
</style>
