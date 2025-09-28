# Ultimate WebDev Cheatsheet

## **NODE.JS & MODERN WEB DEV**
### **CHEAT SHEET - PART 1: THE FRONTEND FOUNDATION**
version 1.0.0

### **Table of Contents**

1.  **HTML: The Structure**
    *   Basic Document Structure
    *   Essential Tags for the `<head>`
    *   Common Structural & Content Tags
    *   Lists, Forms, and Inputs

2.  **CSS: The Style**
    *   Applying CSS
    *   Selectors: How to Target Elements
    *   The Box Model
    *   Common Properties (Typography, Layout, Color)
    *   Flexbox for Layout

3.  **JavaScript: The Behavior (Basics)**
    *   Variables & Data Types
    *   Operators
    *   Control Flow & Loops
    *   Functions (including Arrow Functions)
    *   DOM Manipulation: Connecting JS to HTML
    *   Event Handling: Making Pages Interactive

---
## 1. HTML: The Structure (`index.html`)

HTML (HyperText Markup Language) provides the skeleton and content of your webpage.

### **Basic Document Structure**
Every HTML file should have this fundamental structure.

```html
<!DOCTYPE html> <!-- Declares the document type -->
<html lang="en"> <!-- The root element -->
<head>
    <!-- Metadata: Info about the page (not visible) -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Website</title>
    <!-- Link to your CSS file -->
    <link rel="stylesheet" href="style.css">
    <!-- Link to your JavaScript file ('defer' ensures HTML is loaded first) -->
    <script src="script.js" defer></script>
</head>
<body>
    <!-- Visible content of the page goes here -->
    <h1>Hello, World!</h1>
</body>
</html>
```

### **Common Structural & Content Tags**

```html
<!-- Semantic structural elements -->
<header>Page Header (Logo, Nav)</header>
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>
<main>
    <!-- The main, unique content of the page -->
    <section id="intro">
        <h2>Introduction</h2>
        <p>This is a paragraph of text.</p>
    </section>
    <article>
        <h3>Blog Post Title</h3>
        <p>Article content goes here...</p>
    </article>
</main>
<footer>Page Footer (Copyright, Links)</footer>

<!-- Basic content elements -->
<h1>Heading 1</h1> <!-- Only one h1 per page is best practice -->
<h2>Heading 2</h2>
<h6>Heading 6</h6>

<p>A paragraph of text. Use this for most text content.</p>

<!-- Text formatting -->
<strong>Important text</strong> (bold)
<em>Emphasized text</em> (italic)
<br> <!-- Line break -->

<!-- Links and Images -->
<a href="https://www.google.com">This is a link</a>
<img src="path/to/image.jpg" alt="A descriptive text for the image">

<!-- Generic containers (use when no semantic tag fits) -->
<div>A block-level container</div>
<span>An inline container</span>

<!-- HTML Comments -->
<!-- This is a comment and will not be displayed -->
```

### **Lists, Forms, and Inputs**

```html
<!-- Unordered List -->
<ul>
    <li>First item</li>
    <li>Second item</li>
</ul>

<!-- Ordered List -->
<ol>
    <li>Step 1</li>
    <li>Step 2</li>
</ol>

<!-- Forms for user input -->
<form action="/submit-data" method="POST">
    <!-- The 'label' is crucial for accessibility -->
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" minlength="8">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email">

    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="18">

    <label for="comments">Comments:</label>
    <textarea id="comments" name="comments" rows="4"></textarea>

    <!-- Checkboxes (multiple selections) -->
    <input type="checkbox" id="subscribe" name="subscribe" checked>
    <label for="subscribe">Subscribe to newsletter</label>

    <!-- Radio Buttons (single selection from a group) -->
    <input type="radio" id="student" name="status" value="student">
    <label for="student">Student</label>
    <input type="radio" id="professional" name="status" value="professional">
    <label for="professional">Professional</label>

    <!-- Buttons -->
    <button type="submit">Submit Form</button>
    <button type="reset">Reset</button>
</form>
```

---
## 2. CSS: The Style (`style.css`)

CSS (Cascading Style Sheets) is used to style and lay out web pages.

