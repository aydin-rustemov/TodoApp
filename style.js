const newTask = document.querySelector('.input-task')
const newTaskAddBtn = document.querySelector('.btn-task-add')
const taskList = document.querySelector('.task-list')

newTaskAddBtn.addEventListener('click', taskAdd)
taskList.addEventListener('click', taskDeleteCheck)
document.addEventListener('DOMContentLoaded', localStorageRead)

function taskDeleteCheck(e) {
    const clickedTag = e.target
    if (clickedTag.classList.contains('task-btn-completed')) {
        clickedTag.parentElement.classList.toggle('task-completed')
    }
    if (clickedTag.classList.contains('task-btn-delete')) {
        if (confirm('Əminsiniz?')) {
            clickedTag.parentElement.classList.toggle('get-lost')
            const deletedTask = clickedTag.parentElement.children[0].innerHTML
            localStorageDelete(deletedTask)

            clickedTag.parentElement.addEventListener('transitionend', function () {
                clickedTag.parentElement.remove()
            })
        }
    }
}

function taskAdd(e) {
    e.preventDefault()
    if (newTask.value.length > 0) {
        taskItemAdd(newTask.value)
        //LOCALSTORAGE
        savedLocalStorage(newTask.value)
        newTask.value = ''
    }
    else {
        alert('Boş Əlavə Etmək Olmaz!')
    }


}
function localStorageArrayConverts() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    return tasks
}
function savedLocalStorage(newTask) {
    let tasks = localStorageArrayConverts()
    tasks.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function localStorageRead() {
    let tasks = localStorageArrayConverts()

    tasks.forEach(function (task) {
        taskItemAdd(task);
    })
}
function taskItemAdd(task) {
    // create div
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task-item')
    //create li
    const taskLi = document.createElement('li')
    taskLi.classList.add('task-description')
    taskLi.innerText = task;
    taskDiv.appendChild(taskLi)
    //Check button add
    const taskCheckBtn = document.createElement('button')
    taskCheckBtn.classList.add('task-btn')
    taskCheckBtn.classList.add('task-btn-completed')
    taskCheckBtn.innerHTML = '<i class="far fa-check-square"></i>'
    taskDiv.appendChild(taskCheckBtn)
    // ------------------------------------------------------------
    const taskDeleteBtn = document.createElement('button')
    taskDeleteBtn.classList.add('task-btn')
    taskDeleteBtn.classList.add('task-btn-delete')
    taskDeleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>'
    taskDiv.appendChild(taskDeleteBtn)

    // Ul Div
    taskList.appendChild(taskDiv)
}
function localStorageDelete(task) {
    let tasks = localStorageArrayConverts()
    //delete array item
    const deleteTagIndex = tasks.indexOf(task)
    tasks.splice(deleteTagIndex, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))

}