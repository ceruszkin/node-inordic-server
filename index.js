//Документация NODE
//https://nodejs.org/dist/latest-v16.x/docs/api/synopsis.html#example

//Импортируем плагины
const express = require("express");
const mysql = require("mysql")

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
                </ul>
            `
        )
    }
)

//Распределяем роутеры по файлам
require('./routes/get-all-good.js')(app, connect)
require('./routes/get-item.js')(app, connect)
require('./routes/del-item.js')(app, connect)
require('./routes/add-item.js')(app, connect)
require('./routes/edit-item.js')(app, connect)

//Начинаем прослушивать определенный порт
app.listen(3000);