### **Applying CSS**
1.  **External (Best Practice):** `<link rel="stylesheet" href="style.css">` in `<head>`.
2.  **Internal:** `<style>` tag inside the `<head>`.
3.  **Inline:** `style` attribute on an HTML element (e.g., `<p style="color: blue;">`).

### **Selectors: How to Target Elements**
```css
/* Universal Selector - targets everything (use sparingly) */
* {
    box-sizing: border-box; /* A very common and useful reset */
}

/* Element (Type) Selector */
body {
    font-family: Arial, sans-serif;
    margin: 0;
}

/* Class Selector - targets any element with class="container" */
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto; /* Center the container */
}

/* ID Selector - targets the one element with id="main-title" */
#main-title {
    color: #333;
    font-size: 2.5rem; /* rem is a responsive unit */
}

/* Attribute Selector */
input[type="text"] {
    border: 1px solid #ccc;
}

/* Pseudo-classes - style based on state */
a:hover {
    text-decoration: underline; /* Underline links on hover */
}

/* Combinators */
nav a { /* Descendant: any 'a' inside a 'nav' */
    color: navy;
}
section > p { /* Child: any 'p' that is a direct child of 'section' */
    line-height: 1.6;
}
```

### **The Box Model**
Every HTML element is a rectangular box.
*   **Content:** The text, image, etc.
*   **Padding:** The space between the content and the border.
*   **Border:** The line around the padding.
*   **Margin:** The space outside the border, between elements.

```css
.box {
    width: 200px;
    height: 100px;
    padding: 20px; /* Space inside the box */
    border: 2px solid black; /* A line around the box */
    margin: 15px; /* Space outside the box */
    background-color: lightgray;
}
```

### **Flexbox for Layout**
A modern, powerful way to create layouts. Apply it to the parent container.

```css
.flex-container {
    display: flex; /* This activates flexbox */
    flex-direction: row; /* or column, row-reverse, column-reverse */
    justify-content: center; /* Aligns items along the main axis (horizontally for row) */
    /* Other justify-content values: flex-start, flex-end, space-between, space-around */
    align-items: center; /* Aligns items along the cross axis (vertically for row) */
    /* Other align-items values: flex-start, flex-end, stretch */
    gap: 1rem; /* Creates space between flex items */
}

.flex-item {
    /* Properties for the children */
    padding: 1rem;
    background-color: dodgerblue;
    color: white;
}
```

---
## 3. JavaScript: The Behavior (Basics) (`script.js`)

JS makes your web pages interactive.

### **Variables & Data Types**
```javascript
// Use 'let' for variables that can be reassigned.
let age = 30;
age = 31;

// Use 'const' for variables that will not be reassigned (constants).
const birthYear = 1991;

// --- Primitive Data Types ---
const name = "Alice";          // String
const score = 95.5;            // Number
const isActive = true;         // Boolean
let user = null;               // Null (intentional absence of value)
let address;                   // Undefined (variable declared but not assigned)

// --- Structural Data Types ---
// Object: a collection of key-value pairs
const person = {
    name: "Bob",
    age: 42,
    hobbies: ["reading", "hiking"]
};

// Array: an ordered list of values
const numbers = [10, 20, 30, 40];
```

### **Operators & Control Flow**
```javascript
// --- Operators ---
let sum = 10 + 5;
let a = 1;
a++; // a is now 2

// Comparison (use strict equality '===' to avoid type coercion issues)
console.log(5 === '5'); // false
console.log(5 == '5');  // true (avoid this)

// Logical Operators
const isAdult = age >= 18;
const hasLicense = true;
if (isAdult && hasLicense) {
    console.log("You can drive.");
}

// --- Control Flow ---
if (score > 90) {
    console.log("Excellent!");
} else if (score > 70) {
    console.log("Good job.");
} else {
    console.log("Keep practicing.");
}

// Ternary Operator
const message = (score >= 60) ? "Pass" : "Fail";
```

### **Loops**
```javascript
// Standard for loop
for (let i = 0; i < 5; i++) {
    console.log(`Loop iteration: ${i}`); // Template literals are great!
}

// for...of loop (for iterating over arrays)
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
    console.log(fruit);
}

// while loop
let i = 0;
while (i < 3) {
    console.log(`While loop: ${i}`);
    i++;
}
```

