# Ultimate Rust Cheatsheet 🦀

### **CHEAT SHEET - PART 1: THE FOUNDATION**
version 1.0.0

### **Table of Contents**

1.  **Setup & Tooling with Cargo**
    *   Installation
    *   Creating and Running a Project

2.  **Variables & Mutability**
    *   `let`, `const`, and Mutability (`mut`)
    *   Shadowing

3.  **Common Data Types**
    *   Scalar Types (Integers, Floats, Bools, Chars)
    *   Compound Types (Tuples, Arrays)
    *   Strings (`&str` vs `String`)

4.  **Functions**
    *   Defining Functions
    *   Parameters and Return Values
    *   Expressions vs. Statements

5.  **Control Flow**
    *   `if/else` Expressions
    *   Loops (`loop`, `while`, `for`)

6.  **The Ownership System (Rust's Superpower)**
    *   The Three Rules of Ownership
    *   Move Semantics
    *   Clone: Explicitly Copying Data
    *   References & Borrowing (`&` and `&mut`)
    *   Slices: A View into Data

---

## 1. Setup & Tooling with Cargo

Rust's build system and package manager, **Cargo**, is one of its best features.

*   **Installation:** Install Rust and Cargo via `rustup` from [rustup.rs](https://rustup.rs/).
*   **Create a new project:**
    ```bash
    # Creates a new binary (executable) project called "my_project"
    cargo new my_project
    cd my_project
    ```
*   **Build the project:**
    ```bash
    cargo build
    ```
*   **Run the project:**
    ```bash
    cargo run
    ```
*   **Check the project for errors without compiling:**
    ```bash
    cargo check
    ```

---
## 2. Variables & Mutability

By default, variables in Rust are **immutable**.

```rust
// In src/main.rs

fn main() {
    // Immutable variable
    let x = 5;
    // x = 6; // This would cause a compile-time error!

    // Mutable variable using the `mut` keyword
    let mut y = 10;
    y = 11; // This is allowed

    // Constants are always immutable and must have a type annotation
    const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;

    // Shadowing: You can declare a new variable with the same name.
    // This is different from mutation; it creates a new variable.
    let z = 5;
    let z = z + 1; // z is now a new variable with the value 6
    {
        let z = z * 2; // Inner scope shadowing; z is 12 here
        println!("The value of z in the inner scope is: {}", z);
    }
    println!("The value of z is: {}", z); // Back to the outer scope; z is 6
}
```

---
## 3. Common Data Types

Rust is a **statically typed** language, meaning it must know the types of all variables at compile time.

### **Scalar Types**
Represent a single value.
*   **Integers:** `i8`, `u8`, `i32`, `u32`, `i64`, `u64`, `isize`, `usize` (i for signed, u for unsigned).
*   **Floating-Point:** `f32`, `f64`.
*   **Boolean:** `bool` (`true` or `false`).
*   **Character:** `char` (represents a single Unicode Scalar Value, enclosed in single quotes).

```rust
let integer: i32 = -10;
let float: f64 = 3.14;
let is_active: bool = true;
let initial: char = 'A';
```

### **Compound Types**
Group multiple values into one type.
*   **Tuple:** A fixed-size collection of values of different types.
*   **Array:** A fixed-size collection of values of the **same** type.

```rust
// Tuple
let person: (&str, i32) = ("Alice", 30);
let name = person.0;
let age = person.1;

// Destructuring a tuple
let (name_destructured, age_destructured) = person;

// Array
let numbers: [i32; 5] = [1, 2, 3, 4, 5];
let first = numbers[0];

// An array of 3 elements, all initialized to 0
let zeroes = [0; 3]; // [0, 0, 0]
```

### **Strings**
*   `&str` (string slice): An immutable reference to a sequence of UTF-8 encoded bytes. String literals are `&str`.
*   `String`: A heap-allocated, growable, owned string.

```rust
let s1: &str = "Hello"; // Immutable string slice
let mut s2: String = String::from("Hello, "); // Owned, mutable String
s2.push_str("world!"); // Append a string slice
println!("{}", s2); // "Hello, world!"
```

---
## 4. Functions

```rust
fn main() {
    another_function(5, 'h');
    let sum = add_five(10);
    println!("10 plus 5 is {}", sum);
}

// A function with parameters
fn another_function(x: i32, unit_label: char) {
    println!("The measurement is: {}{}", x, unit_label);
}

// A function with a return value
// The last expression in a function is implicitly returned (no semicolon)
fn add_five(x: i32) -> i32 {
    x + 5 // This is an expression, its value is returned
}
```

---
## 5. Control Flow

### **`if/else` Expressions**
An `if` in Rust can be an expression, meaning it can return a value.

```rust
let number = 6;

if number % 4 == 0 {
    println!("number is divisible by 4");
} else if number % 3 == 0 {
    println!("number is divisible by 3");
} else {
    println!("number is not divisible by 4 or 3");
}

// Using 'if' in a 'let' statement
let condition = true;
let value = if condition { 5 } else { 6 }; // Both arms must return the same type
```

### **Loops**
```rust
// `loop`: An infinite loop, broken with `break`.
let mut counter = 0;
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2; // `break` can return a value from the loop
    }
};
println!("The result is {}", result); // 20

// `while` loop
let mut number = 3;
while number != 0 {
    println!("{}!", number);
    number -= 1;
}
println!("LIFTOFF!!!");

// `for` loop: The safest and most common loop.
let a = [10, 20, 30, 40, 50];
for element in a {
    println!("the value is: {}", element);
}
```
---
## 6. The Ownership System

This is the central feature of Rust, enabling memory safety without a garbage collector.

### **Rules of Ownership**
1.  Each value in Rust has a variable that’s called its *owner*.
2.  There can only be **one owner at a time**.
3.  When the owner goes out of scope, the value will be *dropped* (memory is freed).

### **Move, Clone, and Copy**
```rust
// Move: For heap-allocated data like String, ownership is transferred.
let s1 = String::from("hello");
let s2 = s1; // `s1` is now invalid. Its ownership has been *moved* to `s2`.
// println!("{}", s1); // This would cause a compile error!

// Clone: To create a deep copy of heap data.
let s3 = String::from("hello");
let s4 = s3.clone(); // `s3` is still valid because `s4` is a deep copy.
println!("s3 = {}, s4 = {}", s3, s4);

// Copy: For simple, stack-allocated data (like integers), the value is copied.
let x = 5;
let y = x; // `x` is still valid.
println!("x = {}, y = {}", x, y);
```

### **References & Borrowing**
Instead of transferring ownership, you can create a *reference* to a value. This is called **borrowing**.

**The Borrowing Rules:**
1.  At any given time, you can have either **one mutable reference** (`&mut T`) OR **any number of immutable references** (`&T`).
2.  References must always be valid (they cannot outlive the data they refer to).

```rust
fn main() {
    let mut s = String::from("hello");

    // Immutable borrow
    let r1 = &s;
    let r2 = &s;
    println!("{} and {}", r1, r2); // This is fine

    // Mutable borrow
    let r3 = &mut s;
    // let r4 = &s; // ERROR: Cannot borrow as immutable because it's already borrowed as mutable
    change(r3);
    println!("{}", r3);
}

// This function takes a mutable reference to a String
fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

### **Slices**
A slice lets you reference a contiguous sequence of elements in a collection rather than the whole collection. A slice is a kind of reference, so it does not have ownership.

```rust
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i]; // Return a slice of the string
        }
    }

    &s[..] // Return a slice of the whole string
}
```
---

### **CHEAT SHEET - PART 2: ADVANCED CONCEPTS**
version 1.0.0

### **Table of Contents**

1.  **Compound Data Structures: `struct` and `enum`**
    *   Defining and Instantiating Structs
    *   Tuple Structs and Unit-like Structs
    *   Defining Enums
    *   The `Option` Enum: Handling Nullability

2.  **Methods and Associated Functions**
    *   Defining Methods on Structs (`impl`)
    *   Associated Functions (like `String::from`)

3.  **Error Handling**
    *   Panicking: Unrecoverable Errors
    *   The `Result` Enum: Recoverable Errors
    *   The Question Mark (`?`) Operator for Error Propagation

4.  **Generics, Traits, and Lifetimes**
    *   Generics: Writing Code for Abstract Types
    *   Traits: Defining Shared Behavior (Interfaces)
    *   Trait Bounds: Constraining Generic Types
    *   Lifetimes: Ensuring References are Valid

5.  **Collections**
    *   `Vec<T>`: A Growable, Heap-Allocated Vector
    *   `HashMap<K, V>`: Storing Key-Value Pairs

---
## 1. Compound Data Structures: `struct` and `enum`

### **Structs**
Structs are custom data types that let you package together and name multiple related values.

```rust
// A classic C-style struct
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

