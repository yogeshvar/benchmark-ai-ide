# Simple Todo Application

A lightweight Todo application built with HTML, CSS, and JavaScript that uses localStorage for data persistence.

## Features

- Add new todos
- Delete existing todos
- Data persistence using localStorage
- Clean and responsive design
- Enter key support for adding todos

## Getting Started

### Prerequisites

You only need a modern web browser to run this application.

### Installation

1. Clone this repository or download the files:
   - index.html
   - style.css
   - script.js

2. Place all files in the same directory

3. Open `index.html` in your web browser

### Usage

1. **Adding a Todo**
   - Type your todo in the input field
   - Click the "Add" button or press Enter
   - The todo will appear in the list below

2. **Deleting a Todo**
   - Click the "Delete" button next to any todo to remove it
   - The todo will be permanently removed from the list

## File Structure 

```
todo-app/
│
├── index.html # Main HTML file
├── style.css # Styling
├── script.js # Application logic
└── README.md # Documentation
```

# How It Works

- The application uses the browser's localStorage to store todos
- Todos persist even after the browser is closed
- Data is stored in JSON format
- The UI updates automatically when todos are added or deleted

## Browser Support

The application works on all modern browsers that support:
- localStorage
- ES6 JavaScript
- Flexbox CSS

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).