### **Functions (including Arrow Functions)**
```javascript
// Function Declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Arrow Function (modern, concise syntax)
const add = (a, b) => {
    return a + b;
};

// Arrow Function (implicit return for single expressions)
const subtract = (a, b) => a - b;

console.log(greet("World")); // "Hello, World!"
console.log(add(5, 3));      // 8
```

### **DOM Manipulation: Connecting JS to HTML**
The DOM (Document Object Model) is a JS representation of your HTML, allowing you to change it dynamically.

```javascript
// --- Selecting Elements ---
// Select by ID (returns one element)
const mainTitle = document.getElementById('main-title');

// Select using a CSS selector (returns the first match)
const container = document.querySelector('.container');

// Select all elements matching a CSS selector (returns a NodeList)
const listItems = document.querySelectorAll('li');


// --- Modifying Elements ---
// Change text content
mainTitle.textContent = "Welcome to Dynamic Web!";

// Change styles
mainTitle.style.color = 'purple';
mainTitle.style.backgroundColor = '#f0f0f0';

// Add/Remove CSS classes (the BEST way to change style)
container.classList.add('highlight');
container.classList.remove('old-class');

// Create and add new elements
const newParagraph = document.createElement('p');
newParagraph.textContent = 'This was added by JavaScript.';
container.appendChild(newParagraph);
```

### **Event Handling: Making Pages Interactive**
```javascript
// Select a button (assuming you have a <button id="my-button"> in your HTML)
const myButton = document.querySelector('#my-button');

// Add an event listener to run a function when the button is clicked
myButton.addEventListener('click', () => {
    alert('Button was clicked!');
    // You can do anything here, like changing the page content
    document.body.style.backgroundColor = 'lightblue';
});

// Listening for input events on a form field
const usernameInput = document.querySelector('#username');
usernameInput.addEventListener('input', (event) => {
    // 'event.target.value' holds the current text in the input field
    console.log(`User is typing: ${event.target.value}`);
});
```

---

## **NODE.JS & MODERN WEB DEV**
### **CHEAT SHEET - PART 2: ADVANCED JAVASCRIPT**
version 1.0.0

### **Table of Contents**

1.  **Functions Revisited**
    *   First-Class Functions & Higher-Order Functions
    *   Closures
    *   The `this` Keyword & `bind`

2.  **Objects & Prototypes (OOP in JS)**
    *   Object Literals vs. Constructor Functions
    *   Prototypal Inheritance
    *   ES6 Classes (Syntactic Sugar)

3.  **Asynchronous JavaScript**
    *   The Event Loop & Callbacks
    *   Promises: Handling Async Operations Cleanly
    *   `async/await`: Modern Async Syntax

4.  **ES6+ Features**
    *   Destructuring (Arrays & Objects)
    *   Rest & Spread Operators
    *   Template Literals (Recap)
    *   Modules (Import/Export)

5.  **Working with Data**
    *   Advanced Array Methods (`map`, `filter`, `reduce`)
    *   The Fetch API (Making HTTP Requests)
    *   JSON (JavaScript Object Notation)

---

## 1. Functions Revisited

### **First-Class & Higher-Order Functions**
In JS, functions are "first-class citizens," meaning they can be treated like any other variable. A **Higher-Order Function** is a function that either takes another function as an argument or returns a function.

```javascript
// A function can be assigned to a variable
const greet = function(name) {
    console.log(`Hello, ${name}`);
};

// A function can be passed as an argument (callback)
function processUserInput(callback) {
    const name = "Alice"; // Simulating user input
    callback(name);
}
processUserInput(greet); // "Hello, Alice"

// A function can be returned from another function
function createMultiplier(factor) {
    // This returns a new function
    return function(number) {
        return number * factor;
    };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(10)); // 20
console.log(triple(10)); // 30
```

### **Closures**
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In simpler terms, an inner function has access to the outer function's variables, even after the outer function has finished running.