// Tuple Struct: A named tuple. Useful when the field names are redundant.
struct Color(i32, i32, i32);

// Unit-like Struct: A struct with no fields. Useful for implementing traits on a type.
struct AlwaysEqual;

fn main() {
    // Instantiating a struct
    let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    // Accessing and modifying fields (if mutable)
    user1.email = String::from("anotheremail@example.com");

    // Instantiating a Tuple Struct
    let black = Color(0, 0, 0);
    println!("The first value of black is {}", black.0);
}
```

### **Enums and Pattern Matching**
Enums allow you to define a type by enumerating its possible *variants*.

```rust
// An enum can hold different kinds and amounts of data
enum Message {
    Quit, // No data associated
    Move { x: i32, y: i32 }, // Named fields, like a struct
    Write(String), // A single String value
    ChangeColor(i32, i32, i32), // A tuple of values
}

fn process_message(msg: Message) {
    // `match` is an exhaustive control flow operator.
    // It forces you to handle every possible variant of the enum.
    match msg {
        Message::Quit => {
            println!("The Quit variant has no data.");
        }
        Message::Move { x, y } => {
            println!("Move in the x direction {} and y direction {}", x, y);
        }
        Message::Write(text) => {
            println!("Text message: {}", text);
        }
        Message::ChangeColor(r, g, b) => {
            println!("Change the color to red {}, green {}, and blue {}", r, g, b);
        }
    }
}
```

### **The `Option` Enum: Nullability in Rust**
Rust doesn't have `null`. Instead, it has an enum `Option<T>` that encodes the concept of a value being present or absent.

```rust
// Definition of Option<T> from the standard library:
// enum Option<T> {
//     None,
//     Some(T),
// }

