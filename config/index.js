const dockerized = true

const baseConfig = {
    tokenCookie: 'NGallery_Token',
    dockerized: dockerized,
    host: dockerized ? '0.0.0.0' : 'localhost', // for express listen
    static: dockerized ? 'http://static1.fuli.news/' : '/'
}

const devConfig = {
    debug: true,
    home: 'http://localhost:3000',
    port: 3000,
    api: dockerized ? 'http://api-node:8080/api/v1' : 'http://localhost:5000/api/v1'
}

const prodConfig = {
    debug: false,
    home: 'http://account.fuli.news',
    port: 8080,
    api: dockerized ? 'http://api-node:8080/api/v1' : 'http://api.fuli.news/api/v1'
}

module.exports = process.env.NODE_ENV == 'development' ? Object.assign({}, baseConfig, devConfig) : Object.assign({}, baseConfig, prodConfig)
