# Todo Application

This is a simple todo application built with HTML, CSS, and JavaScript. The application allows you to add and delete todos, with the data being stored in a JSON file.

## Files

- `index.html`: The main HTML file for the structure of the application.
- `styles.css`: The CSS file for styling the application.
- `script.js`: The JavaScript file for handling the application logic.
- `todos.json`: The JSON file to store the todo data.

## How to Use

1. Open `index.html` in your web browser.
2. Enter a new todo in the input field and click the "Add" button to add it to the list.
3. Click the "Delete" button next to a todo to remove it from the list.

## Project Structure

```
/Users/mags/Copilot/
├── index.html
├── styles.css
├── script.js
└── todos.json
```

## Notes

- The todos are saved to `todos.json` using a POST request. Ensure your server is set up to handle this request and update the JSON file accordingly.
- The application loads todos from `todos.json` when the page loads.
````