const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.get('/todos.json', (req, res) => {
    fs.readFile(path.join(__dirname, 'todos.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading todos.json');
        } else {
            res.send(data);
        }
    });
});

app.post('/addTodo', (req, res) => {
    const newTodo = req.body.todo;
    fs.readFile(path.join(__dirname, 'todos.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading todos.json');
        } else {
            const todos = JSON.parse(data);
            todos.push(newTodo);
            fs.writeFile(path.join(__dirname, 'todos.json'), JSON.stringify(todos), (err) => {
                if (err) {
                    res.status(500).send('Error writing to todos.json');
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

app.post('/deleteTodo', (req, res) => {
    const index = req.body.index;
    fs.readFile(path.join(__dirname, 'todos.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading todos.json');
        } else {
            const todos = JSON.parse(data);
            todos.splice(index, 1);
            fs.writeFile(path.join(__dirname, 'todos.json'), JSON.stringify(todos), (err) => {
                if (err) {
                    res.status(500).send('Error writing to todos.json');
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
