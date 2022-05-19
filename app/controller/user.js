const Controller = require('egg').Controller

class UserController extends Controller {
    async login() {
        const { ctx, app } = this
        const { username, password } = ctx.request.body

        const userInfo = await ctx.service.user.getUserByName(username)

        if (!(userInfo && userInfo.id)) {
            ctx.body = {
                code: 500,
                msg: '账号不存在',
                data: null
            }

            return
        }

        if (password !== userInfo.password) {
            ctx.body = {
                code: 500,
                msg: '密码不正确',
                data: null
            }

            return
        }

        const today_end = new Date()
        today_end.setHours(23, 59, 59, 999)

        const token = app.jwt.sign({
            id: userInfo.id,
            username: userInfo.username,
            password: userInfo.password,
            exp: Math.floor(today_end.getTime() / 1000) 
            // exp: Math.floor(new Date() / 1000) + (24 * 60 * 60) 
        }, app.config.jwt.secret)

        ctx.body = {
            code: 200,
            msg: '登录成功',
            data: { token }
        }
    }

    async register() {
        const { ctx } = this
        const { username, password } = ctx.request.body

        if (!username || !password) {
            ctx.body = {
                code: 500,
                msg: '账号密码不能为空',
                data: null
            }
            return
        }

        const userInfo = await ctx.service.user.getUserByName(username)

        if (userInfo && userInfo.id) {
            ctx.body = {
                code: 500,
                msg: '账户名已被注册，请重新输入',
                data: null
            }

            return
        }

        const result = await ctx.service.user.add(ctx.request.body)

        if (result) {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: null
            }

            return
        }

        ctx.body = {
            code: 400,
            msg: '添加失败',
            data: null
        }
    }

    async test() {
        const { ctx, app } = this

        const token = ctx.request.header.authorization
        const decode = await app.jwt.verify(token, app.config.jwt.secret)

        ctx.body = {
            code: 200,
            msg: '获取成功',
            data: decode
        }
    }

    async get() {
        const { ctx } = this

        const users = await ctx.service.user.get()

        console.log('users', users);
        ctx.body = { users }
    }

    async edit() {
        const { ctx } = this
        const { id, name } = ctx.request.body

        const result = await ctx.service.user.edit(id, name)

        console.log('result', result);
        if (result) {
            ctx.body = {
                code: 200,
                msg: '修改成功',
                data: null
            }
            return
        }

        ctx.body = {
            code: 500,
            msg: '修改失败',
            data: null
        }
    }

    async add() {
        const { ctx } = this
        const { name } = ctx.request.body

        const result = await ctx.service.user.add(name)

        if (result) {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: null
            }
            return
        }

        ctx.body = {
            code: 500,
            msg: '添加失败',
            data: null
        }
    }

    async delete() {
        const { ctx } = this
        const { id } = ctx.request.body
        
        const result = await ctx.service.user.delete(id)

        if (result) {
            ctx.body = {
                code: 200,
                msg: '删除成功',
                data: null
            }
            return
        }

        ctx.body = {
            code: 500,
            msg: '删除失败',
            data: null
        }
    }
}

module.exports = UserController