fn find_user(id: u32) -> Option<String> {
    if id == 1 {
        Some(String::from("Alice"))
    } else {
        None // Represents the absence of a value
    }
}

fn main() {
    let user = find_user(1);

    // Using `match` to handle an Option is the most robust way
    match user {
        Some(name) => println!("Found user: {}", name),
        None => println!("User not found."),
    }

    // `if let` is concise syntax for handling one variant of an enum
    if let Some(name) = find_user(2) {
        println!("Found user: {}", name);
    } else {
        println!("User 2 not found.");
    }
}
```

---
## 2. Methods and Associated Functions

### **`impl` Blocks**
Methods are functions associated with a specific type. You define them within an `impl` (implementation) block.

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// Implementation block for Rectangle
impl Rectangle {
    // This is a "method". The first parameter is always `self`, `&self`, or `&mut self`.
    // `&self` is a shorthand for `self: &Self`. It borrows the struct instance immutably.
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // Another method
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    // This is an "associated function", not a method, because it doesn't take `self`.
    // These are often used as constructors.
    fn square(size: u32) -> Self {
        Self { width: size, height: size }
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };

    // Method syntax
    println!("The area of the rectangle is {} square pixels.", rect1.area());
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));

    // Associated function syntax (using ::)
    let sq = Rectangle::square(25);
    println!("Created a square: {:?}", sq);
}
```

---
## 3. Error Handling

### **Panics vs. Results**
-   **`panic!`**: For unrecoverable errors. It stops the program, unwinds the stack, and prints an error message. Use it for programming errors, like an index-out-of-bounds access.
-   **`Result<T, E>`**: For recoverable errors. It's an enum for operations that might succeed (returning `Ok(T)`) or fail (returning `Err(E)`).

