//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')

const nodemailer = require('nodemailer')

module.exports = (app) => {
    app.post("/mail/send/", fileFromForm, function(req, res){
        const messageToManager = req.body.TEXT

        let transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: 465,
            auth: {
                user: "inordic2022",
                pass: "inordic"
            }
        });

        let mailOptions = {
            from: "'inordic2022' <inordic2022@yandex.ru",
            to: "r-sasha@list.ru",
            subject: "Письмо от магазина iNordicShop",
            html: messageToManager
        };

        transporter.sendMail(mailOptions, (error,info)=> {
            if (error){
                res.send(error);
            }
            res.send('Message %s sent: %s', info.messageId, info.response)
        })
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