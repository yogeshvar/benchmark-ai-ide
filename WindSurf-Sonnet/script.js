/**
 * Todo Application
 * This script handles the todo list functionality including adding, deleting,
 * and persisting todos using a JSON file.
 */

document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    // Load todos from JSON file
    loadTodos();

    // Add todo when button is clicked
    addButton.addEventListener('click', addTodo);

    // Add todo when Enter key is pressed
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    /**
     * Adds a new todo item to the list and persists it to the JSON file
     * Creates a new todo with the current timestamp as ID if the input is not empty
     */
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        // Get existing todos
        fetch('todos.json')
            .then(response => response.json())
            .then(todos => {
                // Add new todo
                const newTodo = {
                    id: Date.now(),
                    text: todoText
                };
                todos.push(newTodo);

                // Save updated todos
                saveTodos(todos);

                // Clear input
                todoInput.value = '';

                // Refresh the display
                displayTodo(newTodo);
            })
            .catch(() => {
                // If file doesn't exist, create new array
                const todos = [{
                    id: Date.now(),
                    text: todoText
                }];
                saveTodos(todos);
                todoInput.value = '';
                displayTodo(todos[0]);
            });
    }

    /**
     * Loads existing todos from the JSON file and displays them on the page
     * If the JSON file doesn't exist, creates a new empty array
     */
    function loadTodos() {
        fetch('todos.json')
            .then(response => response.json())
            .then(todos => {
                todos.forEach(todo => displayTodo(todo));
            })
            .catch(() => {
                // If file doesn't exist, create empty array
                saveTodos([]);
            });
    }

    /**
     * Saves the todos array to the JSON file
     * @param {Array} todos - Array of todo objects to save
     */
    function saveTodos(todos) {
        fetch('todos.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todos, null, 2)
        });
    }

    /**
     * Creates and displays a todo item in the DOM
     * @param {Object} todo - Todo object containing id and text properties
     */
    function displayTodo(todo) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo.id;

        const span = document.createElement('span');
        span.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteTodo(todo.id);

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    /**
     * Deletes a todo item by its ID
     * Removes it from both the JSON file and the DOM
     * @param {number} id - The ID of the todo to delete
     */
    function deleteTodo(id) {
        fetch('todos.json')
            .then(response => response.json())
            .then(todos => {
                const updatedTodos = todos.filter(todo => todo.id !== id);
                saveTodos(updatedTodos);
                
                // Remove from DOM
                const todoElement = document.querySelector(`li[data-id="${id}"]`);
                if (todoElement) {
                    todoElement.remove();
                }
            });
    }
});