```rust
// Definition from the standard library:
// enum Result<T, E> {
//     Ok(T),
//     Err(E),
// }

use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let f = File::open("hello.txt");

    let mut f = match f {
        Ok(file) => file,
        Err(e) => return Err(e), // Propagate the error
    };

    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}
```
### **The `?` Operator for Error Propagation**
The `?` operator provides a much more concise way to propagate errors. It can only be used in functions that return a `Result` or an `Option`.

```rust
// Same function as above, but much cleaner with `?`
fn read_username_from_file_concise() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?; // If Ok, unwraps; if Err, returns from function
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
```

---
## 4. Generics, Traits, and Lifetimes

### **Generics: Abstracting Over Types**
Generics allow us to write code that operates on abstract types, avoiding code duplication.

```rust
// A generic function that can take any type `T`
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];
    println!("The largest number is {}", largest(&number_list)); // T is i32

    let char_list = vec!['y', 'm', 'a', 'q'];
    println!("The largest char is {}", largest(&char_list)); // T is char
}
```

### **Traits: Defining Shared Behavior**
A trait defines functionality a particular type has and can share with other types. It's similar to an interface in other languages.

```rust
// A trait that defines behavior for summarizing.
pub trait Summary {
    fn summarize_author(&self) -> String;

    // Traits can also have default implementations.
    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
}

// Implement the `Summary` trait for the `Tweet` type.
impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
    };
    println!("1 new tweet: {}", tweet.summarize());
}
```

### **Lifetimes: Ensuring References Remain Valid**
Lifetimes are a way of telling the Rust compiler how references relate to each other, ensuring that no reference outlives the data it points to. They are part of the function's signature.

```rust
// The generic lifetime parameter `'a` annotates the references.
// It tells Rust that the returned reference will be valid for as long
// as both of the input references are valid.
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}
```

---
## 5. Collections

### **`Vec<T>` (Vector)**
A growable, heap-allocated list.

```rust
// Create a new, empty vector
let mut v: Vec<i32> = Vec::new();

// Create a vector with initial values using the `vec!` macro
let mut v2 = vec![1, 2, 3];

// Add elements
v2.push(5);
v2.push(6);

// Access elements (returns an Option to prevent panics)
match v2.get(2) {
    Some(third) => println!("The third element is {}", third),
    None => println!("There is no third element."),
}

// Iterate over a vector
for i in &v2 {
    println!("{}", i);
}
```

### **`HashMap<K, V>` (Hash Map)**
A collection of key-value pairs, implemented with a hash table.

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

// Insert key-value pairs
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

// Get a value for a key
let team_name = String::from("Blue");
// .get() returns an Option<&V>
let score = scores.get(&team_name);

// Overwriting a value
scores.insert(String::from("Blue"), 25);

// Only inserting if the key has no value
scores.entry(String::from("Red")).or_insert(50);
scores.entry(String::from("Blue")).or_insert(50); // Does nothing

// Iterate over a hash map
for (key, value) in &scores {
    println!("{}: {}", key, value);
}
```

---

### **CHEAT SHEET - PART 3: THE MASTERSTROKE**
version 1.0.0

### **Table of Contents**

1.  **Project Structure & Modules**
    *   Organizing Code into Files and Modules
    *   Visibility (`pub`) and Bringing Paths into Scope (`use`)

2.  **Concurrency: Fearless Parallelism**
    *   Spawning Threads with `thread::spawn`
    *   Sharing State Between Threads with `Arc` and `Mutex`

3.  **Advanced Error Handling with Custom Types**
    *   Creating a Custom `Error` Type
    *   Implementing the `Error` and `Display` Traits
    *   Using `Box<dyn Error>` for Dynamic Errors

4.  **Closures and Iterators**
    *   Closures: Anonymous Functions Capturing Their Environment
    *   Iterators: Lazy, Composable Data Processors

5.  **Putting It All Together: A CLI To-Do App**
    *   Parsing Command-Line Arguments
    *   Reading and Writing to a File (Data Persistence)
    *   Structuring the Application Logic

---
### **Project Structure (Final)**
```
cli-todo/
├── Cargo.toml
└── src/
    ├── main.rs         (Entry point, argument parsing)
    ├── lib.rs          (Main library crate root)
    └── task.rs         (Module for the Task struct and its logic)
```
---
## 1. Project Structure & Modules

