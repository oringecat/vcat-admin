<template>
    <cat-auth class="admin-login" title="登录">
        <ul class="form">
            <li class="form-input">
                <el-input placeholder="账号" maxlength="11" v-model="admin.account" v-validate="{ rules: 'required' }"></el-input>
            </li>
            <li class="form-input">
                <el-input type="password" placeholder="密码" v-model="admin.password" v-validate="{ rules: 'required' }"></el-input>
            </li>
            <li class="form-button">
                <el-button type="primary" :disabled="loading" v-validate-submit.sync="loginSuccess">
                    <template v-if="loading">
                        <i class="el-icon-loading"></i>
                        <span>正在登录</span>
                    </template>
                    <template v-else>
                        <span>登录</span>
                    </template>
                </el-button>
                <el-button>注册</el-button>
            </li>
        </ul>
    </cat-auth>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-01
     */

    import { defineComponent, reactive, computed } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { store } from "@/store";
    import { Admin, AdminService } from "@/api/admin";
    import { ElMessage } from "element-plus";
    import catAuth from "./components/auth/index.vue"

    export default defineComponent({
        name: "Login",
        components: {
            catAuth
        },
        setup() {
            const route = useRoute(),
                router = useRouter();

            const admin = reactive(new Admin()),
                loading = computed(() => store.state.app.loading);

            //管理员登录
            const login = (message: string[]) => {
                if (message.length === 0) {
                    AdminService.login({
                        data: {
                            account: admin.account,
                            passwordHash: admin.getPasswordHash(),
                        },
                        success: (res) => {
                            store.dispatch("user/login", res.data);

                            const redirect = route.query.redirect;
                            if (redirect) {
                                router.replace(redirect.toString());
                            } else {
                                router.replace({ name: "HomeIndex" });
                            }
                        },
                        fail: (err) => {
                            admin.password = "";
                            ElMessage.warning(err.message);
                        },
                    });
                }
            };

            //模拟登录成功（测试用，不随生产环境发布）
            const loginSuccess = (message: string[]) => {
                if (message.length === 0) {
                    store.dispatch("user/login", {
                        id: 1001,
                        account: "teamwei",
                        realname: "超级管理员",
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                    });

                    const redirect = route.query.redirect;
                    if (redirect) {
                        router.replace(redirect.toString());
                    } else {
                        router.replace({ name: "HomeIndex" });
                    }
                }
            };

            return {
                admin,
                loading,
                login,
                loginSuccess,
            };
        },
    });
</script>

<style lang="less">
    @import "./admin.less";
</style>
