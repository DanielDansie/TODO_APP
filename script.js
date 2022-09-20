document.querySelector('#createBtn').onclick = function(){
    if(document.querySelector('#toDoListStart input').value.length == 0){
        alert("You Must Enter Task Name To Add.")
    }

    else{
        document.querySelector('#toDoList').innerHTML += `
            <div class="task">
                <button class="edit">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <span id="taskname">
                    ${document.querySelector('#toDoListNameInput').value}
                </span>
                <button class="delete">
                    <i class="bi bi-trash"></i>
                </button>
            </div>`;

        let editList = document.querySelector(".edit");
        for(var i=0; i<editList.length; i++) {
            editList[i].onclick = function() {
                
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

