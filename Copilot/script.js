document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    // Event listener for the add button
    addButton.addEventListener('click', addTodo);

    // Function to add a new todo
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoItem = document.createElement('li');
        todoItem.textContent = todoText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(todoItem);
            saveTodos();
        });

        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);

        todoInput.value = '';
        saveTodos();
    }

    // Function to save todos to the JSON file
    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(todoItem => {
            todos.push(todoItem.firstChild.textContent);
        });
        fetch('todos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todos)
        });
    }

    // Function to load todos from the JSON file
    function loadTodos() {
        fetch('todos.json')
            .then(response => response.json())
            .then(todos => {
                todos.forEach(todoText => {
                    const todoItem = document.createElement('li');
                    todoItem.textContent = todoText;

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        todoList.removeChild(todoItem);
                        saveTodos();
                    });

                    todoItem.appendChild(deleteButton);
                    todoList.appendChild(todoItem);
                });
            });
    }

    // Load todos when the page loads
    loadTodos();
});
