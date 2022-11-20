const WorkerTableGood = require('../../services/worker-tables/goods')

/**
 * Маршрут для получения всех товаров:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON со спском всех товаров
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/get_all_good
 */
 module.exports = (app) => app.get('/goods/get', function(req, res){
    const workerTableGood = new WorkerTableGood(res, req)
    workerTableGood.getAll();
})