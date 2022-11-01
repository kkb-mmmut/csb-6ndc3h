var tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const remainingCounter = document.getElementById('remaining-tasks-counter');
const doneCounter = document.getElementById('done-tasks-counter');

console.log('Working');
function addTaskToDOM(task){
    const li=document.createElement('li');
    li.innerHTML=`
     
        <input type="checkbox" id="${task.id}" ${task.done?'checked':''} class="custom-checkbox">
        <label for="${task.id}"  style="color:${task.done?'red':'green'}">${task.text}</label>
        <image src="delete.svg" class="delete" data-id="${task.id}"/>
     
    `;
    taskList.append(li);
}
function renderList () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++)
    {
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
    var donecounterall=0;
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].done)
        {
            donecounterall++;
        }
        
    }
    doneCounter.innerHTML=donecounterall;
    remainingCounter.innerHTML=tasks.length - donecounterall;
}

function markTaskAsComplete (taskId) {
    const task=tasks.filter(function(task){
        return task.id===taskId
    });
    if(task.length>0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully !');
        return;
    }
    showNotification('Could not toggle the task !');
}

function deleteTask (taskId) {
    console.log('entered into delete section',taskId);
    const newTasks=tasks.filter(function(task){ 
        return task.id !== taskId;
    })
    tasks=newTasks;
    renderList();
    showNotification('Task deleted successfully!');
}

function addTask (task) {
    if(task){
        tasks.push(task);
            renderList();
            showNotification('Task added successfully !');
        return;
    }
    showNotification('Task not added successfully !');
}

function showNotification(text) {
    console.log(text);
}

function handleInputKeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;
        if(!text){
            showNotification('Task text can not be empty!');
            return;
        }
        const task={
            text,
            id:Date.now().toString(),
            done:false
        }
        e.target.value='';
        addTask(task);
    }
}
function handleClickListener(e){
    const target=e.target;
    console.log(target);
    if(target.className=='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    } 
    else if(target.className=='custom-checkbox')
    {
        const taskId= target.id;
        markTaskAsComplete(taskId);
        return;
    }
}
addTaskInput.addEventListener('keyup',handleInputKeypress);
document.addEventListener('click',handleClickListener);