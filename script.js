// Function 1: Creates the list item (li) element and attaches event listeners
function createTaskElement(taskText, isCompleted) {
    const listItem = document.createElement('li');
    
    // Add 'completed' class if the task is already finished
    if (isCompleted) {
        listItem.classList.add('completed');
    }

    listItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    // A. Toggle Completion: Click on the task text
    listItem.querySelector('span').addEventListener('click', function() {
        listItem.classList.toggle('completed');
        saveTasks(); // Save changes after completion status is toggled
    });

    // B. Delete Task: Click on the 'Delete' button
    listItem.querySelector('.delete-btn').addEventListener('click', function() {
        listItem.remove();
        saveTasks(); // Save changes after task is deleted
    });

    return listItem;
}

// ------------------------------------------------------------------

// Function 2: Saves the current state of the task list to Local Storage
function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    // Loop through all <li> items and gather their data
    taskList.querySelectorAll('li').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });

    // Convert JavaScript array to a JSON string and save it
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ------------------------------------------------------------------

// Function 3: Loads tasks from Local Storage when the page first opens
function loadTasks() {
    // Get the saved tasks (it's a JSON string)
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        // Convert the JSON string back into a JavaScript array
        const tasks = JSON.parse(savedTasks); 
        const taskList = document.getElementById('taskList');

        // Create and append each saved task element
        tasks.forEach(task => {
            const listItem = createTaskElement(task.text, task.completed);
            taskList.appendChild(listItem);
        });
    }
}

// ------------------------------------------------------------------

// Function 4: Adds a new task when the 'Add Task' button is clicked
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create the new list item
    const newTask = createTaskElement(taskText, false); 
    
    document.getElementById('taskList').appendChild(newTask);

    // Clear input field
    taskInput.value = "";
    
    // Save the updated list after adding the new task
    saveTasks();
}

//  Initial call: Executes immediately when the script loads to show saved data
loadTasks();