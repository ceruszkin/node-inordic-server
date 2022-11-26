//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')

const WorkerForMail = require('../../services/worker-for-mail/index.js')

module.exports = (app) => {
    app.post("/mail/send/", fileFromForm, function(req, res){
        const messageToManager = req.body.TEXT;
        console.log('WorkerForMail', WorkerForMail)
        const workerForMail = new WorkerForMail(res, req)

        workerForMail.sendMail(messageToManager)
       
    })
   
    app.get("/mail/form", function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - /mail/send
                </h1>
                <form enctype="multipart/form-data" action='/mail/send' method='post'>
                    <input placeholder='TEXT' type='text' name='TEXT'/>
                    <input value='Отправить письмо' type='submit'/>
                </form>
            `
        )
    })
}