//Документация NODE
//https://nodejs.org/dist/latest-v16.x/docs/api/synopsis.html#example

//Импортируем плагины
const express = require("express");
const fs = require('fs')
const mysql = require("mysql")
const WorkerFiles = require("./services/worker-files/index.js")

//создадим подключение к базе данных
// 1 - Создадим функцию-конфигурацию для подключения
function config () {
    return {
      host: "94.228.126.172",
      port: 3306,
      user: "inordic_sch_usr",
      password: "VANCfzNsov9GDt1M",
      database: "inordic_school",
      connectionLimit : 1000,
      connectTimeout  : 60 * 60 * 1000,
      acquireTimeout  : 60 * 60 * 1000,
      timeout         : 60 * 60 * 1000
    }
}
// 2 - Создадим подключение
const connect = mysql.createPool(config())
//Инициализируем приложение express
const app = express();


//1 - Корневой маршрут
//Первый базовый маршрут приложения
app.get(
    '/',
    function(request, response){
        //Посылаем ответ от сервера
        ///console.log(request.query.test)
        //Декомпозиция объекта
        const {test, name} = request.query
        response.send(
            `
                <h1>
                    Корневой маршрут / Разводная страница
                </h1>
                <ul> 
                    <li>
                        <a href='/get_all_good'>
                            2 - Маршрут для получения всех товаров
                        </a>
                    </li>
                    <li>
                        <a href='/get_item?id=1'>
                            3 - Маршрут для получения всех товаров
                        </a>
                    </li>
                    <li>
                        <a href='/del_item?id=1'>
                            3 - Маршрут для удаления товара
                        </a>
                    </li>
                    <li>
                        <a href='/form_add_item'>
                            4 - Маршрут для добавления товара
                        </a>
                    </li>
                    <li>
                        <a href='/form_edit_item'>
                            5 - Маршрут для редактирования товара
                        </a>
                    </li>
                    <li>
                        <a href='/form_add_user'>
                            6 - Маршрут для добавления пользователя
                        </a>
                    </li>
                </ul>
            `
        )
    }
)

const NAME_FOLDER_ROUTES = 'routes'
//Распределяем роутеры по файлам
const folderFromRoutes = fs.readdirSync(`./${NAME_FOLDER_ROUTES}`);
folderFromRoutes.map((folderName) => {
    const folderFromInRoutes = fs.readdirSync(`./${NAME_FOLDER_ROUTES}/${folderName}/`)
    folderFromInRoutes.map((fileName) => {
        require(`./${NAME_FOLDER_ROUTES}/${folderName}/${fileName}`)(app)
    })
})
//Роуты для товаров
require('./routes/good/get-all-good.js')(app)
require('./routes/good/get-item.js')(app)
require('./routes/good/del-item.js')(app)
require('./routes/good/add-item.js')(app)
require('./routes/good/edit-item.js')(app)

//Роуты для пользовтелей
require('./routes/user/add-user')(app)
require('./routes/user/get-all-users')(app)
require('./routes/user/get-user')(app)
require('./routes/user/edit-user')(app)

//Роут для отправки писем
require('./routes/mail/index.js')(app)

//Начинаем прослушивать определенный порт
app.listen(3000);