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
            realName: "李兔饼",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        }
    }
}

const adminList = {
    url: "/admin",
    type: "post",
    response: {
        code: 100,
        message: "success",
        total: 10,
        'data|1-10': [
            {
                id: '@increment(1)', // 随机自增
                account: '@word(4,8)', // 随机字母
                avatar: '@dataImage(48x48)', // 随机图片
                realName: '@cword(2,6)', // 随机汉字
                createdBy: '@datetime()'
            }
        ]
    }
}

export default [
    login,
    adminList
]