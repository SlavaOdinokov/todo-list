var form = document.querySelector('#addForm')
var itemsList = document.querySelector('#items')
var filter = document.querySelector('#filter')

// 1. Добавить новую задачу
form.addEventListener('submit', addItem)
// 2. Удаление задачи из списка
itemsList.addEventListener('click', removeItem)
// 3. Фильтрация по задачам
filter.addEventListener('keyup', filterItems)

function addItem(e){
    // Отменяем отправку формы
    e.preventDefault()
    
    // Находим инпут с текстом для новой задачи
    var newItemInput = document.querySelector('#newItemText')
    var newItemText = newItemInput.value

    // Создаем элемент для новой задачи
    var newElement = document.createElement('li')
    newElement.className = 'list-group-item'

    // Добавляем текст в новый элемент
    var newTextNode = document.createTextNode(newItemText)
    newElement.appendChild(newTextNode)

    // Создаем кнопку
    var deleteBtn = document.createElement('button')
    deleteBtn.appendChild(document.createTextNode('Удалить'))
    deleteBtn.className = 'btn btn-light btn-sm float-right'
    deleteBtn.dataset.action = 'delete'

    // Помещаем кнопку в тег li
    newElement.appendChild(deleteBtn)

    // Добавляем новую задачу в список
    itemsList.prepend(newElement)

    // Очистить поле ввода новой задачи
    newItemInput.value = ''
}

function removeItem(e){
    if (
        e.target.hasAttribute('data-action') && 
        e.target.getAttribute('data-action') == 'delete'
    ) {
        if (confirm('Удалить задачу?')) {
            e.target.parentNode.remove()
        }
    }
}

function filterItems(e){
    // Получаем фразу поиска и переводим ее в нижний регистр
    var searchedText = e.target.value.toLowerCase()

    // Получаем список всех задач
    var items = itemsList.querySelectorAll('li')
    // Перебираем циклом все найденные li
    items.forEach(function(item){
        // Получаем текст списка и переводим его в нижний регистр
        var itemText = item.firstChild.textContent.toLowerCase()
        // Проверяем вхождение искомой подстроки в текст задачи
        if (itemText.includes(searchedText)) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })
}
