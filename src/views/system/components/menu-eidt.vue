<template>
    <el-dialog v-model="dialogVisible" title="编辑" :key="adminRoute.id" @closed="$emit('update:modelValue', false)" append-to-body>
        <el-form label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="标题" required>
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="name" required>
                        <el-input v-model="adminRoute.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="路径" required>
                        <el-input v-model="adminRoute.path"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="重定向">
                        <el-input v-model="adminRoute.redirect"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组件" required>
                        <el-input v-model="adminRoute.component"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="图标">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="隐藏">
                        <el-switch></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" size="medium" @click="onSubmit">提交</el-button>
                <el-button size="medium" @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
    import { defineComponent, ref,  watch } from "vue";
    import { sessionData } from "@/lib/storage"
    import { AdminRoute } from "@/api/admin";

    export default defineComponent({
        name: "MenuEdit",
        emits: ['confirm', 'update:modelValue'],
        props: {
            modelValue: Boolean,
            menuId: {
                type: Number,
                default: 0,
            }
        },
        setup(props, { emit }) {
            const dialogVisible = ref(props.modelValue),
                adminRoute = ref(new AdminRoute());

            const onSubmit = () => {
                emit("confirm", adminRoute.value);
                dialogVisible.value = false;
            };

            if (props.menuId > 0) {
                const routerItem = sessionData.get("routerMap").find((item: AdminRoute) => item.id === props.menuId);
                if (routerItem) {
                    adminRoute.value = routerItem;
                }
            }

            watch(() => props.modelValue, (val) => {
                dialogVisible.value = val;
            });

            return {
                adminRoute,
                dialogVisible,
                onSubmit,
            }
        }
    });
</script>