```javascript
function makeCounter() {
    let count = 0; // 'count' is a private variable inside the closure

    return function() {
        count++;
        console.log(count);
    };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

counter1(); // 1
counter1(); // 2 (counter1 has its own 'count')

counter2(); // 1 (counter2 has its own separate 'count')
```

### **The `this` Keyword**
`this` refers to the object that is executing the current function. Its value is determined by how a function is called.
-   **In a method:** `this` refers to the owner object.
-   **Alone:** `this` refers to the global object (`window` in browsers).
-   **In a function (strict mode):** `this` is `undefined`.
-   **Arrow functions:** `this` is lexically bound; it takes the `this` value of its surrounding scope.

```javascript
const user = {
    name: "Bogdan",
    greet() {
        // Here, 'this' refers to the 'user' object
        console.log(`Hello, I am ${this.name}`);
    },
    greetLater() {
        setTimeout(() => {
            // Arrow function uses the 'this' from its parent scope (greetLater)
            // So 'this' still refers to the 'user' object.
            console.log(`Later, I am still ${this.name}`);
        }, 1000);
    }
};

user.greet();      // "Hello, I am Bogdan"
user.greetLater(); // "Later, I am still Bogdan"
```
---
## 2. Objects & Prototypes (OOP in JS)

### **Prototypal Inheritance**
Every JavaScript object has a private property which holds a link to another object called its **prototype**. That prototype object has a prototype of its own, and so on, until an object is reached with `null` as its prototype. This is the "prototype chain."

### **ES6 Classes (Modern Approach)**
Classes are "syntactic sugar" over JavaScript's existing prototype-based inheritance. The syntax is cleaner and more familiar to developers from other languages.

```javascript
class Vehicle {
    // Constructor method for creating and initializing an object
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.speed = 0;
    }

    // Instance method (added to the Vehicle.prototype)
    accelerate(amount) {
        this.speed += amount;
        console.log(`Accelerating to ${this.speed} km/h.`);
    }

    // Static method (belongs to the class itself, not instances)
    static getInfo() {
        return 'This is a class for creating vehicles.';
    }
}

// Inheritance using the 'extends' keyword
class Car extends Vehicle {
    constructor(make, model, numDoors) {
        // 'super' calls the parent class's constructor
        super(make, model);
        this.numDoors = numDoors;
    }

    // Overriding a method
    accelerate(amount) {
        console.log('Car is accelerating...');
        super.accelerate(amount); // Call the parent method
    }
}

const myCar = new Car('Toyota', 'Corolla', 4);
myCar.accelerate(50); // "Car is accelerating...", "Accelerating to 50 km/h."
console.log(Car.getInfo()); // "This is a class for creating vehicles."
```

---
## 3. Asynchronous JavaScript

### **Promises**
A `Promise` is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to associate handlers with an async action's eventual success value or failure reason.

```javascript
// Creating a Promise
const fetchData = new Promise((resolve, reject) => {
    // Simulating an async operation (e.g., API call)
    setTimeout(() => {
        const success = true; // Change to false to test rejection
        if (success) {
            resolve({ data: "Here is your data!" }); // Fulfill the promise
        } else {
            reject("Failed to fetch data."); // Reject the promise
        }
    }, 2000);
});

// Consuming a Promise
fetchData
    .then(response => {
        // This block runs if the promise is resolved
        console.log("Success:", response.data);
    })
    .catch(error => {
        // This block runs if the promise is rejected
        console.error("Error:", error);
    })
    .finally(() => {
        // This block runs regardless of success or failure
        console.log("Operation finished.");
    });
```

### **`async/await`**
A modern syntax built on top of Promises that makes asynchronous code look and behave more like synchronous code, making it much easier to read and write.
-   `async` keyword: Put before a function to make it return a Promise.
-   `await` keyword: Used inside an `async` function to pause execution until a Promise settles (resolves or rejects).

```javascript
// The same fetchData promise from above
const getData = async () => {
    try {
        // 'await' pauses the function until fetchData resolves
        console.log("Fetching data...");
        const response = await fetchData;
        console.log("Success:", response.data);
        return response.data; // The async function will resolve with this value
    } catch (error) {
        // Any rejection in the awaited promise will be caught here
        console.error("Caught an error:", error);
    }
};

getData();
```

