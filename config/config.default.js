exports.jwt = {
    secret: 'WDG'
}

exports.keys = 'zpcookie'

exports.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0'
}

// exports.middleware = ['robot']

exports.robot = {
    ua: [/Baiduspider/i]
}

exports.security = {
    csrf: {
        enable: false,
        ignoreJSON: true
    },
    domainWhiteList: ['*']
}

exports.mysql = {
    client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'whzp1991',
        database: 'wodege_database'
    },
    app: true,
    agent: false
}
