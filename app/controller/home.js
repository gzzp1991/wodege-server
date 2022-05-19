const Controller = require('egg').Controller

class HomeController extends Controller {
    async index() {
        const { ctx } = this
        let { id } = ctx.query

        if (!id) {
            id = '请求url上无id参数'
        }

        ctx.body = id
    }

    async add() {
        const { ctx } = this
        const { title } = ctx.request.body

        ctx.body = { title }
    }
}

module.exports = HomeController
