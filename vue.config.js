module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/imperium/'
    : '/',
    "transpileDependencies": [
        "vuetify",
        'vue-echarts',
        'resize-detector'
    ]
}