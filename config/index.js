const baseConfig = {
    tokenCookie: 'NGallery_Token'
}

const devConfig = {
    debug: true,
    host: 'localhost',
    port: 3000,
    api: 'http://api.fuli.news/api/v1'
}

const prodConfig = {
    debug: false,
    host: 'http://account.fuli.news',
    port: 8080,
    api: 'http://api.fuli.news/api/v1'
}

module.exports = process.env.NODE_ENV == 'development' ? Object.assign({}, baseConfig, devConfig) : Object.assign({}, baseConfig, prodConfig)
