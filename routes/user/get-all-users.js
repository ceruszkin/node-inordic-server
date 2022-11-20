const WorkerTableUser = require('../../services/worker-tables/users')

module.exports = (app) => {

    app.get('/users/get', function(req, res){
        //Создадим экземпляр вспомогательного класса WorkerTableUser
        const workerTableUser = new WorkerTableUser(res, req)
        workerTableUser.getAll();
    })

}