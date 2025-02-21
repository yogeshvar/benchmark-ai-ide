const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('./'));
app.use(express.json());

// Endpoint to save todos
app.post('/save-todos', (req, res) => {
    const todos = req.body;
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    
    // Create todos.json if it doesn't exist
    const todosPath = path.join(__dirname, 'todos.json');
    if (!fs.existsSync(todosPath)) {
        fs.writeFileSync(todosPath, '[]');
    }
});