//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')
const uuid = require("uuid")

module.exports = (app, connect) => {
    /**
     * Маршрут для добавления оного товара:
     * Автор: Румянцев Александр
     * Описание: Возвращает JSON с полями, которые описывают успешное добавление товара в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     */
    app.post('/add_item', fileFromForm, function(req, res){
        //Тут не можем чистать данных с формы без дополнительных плагинов
        //Установил плагин multer, для чтения формы и передачи файлов
        //Получим данные с формы
        const id = uuid.v4();
        const title = req.body.TITLE;
        const discr = req.body.DISCR;
        const price = req.body.PRICE;
        const img = req.body.IMG;
        const count = req.body.COUNT;
        
        //Сгенерировать запрос для добавления товара в БД
        //INSERT - добавление в БД
        const sql = 'INSERT INTO `goods` (`ID`, `TITLE`, `DISCR`, `PRICE`, `IMG`, `COUNT`) VALUES ("'+ id +'", "'+ title +'", "'+ discr +'", "'+ price +'", "'+ img +'", "'+ count +'")';
  
        //Стандартная конструкция для отправки запроса в базу
        connect.query(sql, (err, result) => {
            err ? res.send(err) : res.send(JSON.stringify(result))
        })
    })

    /**
     * Вспомогательный маршрут для добавления товара в БД
     * Автор: Румянцев Александр
     * Описание: Выводить форму на интерфейс для добавления товара 
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом: 
     * Ввести в адресную строку - http://localhost:3000/form_add_item
     */
    app.get('/form_add_item', function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - add_item
                </h1>
                <form enctype="multipart/form-data"  action='/add_item' method='post'>
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