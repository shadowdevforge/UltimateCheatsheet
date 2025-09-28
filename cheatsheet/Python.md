# Ultimate Python Cheatsheet 
### **CHEAT SHEET**
version 1.0.0

### **Table of Contents**

1.  **Basic Types & Variables**
2.  **Data Structures (Collections)**
3.  **Control Flow**
4.  **Functions & Lambdas**
5.  **Error Handling**
6.  **Classes & Objects (OOP)**
7.  **Comprehensions & Generators**
8.  **Context Managers**
9.  **Modules, Packages & Imports**

**Official Documentation:** [https://docs.python.org/3/](https://docs.python.org/3/)

---

## 1. Basic Types & Variables

### **Numeric Types**
`int`, `float`, `complex`
```python
# Integers
count = 10
large_number = 100_000_000

# Floats
pi = 3.14159

# Complex numbers
c = 2 + 3j
```

### **Boolean**
`True` or `False` (case-sensitive)
```python
is_active = True
is_admin = False
```

### **Strings**
Immutable sequence of Unicode characters.
```python
# String creation
name = "Alice"
greeting = 'Hello, World!'
multi_line = """This is a
multi-line string."""

# f-strings (formatted string literals)
age = 30
message = f"{name} is {age} years old."
# -> "Alice is 30 years old."

# String methods
print(name.upper()) # "ALICE"
print(greeting.split(',')) # ['Hello', ' World!']
```

### **None Type**
Represents the absence of a value.
```python
result = None
```

### **Variable Assignment & Type Hinting**
Python is dynamically typed, but supports optional static type hints.
```python
# Standard assignment
x = 5
y = "Python"

# Multiple assignment
a, b = 10, 20

# Type hinting (for readability and static analysis)
user_id: int = 123
username: str = "bogdan"
```

### **Mutability & Immutability**
- **Immutable:** Cannot be changed after creation (int, float, str, tuple).
- **Mutable:** Can be changed after creation (list, dict, set).

```python
# Strings are immutable
my_str = "hello"
# my_str[0] = 'H' # This will raise a TypeError

# Lists are mutable
my_list = [1, 2, 3]
my_list[0] = 100 # This is valid
```

---

## 2. Data Structures (Collections)

### **List**
Ordered, mutable sequence.
```python
# Creation
numbers = [1, 2, 3, 4, 5]
empty_list = []

# Access (indexing and slicing)
first = numbers[0]     # 1
last = numbers[-1]     # 5
subset = numbers[1:4]  # [2, 3, 4]

# Modification
numbers.append(6)      # [1, 2, 3, 4, 5, 6]
numbers.pop()          # Removes and returns 6
```

### **Tuple**
Ordered, immutable sequence.
```python
# Creation
coordinates = (10.0, 20.0)
person = ("Alice", 30)

# Access is the same as lists
x = coordinates[0]

# Unpacking
name, age = person
```

### **Dictionary**
Unordered (in older Python versions) key-value pairs. Mutable.
```python
# Creation
user = {
    "username": "bogdan",
    "active": True
}

# Access
print(user["username"]) # "bogdan"

# Safe access with .get()
print(user.get("email")) # None
print(user.get("email", "not found")) # "not found"

# Modification
user["active"] = False
user["email"] = "bogdan@example.com"
```

### **Set**
Unordered collection of unique elements. Mutable.
```python
# Creation
tags = {"python", "rust", "dev"}
unique_numbers = set([1, 2, 2, 3, 1]) # {1, 2, 3}

# Operations
tags.add("go")
tags.remove("rust")

# Set math
set_a = {1, 2, 3}
set_b = {3, 4, 5}
print(set_a | set_b) # Union: {1, 2, 3, 4, 5}
print(set_a & set_b) # Intersection: {3}
```
---
## 3. Control Flow

### **if, elif, else**
```python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Grade: C or lower")
```

### **Ternary Operator**
A one-line conditional expression.
```python
result = "Pass" if score >= 60 else "Fail"
```

### **for loop**
Iterates over a sequence.
```python
# Looping through a list
names = ["Alice", "Bob", "Charlie"]
for name in names:
    print(f"Hello, {name}")

# Using range()
for i in range(5): # 0, 1, 2, 3, 4
    print(i)

# Using enumerate() for index and value
for index, name in enumerate(names):
    print(f"{index}: {name}")
```

### **while loop**
Executes as long as a condition is true.
```python
count = 0
while count < 5:
    print(count)
    count += 1
```

### **Loop Control Statements**
`break`, `continue`, and `else` on loops.
```python
for num in range(10):
    if num == 3:
        continue # Skip this iteration
    if num == 7:
        break    # Exit the loop entirely
    print(num)
else:
    # This block runs ONLY if the loop
    # completes without hitting 'break'
    print("Loop finished normally")
```
---
## 4. Functions & Lambdas

### **Function Definition**
```python
def greet(name: str) -> str:
    """A simple function with type hints."""
    return f"Hello, {name}!"
```

### **Arguments**
- **Positional:** Order matters.
- **Keyword:** Order doesn't matter.
- **Default:** Provides a fallback value.
```python
def create_user(username, active=True, admin=False):
    # ... function logic ...
    print(f"User: {username}, Active: {active}, Admin: {admin}")

# Using positional and keyword arguments
create_user("Alice", admin=True)
```

### ***args and **kwargs**
For accepting an arbitrary number of arguments.
```python
def process_data(*args, **kwargs):
    print(f"Positional args (tuple): {args}")
    print(f"Keyword args (dict): {kwargs}")

process_data(1, 2, "a", user="Bob", status="online")
# Positional args (tuple): (1, 2, 'a')
# Keyword args (dict): {'user': 'Bob', 'status': 'online'}
```

### **Lambda (Anonymous) Functions**
Small, one-line functions.
```python
# A lambda that adds two numbers
add = lambda x, y: x + y
print(add(5, 3)) # 8

# Often used for sorting or mapping
points = [(1, 2), (4, 1), (3, 5)]
points.sort(key=lambda p: p[1]) # Sort by the second element
# -> [(4, 1), (1, 2), (3, 5)]
```
---
## 5. Error Handling

### **try / except / else / finally**
Gracefully handle exceptions (errors).
```python
try:
    # Code that might raise an error
    value = 10 / 0
except ZeroDivisionError as e:
    # Handle a specific error
    print(f"Error: Cannot divide by zero. ({e})")
except (TypeError, ValueError):
    # Handle multiple error types
    print("A type or value error occurred.")
except Exception as e:
    # A general catch-all for other exceptions
    print(f"An unexpected error occurred: {e}")
else:
    # Runs only if NO exception was raised in 'try'
    print("Division successful.")
finally:
    # Always runs, regardless of exceptions
    print("Execution complete.")
```

### **Raising Exceptions**
Manually trigger an error.
```python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative.")
    # ...
```
---
## 6. Classes & Objects (OOP)

### **Class Definition**
The blueprint for creating objects.
```python
class User:
    # Class attribute (shared by all instances)
    species = "Homo sapiens"

    # Constructor method (__init__)
    def __init__(self, username: str, email: str):
        # Instance attributes
        self.username = username
        self.email = email
        self.is_active = True

    # Instance method
    def greet(self):
        return f"Hello, my name is {self.username}."

    # Class method
    @classmethod
    def from_string(cls, user_string):
        """Alternative constructor."""
        username, email = user_string.split(',')
        return cls(username, email) # Calls __init__

    # Static method (no access to cls or self)
    @staticmethod
    def is_valid_email(email):
        return "@" in email

# Instantiation
user1 = User("Alice", "alice@example.com")
print(user1.greet())

# Using a class method
user2 = User.from_string("Bob,bob@example.com")
```

### **Inheritance**
Create a new class from an existing one.
```python
class AdminUser(User): # AdminUser inherits from User
    def __init__(self, username, email, permissions_level):
        # Call the parent class's constructor
        super().__init__(username, email)
        self.permissions_level = permissions_level

    # Overriding a method
    def greet(self):
        base_greeting = super().greet()
        return f"{base_greeting} I am an admin."

admin = AdminUser("Charlie", "charlie@dev.com", 5)
print(admin.greet())
```
---
## 7. Comprehensions & Generators

### **List Comprehension**
Concise way to create lists.
`[expression for item in iterable if condition]`
```python
# Create a list of squares
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Create a list of even squares
even_squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]
```

### **Dict and Set Comprehensions**
Similar syntax for dictionaries and sets.
```python
# Dictionary comprehension
square_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Set comprehension
unique_squares = {x**2 for x in [1, -1, 2, -2]}
# {1, 4}
```

### **Generator Expressions**
Create iterators that yield items one by one (memory efficient).
```python
# Note the parentheses instead of square brackets
lazy_squares = (x**2 for x in range(1_000_000))

# The values are computed on-demand
print(next(lazy_squares)) # 0
print(next(lazy_squares)) # 1
```

### **Generator Functions**
Functions that `yield` values, creating an iterator.
```python
def count_up_to(max_val):
    count = 1
    while count <= max_val:
        yield count
        count += 1

counter = count_up_to(3)
for num in counter:
    print(num) # Prints 1, then 2, then 3
```
---
## 8. Context Managers (`with` statement)

Ensures resources are properly managed (e.g., files are closed).

```python
# The 'with' statement handles opening and closing the file
try:
    with open("my_file.txt", "w") as f:
        f.write("Hello, context manager!")
    # The file is automatically closed here, even if errors occur
except IOError as e:
    print(f"File error: {e}")

# This is equivalent to a try...finally block:
# f = open(...)
# try:
#     f.write(...)
# finally:
#     f.close()
```

---

## 9. Modules, Packages & Imports

### **Basic Import**
Import an entire module.
```python
import math

print(math.pi)
print(math.sqrt(16))
```

### **Importing Specific Items**
Import specific functions or variables from a module.
```python
from math import pi, sqrt

print(pi)
print(sqrt(16))
```

### **Aliasing Imports**
Give an imported module or item a shorter name.
```python
import numpy as np
from collections import Counter as Cnt

arr = np.array([1, 2, 3])
counts = Cnt(['a', 'b', 'a', 'c', 'a'])
```

### **The `if __name__ == "__main__"` Block**
Code inside this block only runs when the script is executed directly (not when imported).
```python
# my_module.py

def main_function():
    print("This is the main function.")

def helper_function():
    print("This is a helper.")

if __name__ == "__main__":
    # This code is for direct execution
    print("Script is being run directly.")
    main_function()

# If another script does `import my_module`,
# the code in the 'if' block will NOT run.
```