---
## 4. ES6+ Features

### **Destructuring (Arrays & Objects)**
A convenient way of extracting values from data stored in objects and arrays.

```javascript
// --- Object Destructuring ---
const user = {
    id: 1,
    username: "dev_user",
    profile: {
        email: "dev@example.com",
        role: "Admin"
    }
};
// Extract properties into variables
const { username, id } = user;
console.log(username, id); // "dev_user" 1

// Rename variables and extract nested properties
const { profile: { email, role: userRole } } = user;
console.log(email, userRole); // "dev@example.com" "Admin"

// --- Array Destructuring ---
const coordinates = [10, 20, 30];
const [x, y] = coordinates;
console.log(x, y); // 10 20
```

### **Rest & Spread Operators (`...`)**
-   **Spread:** Expands an iterable (like an array or object) into individual elements.
-   **Rest:** Collects multiple elements and "condenses" them into a single element (like an array).

```javascript
// --- Spread Operator ---
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArray = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

const user = { name: "Alice", age: 30 };
const updatedUser = { ...user, age: 31, city: "New York" };
// { name: "Alice", age: 31, city: "New York" }

// --- Rest Operator (in function parameters) ---
function sum(...numbers) {
    // 'numbers' is an array of all arguments passed
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### **Modules (Import/Export)**
The modern way to organize and share code between JavaScript files.

```javascript
// In a file named 'utils.js'
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

// Default export (you can only have one per file)
export default function greet() {
    console.log("Hello from the module!");
}

// In another file named 'script.js'
// Import named exports inside curly braces
import greet, { PI, add } from './utils.js';
// Note: You must add type="module" to your <script> tag in HTML
// <script type="module" src="script.js"></script>

console.log(PI);          // 3.14159
console.log(add(10, 5));  // 15
greet();                  // "Hello from the module!"
```
---
## 5. Working with Data

### **Advanced Array Methods**
These are higher-order functions that provide powerful, declarative ways to work with arrays.

-   **`.map()`**: Creates a new array by applying a function to every element of the original array.
-   **`.filter()`**: Creates a new array with all elements that pass the test implemented by the provided function.
-   **`.reduce()`**: Executes a "reducer" function on each element of the array, resulting in a single output value.

```javascript
const numbers = [1, 2, 3, 4, 5];

// .map() - double each number
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

// .filter() - get only the even numbers
const evens = numbers.filter(num => num % 2 === 0);
// [2, 4]

// .reduce() - sum all numbers
const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0); // 0 is the initial value of the accumulator
// 15
```

### **The Fetch API**
The modern, Promise-based way to make network requests (e.g., to an API).

```javascript
const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

async function fetchPost() {
    try {
        const response = await fetch(API_URL);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON body of the response
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Could not fetch post:', error);
    }
}

fetchPost();
```

### **JSON (JavaScript Object Notation)**
A lightweight data-interchange format. It's easy for humans to read and write and easy for machines to parse and generate.

```javascript
// JavaScript Object
const user = {
    name: "Charlie",
    id: 123,
    isAdmin: false
};

// Convert a JavaScript object to a JSON string
const jsonString = JSON.stringify(user, null, 2); // 2 adds indentation
/*
jsonString is now:
"{
  "name": "Charlie",
  "id": 123,
  "isAdmin": false
}"
*/

