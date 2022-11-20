const WorkerDataBase = require('../worker-data-base')

module.exports = class WorkerTableGood extends WorkerDataBase{
    #name = 'goods'
    constructor(res, req){
        super()
        this.name_table = this.#name
        this.response = res
        this.request = req
    }
}