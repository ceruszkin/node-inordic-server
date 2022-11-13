const WorkerTableUser = require('../../services/worker-tables/users')

module.exports = (app, connect) => {

    app.get('/users/get', function(req, res){
        console.log(WorkerTableUser)
        //Создадим экземпляр вспомогательного класса WorkerTableUser
        const workerTableUser = new WorkerTableUser(res, req)
        workerTableUser.getAll();
        //res.send('Получение всех пользователей')
    })

}