// Convert a JSON string back to a JavaScript object
const parsedObject = JSON.parse(jsonString);
console.log(parsedObject.name); // "Charlie"
```

## **NODE.JS & MODERN WEB DEV**
### **CHEAT SHEET - PART 3: THE NODE.JS BACKEND (MASTER)**
version 1.0.0

### **Table of Contents**

1.  **Node.js Core Concepts**
    *   What is Node.js? (Event Loop, Non-blocking I/O)
    *   The `require` and ES Module Systems
    *   Core Modules (`http`, `fs`, `path`)

2.  **Setting Up a Node.js Project**
    *   Initializing with `npm` (`package.json`)
    *   Installing Dependencies (like Express.js)
    *   Running Scripts

3.  **Building a Server with Express.js**
    *   What is Express.js?
    *   Creating a Basic Server
    *   Routing: Handling Different URL Paths and HTTP Methods
    *   Middleware: Processing Requests

4.  **Handling Data & APIs**
    *   Parsing Request Bodies (JSON)
    *   Creating API Endpoints (GET, POST)
    *   Serving Static Files (HTML, CSS, JS)

5.  **Putting It All Together: A Full MERN-Ready Example**
    *   Backend (`backend/server.js`): The API server.
    *   Frontend (`script.js`): Using `fetch` to communicate with the backend.

---
### **File Structure (Final)**
```
my-project/
├── backend/
│   ├── node_modules/   (Created by npm)
│   ├── package.json    (Project manifest)
│   └── server.js       (Our backend server code)
├── index.html
├── style.css
└── script.js
```
---
## 1. Node.js Core Concepts

### **What is Node.js?**
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript **outside of the browser**.

*   **Single-Threaded Event Loop:** Node.js uses a single thread to handle many connections concurrently. Instead of blocking on a long task (like a database query), it starts the task and continues to handle other requests. When the task is done, a callback is placed in a queue to be executed. This makes it highly efficient for I/O-heavy applications.

### **Modules in Node.js**

*   **CommonJS (Classic):** Uses `require()` to import modules and `module.exports` to export them. This is the traditional Node.js module system.
*   **ES Modules (Modern):** Uses `import` and `export`. To enable this in Node.js, you must add `"type": "module"` to your `package.json` or use the `.mjs` file extension. **We will use this modern syntax.**

### **Core Modules**
Node.js has a rich standard library of built-in modules that you don't need to install.

```javascript
// To use core modules, you import them.
import http from 'http'; // For creating HTTP servers.
import fs from 'fs/promises'; // For interacting with the file system (Promise-based version).
import path from 'path'; // For working with file and directory paths.
```
---
## 2. Setting Up a Node.js Project

**1. Navigate to your `backend` directory in the terminal:**
```bash
cd backend
```

**2. Initialize a new Node.js project:**
This creates a `package.json` file, which tracks project metadata and dependencies.
```bash
npm init -y
```
The `-y` flag accepts all the default prompts.

**3. Enable ES Modules:**
Open the newly created `package.json` file and add this top-level key-value pair:
```json
"type": "module",
```

**4. Install Express.js:**
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's the de-facto standard for building servers in Node.
```bash
npm install express
```
This will create a `node_modules` folder and a `package-lock.json` file. You should never commit `node_modules` to version control.

---
## 3. Building a Server with Express.js (`backend/server.js`)

### **Creating a Basic Server**
This is the "Hello, World!" of backend development.

```javascript
// backend/server.js

// 1. Import dependencies
import express from 'express';

// 2. Initialize the Express app
const app = express();
const PORT = 3000; // Choose a port for your server to listen on

// 3. Define a basic route
// This handles GET requests to the root URL ('/')
app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

// 4. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

**To run this server:**
Open your terminal in the `backend` directory and run:
```bash
node server.js
```
Now, if you visit `http://localhost:3000` in your browser, you will see "Hello from the backend server!".

### **Routing**
Routing refers to how an application’s endpoints (URIs) respond to client requests.

```javascript
// GET request to /users
app.get('/api/users', (req, res) => {
    // Logic to get all users...
    res.json([{ id: 1, name: 'Alice' }]); // Sending JSON data
});

// POST request to /users
app.post('/api/users', (req, res) => {
    // Logic to create a new user...
    res.status(201).send('User created successfully'); // Sending a status code
});
```

### **Middleware**
Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application’s request-response cycle. They can execute code, make changes to the request and response objects, and end the cycle or pass control to the next middleware.

```javascript
// A simple logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next(); // Pass control to the next middleware/route handler
};

app.use(logger); // Use this middleware for all incoming requests
```

---
## 4. Handling Data & APIs

### **Serving Static Files**
To connect our frontend (HTML, CSS, JS) to our backend, we need the server to "serve" those files to the browser. Express has a built-in middleware for this.

