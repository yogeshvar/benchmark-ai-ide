let todos = [];

// Load todos from JSON file
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

// Save todos to JSON file
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

// Add new todo
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

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    displayTodos();
}

// Display todos
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