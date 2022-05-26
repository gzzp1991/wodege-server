const Controller = require('egg').Controller

class NewsController extends Controller {
    async list() {
        const ctx = this.ctx
        const page = ctx.query.page || 1
        const newlist = ctx.service.news.list(page)
        ctx.body = newlist.length
    }
}

module.exports = NewsController