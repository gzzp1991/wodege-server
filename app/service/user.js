const Service = require('egg').Service

class UserService extends Service {
    async get() {
        const { app } = this
        const QUERY_STR = 'username, password'
        const sql = `select ${QUERY_STR} from user`

        try {
            const result = await app.mysql.query(sql)

            return result
        } catch (error) {
            return null
        }
    }

    async edit(id, name) {
        const { app } = this
        try {
            const result = await app.mysql.update('list', { name }, {
                where: { id }
            })

            return result
        } catch (error) {
            return null
        }
    }

    async add(user) {
        const { app } = this

        try {
            const result = await app.mysql.insert('user', {
                ...user,
                create_time: String(new Date().getTime())
            })
            return result
        } catch (error) {
            return null
        }
    }

    async delete(id) {
        const { app } = this

        try {
            const result = await app.mysql.delete('list', { id })

            return result
        } catch (error) {
            return null
        }
    }

    async getUserByName(username) {
        const { app } = this

        try {
            const result = await app.mysql.get('user', { username })

            return result
        } catch (error) {
            return null
        }
    }
}

module.exports = UserService
