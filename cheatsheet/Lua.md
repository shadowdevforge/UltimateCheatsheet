# Ultimate Lua Cheatsheet
### **CHEAT SHEET**
version 1.0.0

### **Table of Contents**

1.  **Basic Types & Variables**
2.  **Tables (The All-in-One Data Structure)**
3.  **Control Flow**
4.  **Functions**
5.  **Error Handling**
6.  **Metatables & Metamethods**
7.  **Modules & `require`**
8.  **Coroutines (Cooperative Multitasking)**

**Official Documentation:** [https://www.lua.org/manual/5.4/](https://www.lua.org/manual/5.4/)

---

## 1. Basic Types & Variables

### **Data Types**
Lua has 8 basic types: `nil`, `boolean`, `number`, `string`, `function`, `userdata`, `thread`, and `table`.

```lua
-- nil represents the absence of a value. It's also a type.
local no_value = nil

-- booleans (only nil and false are falsy)
local is_active = true
local is_admin = false

-- numbers (double-precision floating-point by default)
local count = 10
local pi = 3.14

-- strings (mutable)
local name = "Alice"
local greeting = 'Hello, World!'
local long_string = [[
This is a multi-line
string that can contain "quotes" without escaping.
]]

-- String concatenation
local full_greeting = greeting .. " from " .. name
```

### **Variable Scope**
Variables are global by default. **Always use `local`** to limit scope.

```lua
-- Global variable (avoid this)
x = 10

-- Local variable (best practice)
local y = 20

-- Local variables within a block
do
  local z = 30
end
-- z is not accessible here
```

### **Multiple Assignment**
Assign multiple variables from multiple values in one line.

```lua
local a, b = 1, "hello" -- a is 1, b is "hello"

-- Swapping variables is elegant
a, b = b, a
```

---

## 2. Tables (The All-in-One Data Structure)

Tables are the only built-in data structure in Lua. They can behave as arrays, dictionaries (hash maps), objects, and more.

### **Creation & Basic Usage**
```lua
-- Create an empty table
local person = {}

-- Add key-value pairs (like a dictionary)
person["name"] = "Bogdan"
person["age"] = 30

-- Use dot notation for string keys that are valid identifiers
person.active = true

-- Accessing values
print(person.name)       -- "Bogdan"
print(person["age"])     -- 30
```

### **As an Array (List-like)**
Use integer keys, usually starting from 1.

```lua
-- Create a table with array-like elements
local numbers = {10, 20, 30, 40}

-- Access elements (1-based indexing)
print(numbers[1]) -- 10

-- Get the length of the array part
print(#numbers)   -- 4

-- Add an element to the end
table.insert(numbers, 50)
table.remove(numbers, 2) -- Removes 20
```

### **Table Constructor Syntax**
A concise way to initialize tables.

```lua
local user = {
    username = "letslua",
    id = 123,
    tags = {"scripting", "lua"}, -- A nested table
    ["is-admin"] = false -- Use brackets for non-identifier keys
}
```

---
## 3. Control Flow

### **if / then / elseif / else / end**
Note the `then` and `end` keywords.

```lua
local score = 85

if score >= 90 then
    print("Grade: A")
elseif score >= 80 then
    print("Grade: B")
else
    print("Grade: C or lower")
end
```

### **while / do / end**
The loop continues as long as the condition is true.

```lua
local count = 1
while count <= 5 do
    print(count)
    count = count + 1
end
```

### **repeat / until**
The loop executes at least once, then checks the condition.

```lua
local input
repeat
    print("Enter 'quit' to exit.")
    input = io.read()
until input == "quit"
```

### **for loops**
Lua has two types of `for` loops.

```lua
-- 1. Numeric for loop (start, end, optional step)
for i = 1, 5 do
    print(i) -- Prints 1, 2, 3, 4, 5
end

for i = 10, 2, -2 do
    print(i) -- Prints 10, 8, 6, 4, 2
end

-- 2. Generic for loop (for iterating over tables)
local person = {name = "Alice", age = 25}
for key, value in pairs(person) do
    print(key, value)
end

local numbers = {10, 20, 30}
-- Use ipairs for array-like tables in numerical order
for index, value in ipairs(numbers) do
    print(index, value)
end
```
*Note: Lua does not have a `continue` statement.*

---
## 4. Functions

Functions are first-class values; they can be stored in variables, passed as arguments, and returned from other functions.

### **Definition**
```lua
-- Standard definition
function add(a, b)
    return a + b
end

-- Assigning an anonymous function to a variable
local multiply = function(a, b)
    return a * b
end
```

### **Multiple Return Values**
A function can return multiple values.

```lua
function get_user()
    return 101, "admin"
end

local id, role = get_user()
print(id, role) -- 101   admin
```

### **Variadic Functions (`...`)**
Functions that accept a variable number of arguments.

```lua
function sum(...)
    local total = 0
    -- The '...' expression becomes a list of values
    for _, value in ipairs{...} do
        total = total + value
    end
    return total
end

print(sum(1, 2, 3, 4)) -- 10
```

### **Closures**
A function that captures the values of local variables from its enclosing scope.
```lua
function make_counter()
    local count = 0
    return function() -- This inner function is a closure
        count = count + 1
        return count
    end
end

local c1 = make_counter()
print(c1()) -- 1
print(c1()) -- 2
```

---
## 5. Error Handling

### **Raising Errors**
Use `error()` to raise an error and terminate execution.

```lua
function divide(a, b)
    if b == 0 then
        error("Cannot divide by zero.", 2)
    end
    return a / b
end
```

### **Protected Calls (`pcall`)**
"Protected call" runs a function in a protected environment, catching any errors without crashing the script.

```lua
-- pcall returns a status and the result/error message
local status, result = pcall(divide, 10, 2)
-- status: true, result: 5

local status, err_msg = pcall(divide, 10, 0)
-- status: false, err_msg: "Cannot divide by zero."

if status then
    print("Success:", result)
else
    print("Error:", err_msg)
end
```

---
## 6. Metatables & Metamethods

Metatables allow you to change the behavior of tables (the "meta" behavior). They enable operator overloading and are the foundation for Object-Oriented Programming in Lua.

```lua
-- Let's define vector addition for tables
local Vector = {}
Vector.mt = {} -- This will be our metatable

-- The '__add' metamethod is called for the '+' operator
Vector.mt.__add = function(v1, v2)
    local new_v = {x = v1.x + v2.x, y = v1.y + v2.y}
    return new_v
end

function Vector.new(x, y)
    local self = {x = x, y = y}
    setmetatable(self, Vector.mt)
    return self
end

local vec1 = Vector.new(10, 20)
local vec2 = Vector.new(5, 7)

-- This works because of the __add metamethod!
local vec3 = vec1 + vec2
print(vec3.x, vec3.y) -- 15  27

-- The most common metamethod, `__index`, is used for OOP lookups.
-- Vector.mt.__index = Vector -- (To look up methods in the Vector table)
```

---
## 7. Modules & `require`

Organize code into reusable files called modules.

```lua
-- In a file named 'mymath.lua'
local M = {} -- Create a table for the module

function M.add(a, b)
    return a + b
end

function M.subtract(a, b)
    return a - b
end

return M -- Return the module table

-- In another file ('main.lua')
-- 'require' loads and executes a module once, caching the result
local mymath = require("mymath")

print(mymath.add(5, 3))       -- 8
print(mymath.subtract(10, 4)) -- 6
```

---
## 8. Coroutines (Cooperative Multitasking)

Coroutines are like threads that you control manually. They can be paused (`yield`) and resumed.

### **Creating and Running Coroutines**
```lua
-- A function designed to be run in a coroutine
local co = coroutine.create(function(start_val)
    print("Coroutine started with:", start_val)
    local val = start_val
    for i = 1, 3 do
        val = val + 1
        print("Coroutine yielding with:", val)
        coroutine.yield(val) -- Pause execution and return a value
    end
    print("Coroutine finishing.")
    return "done"
end)

print("Main: resuming coroutine")
local status, result = coroutine.resume(co, 10) -- Start with value 10
print("Main:", status, result) -- true  11

print("Main: resuming coroutine again")
status, result = coroutine.resume(co)
print("Main:", status, result) -- true  12

status, result = coroutine.resume(co) -- Resume a third time
status, result = coroutine.resume(co) -- Final resume
print("Main:", status, result) -- true  done

print("Status:", coroutine.status(co)) -- dead
```
