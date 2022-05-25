module.exports = app => {
    const { router, controller } = app
    router.get('/', controller.home.index)
    router.get('/home', controller.home.index)
    router.post('/home/add', controller.home.add)

    router.get('/user', controller.user.get)
    router.post('/user/login', controller.user.login)
    router.post('/user/register', controller.user.register)
    router.post('/user/edit', controller.user.edit)
    router.post('/user/add', controller.user.add)
    router.post('/user/delete', controller.user.delete)


    router.get('/user/test', controller.user.test)
}
