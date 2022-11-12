/**
 * Маршрут для удаления оного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с полями, которые описывают успешное удаление товара из БД 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/del_item?id=1
 */
 module.exports = (app, connect) => app.get('/del_item', function(req, res){
    //Получаем поле id из объекта request
    const {id} = req.query

    //Сформировать запрос к БД
    //Тот же замый запрос, что и в роуте для получения одного товара, но первое ключевое слово - DELETE
    const sql = `DELETE FROM goods WHERE ID='${id}'`;
    connect.query(sql, (err, result) => {
        result.ourMessage = 'Объект удален, либо его нет в БД';
        err ? res.send(err) : res.send(JSON.stringify(result))
    })
 }) 