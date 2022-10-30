module.exports = (app, connect) => {
    /**
     * Маршрут для редактирования оного товара:
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
                <form enctype="multipart/form-data"  action='/edit_item' method='post'>
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

}