import Mock from "mockjs"

Mock.setup({
    timeout: "200-1000"
})

type request = {
    url: string,
    type: string,
    response: () => void,
}

let mocks: request[] = [];

// 遍历目录所有ts文件
const files = require.context(".", false, /\.ts$/);
files.keys().forEach((key) => {
    if (key === "./index.ts") return;
    mocks = mocks.concat(files(key).default);
})

mocks.forEach((item) => {
    Mock.mock(item.url, item.type, item.response)
})