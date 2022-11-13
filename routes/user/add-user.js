//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')
const uuid = require("uuid")

module.exports = (app, connect) => {

    /**
     * Маршрут для добавления оного пользователя:
     * Автор: Румянцев Александр
     * Описание: Возвращает JSON с полями, которые описывают успешное добавление пользователя в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     */
     app.post('/add_user', fileFromForm, function(req, res){

        //Получим данные с формы
        const id = uuid.v4();
        const name = req.body.NAME;
        const surname = req.body.SURNAME;
        const email = req.body.EMAIL;
        const img = req.body.IMG;
        const phone = req.body.PHONE;
        const login = req.body.LOGIN;
        const password = req.body.PASSWORD;
        const role = req.body.ROLE;

        //Сгенерировать запрос для добавления пользователей в БД
        const sql = 'INSERT INTO `users` (`ID`, `NAME`, `SURNAME`, `IMG`, `EMAIL`, `PHONE`, `LOGIN`, `PASSWORD`, `ROLE` ) VALUES ("'+ id +'", "'+ name +'", "'+ surname +'", "'+ img +'", "'+ email +'", "' + phone + '", "' + login + '", "' + password + '", "' + role + '")';
        
        //Стандартная конструкция для отправки запроса в базу
        connect.query(sql, (err, result) => {
            //добавляем сообщение, при успешном взаимодействии с БД
            result.message = 'Пользователь успешно добавлен в БД'
            err ? res.send(err) : res.send(JSON.stringify(result))
        })



     })

    /**
     * Вспомогательный маршрут для добавления пользователя в БД
     * Автор: Румянцев Александр
     * Описание: Выводить форму на интерфейс для добавления пользователя 
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом: 
     * Ввести в адресную строку - http://localhost:3000/form_add_user
     */
     app.get('/form_add_user', function(req, res){
        res.send(
            `
                <h1>
                    Тестовая форма, для маршрута - add_user
                </h1>
                <form enctype="multipart/form-data" action='/add_user' method='post'>
                    <input placeholder='NAME' type='text' name='NAME'/>
                    <input placeholder='SURNAME' type='text' name='SURNAME'/>
                    <input placeholder='IMG' type='text' name='IMG'/>
                    <input placeholder='EMAIL' type='text' name='EMAIL'/>
                    <input placeholder='PHONE' type='text' name='PHONE'/>
                    <input placeholder='LOGIN' type='text' name='LOGIN'/>
                    <input placeholder='PASSWORD' type='text' name='PASSWORD'/>
                    <input placeholder='ROLE' type='text' name='ROLE'/>
                    <input value='Сохранить' type='submit'/>
                </form>
            `
        )
    })
}