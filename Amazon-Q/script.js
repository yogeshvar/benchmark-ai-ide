let todos = [];

/**
 * Loads todos from a JSON file on the server
 * @function loadTodos
 * @description Fetches the todo list data from todos.json and updates the UI
 * @returns {void}
 * @throws {Error} When there's an error loading the todos
 */
function loadTodos() {
    fetch('todos.json')
        .then(response => response.json())
        .then(data => {
            todos = data;
            displayTodos();
        })
        .catch(error => {
            console.error('Error loading todos:', error);
            todos = [];
        });
}

/**
 * Saves the current todos array to the server
 * @function saveTodos
 * @description Sends the current todos array to the server for persistent storage
 * @returns {void}
 * @throws {Error} When there's an error saving the todos
 */
function saveTodos() {
    fetch('/save-todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todos)
    })
    .then(response => response.json())
    .then(data => console.log('Todos saved successfully'))
    .catch(error => console.error('Error saving todos:', error));
}

/**
 * Adds a new todo item to the list
 * @function addTodo
 * @description Creates a new todo item from the input field, adds it to the todos array, and updates the UI
 * @returns {void}
 */
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    
    if (todoText) {
        const newTodo = {
            id: Date.now(),
            text: todoText
        };
        
        todos.push(newTodo);
        saveTodos();
        displayTodos();
        todoInput.value = '';
    }
}

/**
 * Deletes a todo item from the list
 * @function deleteTodo
 * @param {number} id - The unique identifier of the todo item to delete
 * @description Removes a todo item with the specified ID from the todos array and updates the UI
 * @returns {void}
 */
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    displayTodos();
}

/**
 * Renders the todo list in the UI
 * @function displayTodos
 * @description Clears and rebuilds the todo list HTML elements based on the current todos array
 * @returns {void}
 */
function displayTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${todo.text}
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Initial load
loadTodos();