In a real project, you don't put all your code in `main.rs`. You separate concerns into modules and often create a library crate that the binary crate uses.

**1. Create a library-and-binary project:**
```bash
cargo new --lib cli-todo
cd cli-todo
# This creates src/main.rs and src/lib.rs
```

**2. Create a module file `src/task.rs`:**
This file will define our `Task`.
```rust
// src/task.rs

use serde::{Deserialize, Serialize}; // We'll add serde later

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Task {
    pub id: u32,
    pub description: String,
    pub completed: bool,
}

impl Task {
    pub fn new(id: u32, description: String) -> Self {
        Self { id, description, completed: false }
    }
}
```

**3. Declare the module in `src/lib.rs`:**
This makes the contents of `task.rs` available to the rest of the library.
```rust
// src/lib.rs
pub mod task; // Declares the 'task' module from task.rs

// We can re-export items to make them easier to access
pub use task::Task;
```

**4. Use the library in `src/main.rs`:**
The binary crate can use items from its corresponding library crate by using the crate's name.
```rust
// src/main.rs
use cli_todo::Task; // Use the Task struct from our library

fn main() {
    let task1 = Task::new(1, "Learn Rust modules".to_string());
    println!("Created a task: {:?}", task1);
}
```

---
## 2. Concurrency: Fearless Parallelism

Rust's ownership model prevents entire classes of common concurrency bugs at compile time.

*   `thread::spawn`: Creates a new thread. The `move` keyword is often used with closures to transfer ownership of variables to the new thread.
*   `Arc<T>` (Atomically Reference Counted): A smart pointer for safe, shared ownership across multiple threads.
*   `Mutex<T>` (Mutual Exclusion): A smart pointer that allows only one thread to access some data at any given time, preventing data races.

```rust
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

fn main() {
    // Arc allows multiple owners, Mutex allows safe mutation.
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for i in 0..5 {
        let counter_clone = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            println!("Thread {} started", i);
            // .lock() acquires the mutex. It might fail, so it returns a Result.
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
            println!("Thread {} incremented counter to {}", i, *num);
            thread::sleep(Duration::from_millis(10));
        });
        handles.push(handle);
    }

    // Wait for all threads to finish.
    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final result: {}", *counter.lock().unwrap());
}
```

---
## 3. Advanced Error Handling with Custom Types

For a robust application, you should define your own error types instead of just propagating `io::Error` or others.

```rust
use std::fmt;
use std::fs;
use std::io;

// Our custom error enum can represent different kinds of failures.
#[derive(Debug)]
pub enum AppError {
    Io(io::Error),
    Parse(serde_json::Error),
    TaskNotFound(u32),
}

// Implement the Display trait to provide user-friendly error messages.
impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::Io(e) => write!(f, "IO Error: {}", e),
            AppError::Parse(e) => write!(f, "Parse Error: {}", e),
            AppError::TaskNotFound(id) => write!(f, "Task with ID {} not found", id),
        }
    }
}

// Allow easy conversion from standard errors into our custom error type.
impl From<io::Error> for AppError {
    fn from(e: io::Error) -> Self {
        AppError::Io(e)
    }
}
impl From<serde_json::Error> for AppError {
    fn from(e: serde_json::Error) -> Self {
        AppError::Parse(e)
    }
}

// A function that returns our custom error type.
fn read_tasks_from_file(path: &str) -> Result<Vec<Task>, AppError> {
    let content = fs::read_to_string(path)?; // The `?` works because of `impl From`
    let tasks = serde_json::from_str(&content)?;
    Ok(tasks)
}
```

---
## 4. Closures and Iterators

*   **Closures:** Anonymous functions that can capture variables from their enclosing scope. `|arg1, arg2| { body }`
*   **Iterators:** Produce a sequence of values. They are *lazy*, meaning they have no effect until you consume them with methods like `collect()`, `for_each()`, `sum()`, etc.