```javascript
import path from 'path';

// This middleware tells Express to serve any static files
// found in the directory one level above our 'backend' directory.
const __dirname = path.resolve(); // A workaround to get the current directory path with ES Modules
app.use(express.static(path.join(__dirname, '..')));
```

### **Parsing Request Bodies**
When a client (like our frontend JS) sends data in a `POST` request (e.g., submitting a form), it's usually in JSON format. We need middleware to parse this JSON from the request body.

```javascript
// This middleware parses incoming requests with JSON payloads.
// It makes the data available on `req.body`.
app.use(express.json());
```

---
## 5. Putting It All Together: The Guestbook App

### **Step 1: The Complete Backend (`backend/server.js`)**

```javascript
// backend/server.js
import express from 'express';
import path from 'path';

// --- Server Setup ---
const app = express();
const PORT = 3000;
const __dirname = path.resolve();

// --- In-Memory "Database" ---
// In a real app, this would be a database like MongoDB or PostgreSQL.
let messages = [
    { text: "Hello, this is the first message!", timestamp: new Date() }
];

// --- Middleware ---
// 1. Logger middleware to see incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// 2. Middleware to parse JSON bodies
app.use(express.json());

// 3. Middleware to serve static files from the root directory
app.use(express.static(path.join(__dirname, '.')));


// --- API Routes ---
// GET /api/messages - Retrieve all messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// POST /api/messages - Add a new message
app.post('/api/messages', (req, res) => {
    const { messageText } = req.body; // Destructure the text from the request

    if (!messageText || typeof messageText !== 'string' || messageText.trim() === '') {
        return res.status(400).json({ error: "Message text is invalid." });
    }

    const newMessage = {
        text: messageText.trim(),
        timestamp: new Date()
    };

    messages.push(newMessage);
    console.log('New message added:', newMessage);

    // Respond with the newly created message
    res.status(201).json(newMessage);
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Serving static files from the root project directory.');
});
```

### **Step 2: The Frontend HTML (`index.html`)**

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guestbook</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <main class="container">
        <h1>Guestbook</h1>
        <section id="messages-container">
            <!-- Messages will be loaded here by JavaScript -->
        </section>
        <form id="message-form">
            <label for="message-input">Leave a message:</label>
            <textarea id="message-input" name="message" required></textarea>
            <button type="submit">Submit</button>
        </form>
    </main>
</body>
</html>
```

### **Step 3: The Frontend JavaScript (`script.js`)**

This script will `fetch` data from our Node.js API and dynamically update the DOM.

```javascript
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages-container');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');

    const API_URL = '/api/messages';

    // Function to fetch and display messages
    const fetchMessages = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network response was not ok');

            const messages = await response.json();
            messagesContainer.innerHTML = ''; // Clear existing messages

            messages.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                messageElement.innerHTML = `
                    <p>${msg.text}</p>
                    <small>${new Date(msg.timestamp).toLocaleString()}</small>
                `;
                messagesContainer.appendChild(messageElement);
            });
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            messagesContainer.innerHTML = '<p class="error">Could not load messages.</p>';
        }
    };

    // Function to post a new message
    const postMessage = async (messageText) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messageText: messageText }),
            });

            if (!response.ok) throw new Error('Failed to post message');

            // Refresh the messages to show the new one
            fetchMessages();
        } catch (error) {
            console.error('Error posting message:', error);
        }
    };

    // Event listener for the form submission
    messageForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const messageText = messageInput.value.trim();
        if (messageText) {
            postMessage(messageText);
            messageInput.value = ''; // Clear the input field
        }
    });

    // Initial fetch of messages when the page loads
    fetchMessages();
});
```

### **How to Run the Full Application:**

1.  Make sure all files (`index.html`, `style.css`, `script.js`, and the `backend` folder) are in the same root directory.
2.  Open your terminal and navigate into the `backend` directory: `cd backend`.
3.  If you haven't already, run `npm install express`.
4.  Start the server: `node server.js`.
5.  Open your web browser and go to `http://localhost:3000`.

You now have a fully functional web application with a frontend that dynamically communicates with a Node.js backend API. This is the core pattern for all modern web development.
