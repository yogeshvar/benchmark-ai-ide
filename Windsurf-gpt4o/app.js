// Wait for the DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    // Fetch existing todos from the JSON file and populate the list
    fetch('todos.json')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => {
                addTodoToList(todo);
            });
        });

    // Add a new todo when the 'Add' button is clicked
    addTodoButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoToList(todoText);
            saveTodoToFile(todoText);
            todoInput.value = '';
        }
    });

    /**
     * Add a todo item to the list in the DOM
     * @param {string} todoText - The text of the todo item to add
     */
    function addTodoToList(todoText) {
        const li = document.createElement('li');
        li.textContent = todoText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            deleteTodoFromFile(todoText);
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    /**
     * Save a new todo item to the JSON file
     * @param {string} todoText - The text of the todo item to save
     */
    function saveTodoToFile(todoText) {
        fetch('todos.json')
            .then(response => response.json())
            .then(todos => {
                todos.push(todoText);
                return fetch('todos.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(todos),
                });
            });
    }

    /**
     * Delete a todo item from the JSON file
     * @param {string} todoText - The text of the todo item to delete
     */
    function deleteTodoFromFile(todoText) {
        fetch('todos.json')
            .then(response => response.json())
            .then(todos => {
                const updatedTodos = todos.filter(todo => todo !== todoText);
                return fetch('todos.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedTodos),
                });
            });
    }
});
