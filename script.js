const { Button } = require("bootstrap")

const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTaskButton = document.querySelector('[data-clear-complete-tasks-button]')

const local_storage_list_key = 'task.lists'
const local_storage_list_id_key = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(local_storage_list_key)) || []
let selectedListId = localStorage.getItem(local_storage_list_id_key)

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.id
        console.log("listsContainer: " + selectedListId)
        saveAndRender()
    }
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId)
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedList)
    }
})

clearCompleteTaskButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
})

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
})

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName === '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(task)
    saveAndRender()
})

function createList(name) {
    return {id: Date.now().toString(), name: name, tasks: [] }
}

function createTask(name) {
    return {id: Date.now().toString(), name: name, complete: false }
}

function saveAndRender() {
    save()
    console.log("saveAndRender: " + selectedListId)
    render()
}

function save() {
    localStorage.setItem(local_storage_list_key, JSON.stringify(lists))
    localStorage.setItem(local_storage_list_id_key, selectedListId)
}

function render() {
    clearElement(listsContainer)
    renderLists()
    console.log(lists)
    const selectedList = lists.find(list => list.id === selectedListId)
    console.log("render: " + selectedListId)
    console.log(selectedList)
    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none'
    } else {
        listDisplayContainer.style.display = ''
        listTitleElement.innerText = selectedList.name
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
}

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedList) {
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length
    const taskString = incompleteTasksCount === 1 ? "task" : "tasks"
    listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`
}

function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.id = list.id
        listElement.classList.add('list-name')
        listElement.innerText = list.name
        if (list.id === selectedListId) {
            listElement.classList.add('active-list')
        }
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

document.addEventListener('DOMContentLoaded', render())