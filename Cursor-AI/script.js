/**
 * Todo Application JavaScript
 * This file contains all the functionality for the todo application
 * including data management, UI updates, and event handling
 */

/**
 * Loads todos from localStorage
 * @returns {Array} Array of todo items
 */
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
}

/**
 * Saves todos to localStorage
 * @param {Array} todos - Array of todo items to save
 */
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Renders the todo list in the UI
 * Creates HTML elements for each todo item and adds them to the list
 */
function renderTodos() {
    const todos = loadTodos();
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

/**
 * Adds a new todo item
 * Gets the input value, validates it, and adds it to the todo list
 */
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText) {
        const todos = loadTodos();
        todos.push(todoText);
        saveTodos(todos);
        todoInput.value = ''; // Clear input field
        renderTodos();
    }
}

/**
 * Deletes a todo item
 * @param {number} index - Index of the todo item to delete
 */
function deleteTodo(index) {
    const todos = loadTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

// Event Listeners

/**
 * Add event listener for Enter key press
 * Allows users to add todos by pressing Enter
 */
document.getElementById('todoInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Initialize the application
renderTodos(); 