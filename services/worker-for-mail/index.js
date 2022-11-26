/*
* Класс WorkerForMail -- отправляет почтовое сообщение
* Атрибуты
* configuration -- защищещнный атрибут для авторизации в почте через некого абстрактного робота.
*/

module.exports = class WorkerForMail{
    #nodemailer = require("nodemailer")
    #transport

    response
    request
    #configuration = {
        host: 'smtp.yandex.ru',
            port: 465,
            secure: 465,
            auth: {
                user: "inordic2022",
                pass: "inordic"
            }
    }

    #mailOptions = {
        from: "'inordic2022' <inordic2022@yandex.ru",
        to: "r-sasha@list.ru",
        subject: "Письмо от магазина iNordicShop",
        html: ""
    };

    #createTransporter(){
        return this.#nodemailer.createTransport(
            this.#configuration
        )
    };

    sendMail(text){
        this.#mailOptions.html = text
        this.#transport.sendMail(this.#mailOptions, (error,info)=> {
            if (error){
                this.response.send(error);
            }
            this.response.send('Message %s sent: %s', info.messageId, info.response)
        })
    }
    constructor(res, req){
        this.#transport = this.#createTransporter()
        this.response = res
        this.request = req
    }
}