# statemanager
Простой State менеджер для React'а

## Установка:
Установите пакет `npm i lite-react-statemanager`

## Использование:
Подключите в любом модуле
```javascript
import StateManager from "statemanager";
```

### Далее для классов React происходит установка глобальных стейтов:
Можете изменять состояние глобального стейта (state) двумя способами, которые между собой идентичные.

```javascript
this.setState({ numberClick : value });
StateManager.setState( { numberClick : value });
```
или
```javascript
StateManager.setState( { numberClick : value }, this);
```
Второй параметр `this`, говорит функции изменить состояние в текущем классе

### Подписка на изменение глобального стейта

Рекомендуем подписываться в `componentDidMount` это позволит единожды оформить подписку. 

Если реализовать подписку иначе, то она будет работать, но подписка может перезаписываться несколько раз.

Примеры подписок на изменение глобального стейта.

#### С передачей самого объекта
```javascript
componentDidMount() {
    StateManager.subscribeState({ numberClick: { Comp2: this }});
}
```
#### С передачей ссылки на функцию
```javascript
changeStates = (state) => {
    this.setState({color: !this.state.color});
}

componentDidMount() {
    StateManager.subscribeState({ numberClick: { Comp3: this.changeStates }} );
}
```



В функцию `subscribeState` передается следующая структура объекта:
```javascript
{
    ИмяГлобальнойПодписки: {
        ИмяСамойПодписки: СсылкаНаФункциюДляПодписки
    }
}
```

`ИмяГлобальнойПодписки` - Так как она определяется в StateManager.setState

`ИмяСамойПодписки` - некий идентификатор, который позволит отписаться от события в дальнейшем или перезаписать его

`СсылкаНаФункциюДляПодписки` - ссылка на функцию у которой есть один параметр (state), в которую будет передано новое состояние стейта. Либо сам объект this, если требуется использовать стандартную функцию изменения состояния setState React'а. 


### Отписка от изменений глобального стейта
Функция `unsubscribeState` - позволяет вам отписаться от подписки на изменения глобального стейта, если по каким-то условиям вам больше не требуется подписка на данное событие.
```javascript
StateManager.unsubscribeState({ numberClick: ["Comp4"]});
```

В функцию `unsubscribeState` передается следующая структура объекта:
```javascript
{
    ИмяГлобальнойПодписки: [ ИмяСамойПодписки_1, ИмяСамойПодписки_2, ... ИмяСамойПодписки_N]
}
```
`ИмяГлобальнойПодписки` - Так как она определяется в StateManager.setState

`ИмяСамойПодписки_N` - массив с наименованиями подписок как они были указаны в функции `subscribeState`

Примеры использования можно увидеть в папке Demo текущего компонента