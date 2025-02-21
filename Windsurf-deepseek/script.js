document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');

    function loadTodos() {
        fetch('/todos.json')
            .then(response => response.json())
            .then(todos => {
                todoList.innerHTML = '';
                todos.forEach((todo, index) => {
                    const li = document.createElement('li');
                    li.textContent = todo;
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.classList.add('deleteBtn');
                    deleteBtn.onclick = () => deleteTodo(index);
                    li.appendChild(deleteBtn);
                    todoList.appendChild(li);
                });
            });
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            fetch('/addTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todo: todoText }),
            })
            .then(() => {
                todoInput.value = '';
                loadTodos();
            });
        }
    }

    function deleteTodo(index) {
        fetch('/deleteTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index: index }),
        })
        .then(() => loadTodos());
    }

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    loadTodos();
});
