const form = document.querySelector('#addForm')
const itemsList = document.querySelector('#items')
const filter = document.querySelector('#filter')
const newItemInput = document.querySelector('#newItemText')

// 1. Добавить новую задачу
form.addEventListener('submit', addItem)
// 2. Удаление задачи из списка
itemsList.addEventListener('click', removeItem)
// 3. Фильтрация по задачам
filter.addEventListener('keyup', filterItems)

// Создаем новую запись
function createItem(item){
    // Создаем элемент для новой задачи
    let newElement = document.createElement('li')
    newElement.className = 'list-group-item'

    // Добавляем текст в новый элемент
    let newTextNode = document.createTextNode(item)
    newElement.appendChild(newTextNode)

    // Создаем кнопку
    const deleteBtn = document.createElement('button')
    deleteBtn.appendChild(document.createTextNode('Удалить'))
    deleteBtn.className = 'btn btn-light btn-sm float-right'
    deleteBtn.dataset.action = 'delete'

    // Помещаем кнопку в тег li
    newElement.appendChild(deleteBtn)

    // Добавляем новую задачу в список
    itemsList.prepend(newElement)

    // Очистить поле ввода новой задачи
    newItemInput.value = ''

    // Записываем в LocalStorage
    updateStorage()
}

// Добавляем новую запись на страницу
function addItem(e){
    // Отменяем отправку формы
    e.preventDefault()
    // Проверяем поле ввода на пустое значение
    if (newItemInput.value != '') {
        createItem(newItemInput.value)
    }
}

function removeItem(e){
    if (e.target.getAttribute('data-action') == 'delete') {
        if (confirm('Удалить задачу?')) {
            e.target.parentNode.remove()
            // обновляем хранилище
            updateStorage()
        }
    }
}

function filterItems(e){
    // Получаем фразу поиска и переводим ее в нижний регистр
    let searchedText = e.target.value.toLowerCase()

    // Получаем список всех задач
    let items = itemsList.querySelectorAll('li')
    // Перебираем циклом все найденные li
    items.forEach(function(item){
        // Получаем текст списка и переводим его в нижний регистр
        let itemText = item.firstChild.textContent.toLowerCase()
        // Проверяем вхождение искомой подстроки в текст задачи
        if (itemText.includes(searchedText)) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })
}

// Добавление данных в LocalStorage
function updateStorage() {
    let tasksList = document.querySelectorAll('.list-group-item')
    let items = []

    for (let i=0; i < tasksList.length; i++) {
        items.unshift(tasksList[i].firstChild.textContent)
    }

    localStorage.setItem('tasksList', JSON.stringify(items))
}

// Чтение данных из LocalStorage
function getStorage() {
    items = JSON.parse(localStorage.getItem('tasksList')) || []
    items.forEach(item => createItem(item))
}
// Запускаем чтение данных из LocalStorage при загрузке страницы
getStorage()
