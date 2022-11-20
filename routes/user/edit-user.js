//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')
const uuid = require("uuid")

const WorkerTableUser = require('../../services/worker-tables/users')

module.exports = (app, connect) => {

    /**
     * Маршрут для добавления оного пользователя:
     * Автор: Румянцев Александр
     * Описание: Возвращает JSON с полями, которые описывают успешное добавление пользователя в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     */
     app.post('/users/edit', fileFromForm, function(req, res){

        //Получим данные с формы
        const data = {
            'ID': req.body.ID,
            'NAME': req.body.NAME,
            'SURNAME': req.body.SURNAME,
            'EMAIL': req.body.EMAIL,
            'IMG': req.body.IMG,
            'PHONE': req.body.PHONE,
            'LOGIN': req.body.LOGIN,
            'PASSWORD': req.body.PASSWORD,
            'ROLE': req.body.ROLE,
        }

        const workerTableUser = new WorkerTableUser(res, req)
        //
        workerTableUser.update(data);
    })

app.get('/form_edit_user', function(req, res){
    res.send(
        `
            <h1>
            Тестовая форма, для маршрута - edit_user
            </h1>
            <form enctype="multipart/form-data" action='/users/edit' method='post'>
                    <input placeholder='ID' type='text' name="ID" />
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