```rust
let numbers = vec![1, 2, 3, 4, 5];

// The `map` iterator adaptor takes a closure.
// The `filter` adaptor takes a closure that returns a boolean.
// The `collect` method consumes the iterator and creates a collection.
let processed_numbers: Vec<_> = numbers
    .iter()
    .map(|&n| n * 2)
    .filter(|&n| n > 5)
    .collect();

println!("{:?}", processed_numbers); // [6, 8, 10]
```

---
## 5. Putting It All Together: The CLI To-Do App

This final step integrates everything. We'll use external crates for argument parsing (`clap`) and serialization (`serde`).

**1. Add dependencies to `Cargo.toml`:**
```toml
[dependencies]
clap = { version = "4.0", features = ["derive"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

**2. The Complete `src/main.rs`:**
```rust
// src/main.rs
use clap::{Parser, Subcommand};
use cli_todo::{tasks::{add_task, complete_task, list_tasks}, AppError};

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand, Debug)]
enum Commands {
    /// Add a new task
    Add { description: String },
    /// List all tasks
    List,
    /// Mark a task as complete
    Done { id: u32 },
}

fn main() -> Result<(), AppError> {
    let cli = Cli::parse();
    let file_path = "tasks.json";

    match cli.command {
        Commands::Add { description } => {
            add_task(file_path, description)?;
            println!("Task added successfully.");
        }
        Commands::List => {
            let tasks = list_tasks(file_path)?;
            if tasks.is_empty() {
                println!("No tasks found.");
            } else {
                for task in tasks {
                    let status = if task.completed { "[x]" } else { "[ ]" };
                    println!("{} {} - {}", status, task.id, task.description);
                }
            }
        }
        Commands::Done { id } => {
            complete_task(file_path, id)?;
            println!("Task {} marked as complete.", id);
        }
    }

    Ok(())
}
```

**3. The Logic in `src/lib.rs` and a new `src/tasks.rs`:**
```rust
// src/tasks.rs
// (This is a simplified version of the logic)
use crate::{AppError, Task};
use std::fs;

fn read_tasks(path: &str) -> Result<Vec<Task>, AppError> {
    let content = fs::read_to_string(path).unwrap_or_else(|_| "[]".to_string());
    let tasks: Vec<Task> = serde_json::from_str(&content)?;
    Ok(tasks)
}

fn write_tasks(path: &str, tasks: &[Task]) -> Result<(), AppError> {
    let content = serde_json::to_string_pretty(tasks)?;
    fs::write(path, content)?;
    Ok(())
}

pub fn add_task(path: &str, description: String) -> Result<(), AppError> {
    let mut tasks = read_tasks(path)?;
    let new_id = tasks.last().map_or(1, |t| t.id + 1);
    tasks.push(Task::new(new_id, description));
    write_tasks(path, &tasks)
}

pub fn list_tasks(path: &str) -> Result<Vec<Task>, AppError> {
    read_tasks(path)
}

pub fn complete_task(path: &str, id: u32) -> Result<(), AppError> {
    let mut tasks = read_tasks(path)?;
    if let Some(task) = tasks.iter_mut().find(|t| t.id == id) {
        task.completed = true;
        write_tasks(path, &tasks)
    } else {
        Err(AppError::TaskNotFound(id))
    }
}
```
*And you would update `lib.rs` to include the `tasks` module, its error type, etc.*

### **How to Run the CLI App:**

1.  Make sure all the files and `Cargo.toml` are set up.
2.  Run `cargo build`.
3.  Execute commands from your terminal in the project's root directory:
    ```bash
    # Add tasks
    ./target/debug/cli-todo add "Master Rust"
    ./target/debug/cli-todo add "Build a CLI app"

    # List tasks
    ./target/debug/cli-todo list
    # Output:
    # [ ] 1 - Master Rust
    # [ ] 2 - Build a CLI app

    # Mark a task as complete
    ./target/debug/cli-todo done 1

    # List again
    ./target/debug/cli-todo list
    # Output:
    # [x] 1 - Master Rust
    # [ ] 2 - Build a CLI app
    ```

This masterstroke guide demonstrates how to structure, build, and run a non-trivial Rust application, leveraging the language's strongest features for safety, concurrency, and performance.
