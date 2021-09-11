const login = {
    url: "/admin/login",
    type: "post",
    response: {
        code: 100,
        message: "success",
        total: 0,
        data: {
            id: 1001,
            account: "teamwei",
            avatar: "",
            realName: "超级管理员",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        }
    }
}

export default [
    login
]