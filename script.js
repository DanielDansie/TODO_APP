document.querySelector('#createBtn').onclick = function(){
    if(document.querySelector('#toDoListStart input').value.length == 0){
        alert("You Must Enter Task Name To Add.")
    }

    else{
        document.querySelector('.list-group').innerHTML += `
            <li class="list-group-item" id="${document.querySelector('#toDoListNameInput').value}>
                <h3 id="taskname">
                    ${document.querySelector('#toDoListNameInput').value}
                </h3>
                <button class="edit">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="delete">
                    <i class="bi bi-trash"></i>
                </button>
            </li>`;

            document.querySelector('#toDoList').innerHTML += `
            <div class="task">
                <h3 id="taskname">
                    ${document.querySelector('#toDoListNameInput').value}
                </h3>
            </div>
            <div class="listItems">
                <ul class="list-group list-group-flush">
                    <input id="toDoListItem" placeholder="Input To Do List Steps">
                    <button id="addItem">Add to do Item</button>
                </ul>
            </div>`;

        let editList = document.querySelectorAll(".edit");
        for(var i=0; i<editList.length; i++) {
            editList[i].onclick = function() {
                this.parentNode.editList
            }
        }

        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }
    }
}


// document.querySelectorAll(".edit").addEventListener('click', (e) => {
//     if (e.target.className !== 'edit') return
//     e.target.previousSibling.setAttribute('contenteditable', 'true');
//     e.target.previousSibling.focus();
// });