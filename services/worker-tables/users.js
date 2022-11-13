const WorkerDataBase = require('../worker-data-base')

module.exports = class WorkerTableUser extends WorkerDataBase{
    #name = 'users'
    constructor(res, req){
        super()
        this.name_table = this.#name
        this.response = res
        this.request = req
    }
}