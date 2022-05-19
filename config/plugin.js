const path = require('path')

exports.ua = {
    enable: true,
    path: path.resolve(__dirname, '../lib/plugin/egg-ua')
}

exports.mysql = {
    enable: true,
    package: 'egg-mysql'
}

exports.jwt = {
    enable: true,
    package: 'egg-jwt'
}