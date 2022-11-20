//В ноде, можно экспортирова, ИСКЛЮЧИТЕЛЬНО через конструкцию module.exports = (можно экспортировать классы, переменные, функции и тд)
/**
 * Абстрактный класс, для работы с таблицами в БД
 * Список атрибутов:
 * name_table -- Название таблицы, с которой будет работать реализация
 * Список методов:
 * getConnect -- в этом методе мы устанавливаем соединение с БД и обязательно возвращаем его.
 * getAll -- обращается к таблице и возвращает из нее все поля и все строки
 * get -- обращается к таблице и возвращает определенный элемент из таблицы, работает засчет парамаетра id, который мы передаем извне.
 * query -- отправка запроса
 */
const mysql = require("mysql")

module.exports = class WorkerDataBase{
    //Делаем пустые атрибуты, которые будем устанавливать в каждой реализации
    response 
    request
    name_table
    //Закрыли атрибут конфиг приватным уровнем доступа, для невозмоджности его изменения
    #config = {
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
    query(sql){
        this.getConnect().query(
            sql,
            (error, result) => {
                if(error){
                    //Выводим ошибку
                    this.response.send(
                        error
                    )
                //если ошибки нет
                }else{
                    //отправляем результат запроса на экран
                    this.response.send(
                        //Предварительно, через метод JSON.stringify, преобразуем объект в строку JSON
                        JSON.stringify(result)
                    )
                }
            }
        )
    }
    getConnect(){
         return mysql.createPool(this.#config)
    }
    getAll(){
        //Абстрактный запрос к базе данных
        const sql = `SELECT * FROM ${this.name_table}`
        this.query(sql)
    }
    get(id){
        //Абстрактный запрос к базе данных
        const sql = `SELECT * FROM ${this.name_table} WHERE ID='${id}'`;
        this.query(sql)
    }
    add(data){
         let sql = `INSERT INTO ${this.name_table} `
         //Сгенерировать запрос для добавления пользователей в БД
         //const sql = 'INSERT INTO `users` (`ID`, `NAME`, `SURNAME`, `IMG`, `EMAIL`, `PHONE`, `LOGIN`, `PASSWORD`, `ROLE` ) VALUES ("'+ id +'", "'+ name +'", "'+ surname +'", "'+ img +'", "'+ email +'", "' + phone + '", "' + login + '", "' + password + '", "' + role + '")';
         //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
         //С помощью одного цикла собрать 2 части запроса.
         //Проинициализируем 2 переменных, которые будут содержать две части.
         let partFields = "(";
         let partValue = "(";

         //Количество полей внутри даты
         const keysForData = Object.keys(data)
         const length = keysForData.length
         //В цикле наща задача собрать части запроса через конкатенацию.
         let i = 0;
         for(const field in data){
             console.log('Название поля:', field)
             console.log('Значение поля:', data[field])
             partFields += "`" + field + "`";
             partValue += "'" + data[field] + "'";
             if(length - 1 !== i ){
                partFields += `, `;
                partValue += `, `;
             }
             //Создаем счетчик итераций в for in.
             i++;
             console.log('Счетчик итераций', i)
         } 

         //После цикла нужно закрыть скобку
         partFields += ")";
         partValue += ")";

        sql += partFields + ' VALUES ' + partValue;
        console.log(sql)
        this.query(
            sql
        )
    }
    update(data) {
        //Делаем первую часть для апдейт-запроса.
        let sql = `UPDATE ${this.name_table} SET `
        //Получить массив с ключами объекта.
        let entries = Object.entries(data)
        //Получаем длину массива, чтобы далее сгенерировать запрос автоматически.
        let length = Object.entries(data).length
        //Вводим счетчик для дальнейшего контроля генерации полей цикла for of
        let count = 0
        //Часть для запроса с запятой и пробелом, добавляем эту часть, когда элемент не последний
        let coma = ', '
        //Цикл for of, в нем перебираются все поля и с помощью конкатенации собирается sql запрос.
        for (let element of entries) {
            //Условие для того, чтобы поле ID не добавлялось в запрос автоматически.
            //Потому что ID уникален для строки и по нему мы обновляем данные в БД
            if (element[0] != 'ID') {
                //Формируем строку для запроса
                sql += '`'+element[0]+'`'+"="+'"'+element[1]+'"'
                //Если элемент не последний, тогда добавляем запятую с пробелом.
                if (length - 1 !== count) {
                    sql += coma
                }
            }
            //Обновляем счетчик для того, чтобы поймать условие, когда элемент последний, и не поставить после него запятую.
            count++
        }
        //Добавляем строку с условием WHERE по полю ID
        sql += ` WHERE ID='${data.ID}'`
        //Отправляем sql запрос.
        //this.response.send(sql)
        this.query(sql)
    }
}