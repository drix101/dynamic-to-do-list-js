// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to store tasks
    let tasks = [];

    // Load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            tasks.forEach(taskText => {
                createTaskElement(taskText);
            });
        }
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create task DOM element
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.onclick = () => {
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
            taskList.removeChild(li);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    // Function to add a new task
    function addTask() {
        // Get and trim the task text
        const taskText = taskInput.value.trim();

        // Validate task text
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Add task to array and localStorage
        tasks.push(taskText);
        saveTasks();

        // Create and add task element
        createTaskElement(taskText);

        // Clear input field
        taskInput.value = '';

        // Focus back on input field for better UX
        taskInput.focus();
    }

    // Add click event listener to add button
    addButton.addEventListener('click', addTask);

    // Add keypress event listener to input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when page loads
    loadTasks();
});