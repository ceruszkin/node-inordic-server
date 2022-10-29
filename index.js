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

/**
 * План для построения интернет магазина (что нужно добавить)
 * 
 * Базовые запросы для интерфейса магазина:
 * - Получение данных пользователя по его логину и паролю (использовать POST  запрос)
 * - Получение данных о всех товарах (использовать GET запрос)
 * - Получение данных об одном товаре (Использовать GET запрос)
 * Базовые запросы для интерфейса админки магазина:
 * - Удаление товара
 * - Добавление товара
 * - Редактирование товара
 * - Выводить список пользователей
 * - Удалять пользователя
 * - Редактировать пользователя
 * Дополнительно таблица истории купленных товаров
 * - Выводить историю
 * 
 * Сделать формы на безовом маршруте, для теста пост запросов
 * 
 * ДЗ 28 урок
 * Прописать все базовые (указанные выше) маршруты
 */

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


//Маршрут для проверки поключения к базе данных
app.get(
    '/connect',
    function(request, response){

        console.log(connect);

        response.send(
            'Тестируем подключение к БД'
        )


    }
)



/**
 * Маршрут для получения всех товаров:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON со спском всех товаров
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/get_all_good
 */
app.get('/get_all_good', function(request, response){
    
    //Составим запрос для базы данных
    // SELECT - выборка (получить), ключевое слово
    // * - обозначение всех полей в базе
    // FROM - ключевое слово, означает откуда
    // goods - название таблицы в базе данных
    const sql = 'SELECT * FROM goods'

    //Отправить запрос на серве
    // для отправки запроса используем функцю query, передаем первым параметром запрос, а вторым 
    connect.query(
        sql,
        (error, result) => {
            //Если есть ошибка, выведем ее
            if(error){
                //Выводим ошибку
                response.send(
                    error
                )
            //если ошибки нет
            }else{
                //отправляем результат запроса на экран
                response.send(
                    //Предварительно, через метод JSON.stringify, преобразуем объект в строку JSON
                    JSON.stringify(result)
                )
            }
        }
    )
})



/**
 * Маршрут для получения оного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с одним товаром 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/get_item?id=1
 */
app.get('/get_item', function(req, res){
    //Получаем поле id из объекта request
    const {id} = req.query
    //Сформировать запрос на получение одного товара
    //Запрос отличается от предедущего, только конструкцией WHERE ID = id
    //Где
    // WHERE - дословно переводиться как слово - ГДЕ
    //Далее идет условие поле в БД ID равно id(переменная, полученная выше)
    const sql = `SELECT * FROM goods WHERE ID=${id}`;
    //Отправляем запрос
    connect.query(sql, (err, result) => {
        err ? res.send(err) : res.send(JSON.stringify(result))
    })
})



/**
 * Маршрут для удаления оного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с полями, которые описывают успешное удаление товара из БД 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/del_item?id=1
 */
 app.get('/del_item', function(req, res){
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

/**
 * Маршрут для добавления оного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с полями, которые описывают успешное добавление товара в БД 
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 */
app.post('/add_item', function(req, res){
    //Тут не можем чистать данных с формы без дополнительных плагинов
    console.log(req)
    console.log(req)
    res.send('Заглушка для добавления товара')
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
            <form action='/add_item' method='post'>
                <input type='text' name='ID'/>
                <input type='text' name='TITLE'/>
                <input type='text' name='DISCR'/>
                <input type='text' name='PRICE'/>
                <input type='text' name='COUNT'/>
                <input type='text' name='IMG'/>
                <input value='Сохранить' type='submit'/>
            </form>
        `
    )
})


/**
 * Маршрут дляредактирования оного товара:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с полями, которые описывают успешное редактирования товара в БД 
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 */
 app.post('/edit_item', function(req, res){
    //Тут не можем чистать данных с формы без дополнительных плагинов
    console.log(req)
    console.log(req)
    res.send('Заглушка для редактирования товара')
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
            <form action='/edit_item' method='post'>
                <input type='text' name='ID'/>
                <input type='text' name='TITLE'/>
                <input type='text' name='DISCR'/>
                <input type='text' name='PRICE'/>
                <input type='text' name='COUNT'/>
                <input type='text' name='IMG'/>
                <input value='Сохранить' type='submit'/>
            </form>
        `
    )
})

//Начинаем прослушивать определенный порт
app.listen(3000);