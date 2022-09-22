let toDoItemNames = [];

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    toDoItemNames.push(todo);
    renderTodo(todo)
}

const createList = document.querySelector('.toDoListInput');

createList.addEventListener('submit', event => {
    event.preventDefault();

    const input = document.querySelector('.toDoListNameInput');

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
})

function renderTodo(todo) {
    const list = document.querySelector('.list-group-flush');

    const isChecked = todo.checked ? 'done': '';

    const node = document.createElement("li");

    node.setAttribute('class', `todo-item ${isChecked}`);

    node.setAttribute('data-key', todo.id);

    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
        <i class="bi bi-trash"></i>
    </button>
    `;

    list.append(node);
}

function renderTodoList(todo) {
    const listTD = document.querySelector('#toDoList');

    const TDnode = document.createElement("div");

    nodeTD.setAttribute('class', `todo-item`);

    nodeTD.setAttribute('data-key', todo.id);

    nodeTD.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <div class="listItems">
            <ul class="list-group">
                <input class="toDoListItem" placeholder="Add To Do List Steps">
                <button class="addItem">Add Step</button>
            </ul>
        </div>
    `;

    listTD.append(nodeTD);
}