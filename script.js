const listItems = [];

function showTodo(todo) {
    localStorage.setItem('listItems', JSON.stringify(listItems))

    const list = document.querySelector('.list-group-flush');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        if (listItems.length === 0) list.innerHTML = '';
        return
    }

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

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    listItems.push(todo);
    showTodo(todo)
}

function toggleDone(key) {
    const index = listItems.findIndex(item => item.id === Number(key));
    listItems[index].checked = !listItems[index].checked;
  
    showTodo(listItems[index])
    localStorage.setItem('listItems', JSON.stringify(listItems));
  }
  
function deleteTodo(key) {
    const index = listItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...listItems[index]
    }
    todo.deleted = true
    listItems = listItems.filter(item => item.id !== Number(key));
    showTodo(todo);
}

const form = document.querySelector('.ListItems');
form.addEventListener('submit', event => {
    event.preventDefault();

    const input = document.querySelector('.ListItemInput');

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
})

const list = document.querySelector('.list-group-flush');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
  }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('listItems');
    if (ref) {
        listItems = JSON.parse(ref);
        listItems.forEach(t => {
            showTodo(t);
        });
    }
});