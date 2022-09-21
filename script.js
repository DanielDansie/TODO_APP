let toDoItemNames = [];

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    toDoItemNames.push(todo);
    console.log(toDoItemNames)
}

const createList = document.querySelector('.toDoListInput');

createList.addEventListener('submit', Event => {
    // Event.preventDefault();

    const input = document.querySelector('#toDoListNameInput');

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
})