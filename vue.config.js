module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Scorefour";
                return args;
            })
    },
    devServer: {
        disableHostCheck: true,
    },
}