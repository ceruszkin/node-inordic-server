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

//Описание класса
class FirstClassAero{
    name = 'Самолет из королевской авиации'
    static staticProperty = 'Статический атрибут класса';
    goFly(){
        console.log("Задействован метод test из класса FirstClass")
        console.log("Самолет полетел")
        console.log("Название самолета:" + this.name)
    }
    constructor(param){
        console.log('Объект создался');
        console.log('параметр в конструкторе ' + param);
        this.goFly()
    }
}
//Использование класса

//1 - Создать объект класса
//К статическому атрибуту можно обращаться, без создания объекта
//console.log("Статический атрибут: ", FirstClassAero.staticProperty)
//const myAero = new FirstClassAero('hello OOP')


//Киты ООП

// 1 - Наследование
 class Children extends FirstClassAero{
     #attrChild = 'Приватный атрибут'
     methodChildren(){
        console.log('Приватный атрибут', this.#attrChild)
     }
     //Методы, которые помогают получать приватные атрибуты класса, называют геттерами
     getPrivateAttr(){
        return this.#attrChild
     }
     constructor(){
        //ключевое слово super, нужно обязательно, для того, чтобы получить от родителя методы и атрибуты
        super()
        console.log('Имя родительского класса', this.name)
        this.goFly()
        console.log(this.#attrChild)
     }
 }

 //Инициализируем объект класса и присваеваем его в переменную
 const objChildren = new Children()
 //обращаемся к методу объект, созданный на основе класса класса
 objChildren.methodChildren()
 //Вернем из класса, приватный атрибут и запишем его в переменную
 const privateAttr = objChildren.getPrivateAttr();
 console.log('Приватный атрибут вне класса: ', privateAttr);

 // 2 - Инкапсуляция
 class Children2 extends Children{
    //Защищенные (protected) атрибуты, обозначаются нижним подчеркиванием
    //Можем его перезаписать, но это нарушение договоренности
    _attr = 'Защищенный атрибут'

    getPrivateAttrParent(){
        //Получае внутри дочернего класса, приватный атрибут родительского класса, через его публичный метод getPrivateAttr
        const privateAttrParent = this.getPrivateAttr();
        console.log("Приватный атрибут родителя", privateAttrParent);
        return privateAttrParent
    }

    constructor(){
        super()
        //Тут нельзя использовать приватный атрибут, родительского класса
        //console.log(this.#attrChild)
    }
    
 }

 //Создаем объект класса
 //const children2 = new Children2()
 //const privateAttrParent = children2.getPrivateAttrParent()
 //console.log('Приватный атрибут родителя, вне всех классов', privateAttrParent)


// 3 - Полиморфизм и Абстракция

//Абстрактный класс Animal (не имеет определенной реализации)
class Animal{

     voiceMessege = ''
     name = ''
     
     hello(){
        console.log(`Привет, меня зовут: ${this.name}`)
     }
     voices(){
        console.log(`Голос: ${this.voiceMessege}`)
     }
}

class Dog extends Animal{
    constructor(){
        super()
        this.name = 'Рекс'
        this.voiceMessege = 'гав гав'
    }
}

class Cat extends Animal{
    constructor(){
        super()
        this.name = 'Мурзик'
        this.voiceMessege = 'мяу мяу'
    }
}

/*
const dog = new Dog();
dog.voices()
dog.hello()
const cat = new Cat();
cat.voices()
cat.hello()
*/

//Результат работы класса FirstClassAero
// Объекат myAero с полями goFly
/**
  const myAero = {
     name: 'Самолет из королевской авиации',
     goFly: function(){
        console.log("Задействован метод test из класса FirstClass")
        console.log("Самолет полетел")
     }
  }
 */
//2 - задействуем метод goFly из класса FirstClassAero
//myAero.goFly()




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

//Распределяем роутеры по файлам

//Роуты для товаров
require('./routes/good/get-all-good.js')(app, connect)
require('./routes/good/get-item.js')(app, connect)
require('./routes/good/del-item.js')(app, connect)
require('./routes/good/add-item.js')(app, connect)
require('./routes/good/edit-item.js')(app, connect)

//Роуты для пользовтелей
require('./routes/user/add-user')(app, connect)
require('./routes/user/get-all-users')(app, connect)

//Начинаем прослушивать определенный порт
app.listen(3000);