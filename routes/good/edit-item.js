//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
const WorkerTableGood = require('../../services/worker-tables/goods')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')

module.exports = (app) => {
    /**
     * Маршрут для редактирования оного товара:
     * Автор: Румянцев Александр
     * Описание: Возвращает JSON с полями, которые описывают успешное редактирования товара в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
    */
    app.post('/goods/edit', fileFromForm, function(req, res){
        //Тут не можем чистать данных с формы без дополнительных плагинов
        const data = {
            "ID": req.body.ID,
            "TITLE": req.body.TITLE,
            "DISCR": req.body.DISCR,
            "PRICE": req.body.PRICE,
            "IMG": req.body.IMG,
            "COUNT": req.body.COUNT,
        }

        const workerTableGood = new WorkerTableGood(res, req)
        workerTableGood.update(data)

    })
    /**
     * Маршрут для редактирования оного товара:
     * Автор: Румянцев Александр
     * Описание: Возвращает JSON с полями, которые описывают успешное добавление товара в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     */
    app.get('/form_edit_item', function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - edit_item
                </h1>
                <form enctype="multipart/form-data" action='/goods/item' method='post'>
                    <input placeholder='ID' type='text' name='ID'/>
                    <input placeholder='TITLE' type='text' name='TITLE'/>
                    <input placeholder='DISCR' type='text' name='DISCR'/>
                    <input placeholder='PRICE' type='text' name='PRICE'/>
                    <input placeholder='COUNT' type='text' name='COUNT'/>
                    <input type='text' placeholder='IMG' name='IMG'/>
                    <input value='Сохранить' type='submit'/>
                </form>
            `
        )
    })

}