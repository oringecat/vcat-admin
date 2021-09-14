module.exports = {
    productionSourceMap: false, //打包取消.map
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            args[0].title = "VCAT-ADMIN";
            return args;
        });
    },
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
};
