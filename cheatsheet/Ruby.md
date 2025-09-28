# Ultimate Ruby Cheatsheet
### **CHEAT SHEET**
version 1.0.0

### **Table of Contents**

1.  **The Ruby Foundation**
    *   Running Ruby Code
    *   Variables, Constants & Data Types
    *   String Interpolation & Common String Methods
    *   Getting User Input

2.  **Core Data Structures**
    *   Arrays: Ordered Lists
    *   Hashes: Key-Value Pairs
    *   Symbols: The Efficient String

3.  **Control Flow & Logic**
    *   `if`/`elsif`/`else` Conditionals (and `unless`)
    *   Ternary Operator & Inline Conditionals
    *   `case` Statements

4.  **Methods & Blocks**
    *   Defining and Calling Methods
    *   Implicit Return
    *   Blocks, Procs, and Lambdas: The Soul of Ruby

5.  **Loops & Iterators**
    *   The `.each` Iterator (The Ruby Way)
    *   `while` and `until` Loops
    *   The `loop` Method

6.  **Classes & Objects (OOP)**
    *   Defining a Class
    *   `initialize`, Instance Variables (`@`), and Methods
    *   Attribute Accessors (`attr_reader`, `attr_writer`, `attr_accessor`)
    *   Inheritance (`<`)

7.  **Gems & Bundler**
    *   Managing Dependencies

---
## 1. The Ruby Foundation

### **Running Ruby Code**
*   **Interactive Ruby (IRB):** `irb` in your terminal for a live session.
*   **From a file:** Save code in a file (e.g., `my_script.rb`) and run `ruby my_script.rb`.

```ruby
#!/usr/bin/env ruby
# Shebang for executable scripts

# `puts` prints a string followed by a newline.
puts "Hello, Ruby!"
```

### **Variables, Constants & Data Types**
-   Variable names use `snake_case`.
-   Constants start with an `Uppercase` letter.
-   Everything in Ruby is an object.

```ruby
# Variables
my_name = "Alice"
age = 30
is_active = true
price = 19.99

# Constants
PI = 3.14159

# Common types (all are objects)
# Integer, Float, String, Boolean (true/false), NilClass (nil)
# nil is the representation of nothingness.
result = nil
```

### **String Interpolation & Common Methods**
-   Double quotes (`"..."`) allow for interpolation (`#{...}`).
-   Single quotes (`'...'`) are literal.

```ruby
user = "Bob"
# String interpolation
greeting = "Welcome, #{user}!"
puts greeting

# Common String methods (many have a `!` variant that modifies the string in-place)
puts "hello".upcase          # "HELLO"
puts "WORLD".downcase        # "world"
puts "  some text  ".strip   # "some text"
puts greeting.include?("Bob") # true
puts "a,b,c".split(',')      # ["a", "b", "c"]
```

### **Getting User Input**
`gets` reads a line from the user, and `.chomp` removes the trailing newline.

```ruby
print "What is your name? " # `print` does not add a newline
name = gets.chomp
puts "Nice to meet you, #{name}!"
```

---
## 2. Core Data Structures

### **Arrays**
Ordered, integer-indexed collections of any object.

```ruby
# Creation
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", true, nil]
empty = []

# Accessing elements (0-indexed)
puts numbers[0]     # 1
puts numbers[-1]    # 5 (last element)

# Adding elements
numbers << 6        # Shovel operator: [1, 2, 3, 4, 5, 6]
numbers.push(7)     # [1, 2, 3, 4, 5, 6, 7]

# Removing elements
numbers.pop         # Removes and returns 7

# Useful methods
puts numbers.length # 6
puts numbers.first  # 1
puts numbers.last   # 6
```

### **Hashes**
A collection of key-value pairs. Similar to dictionaries or maps.

```ruby
# Creation (modern "rocketless" syntax with symbols)
person = {
  name: "Bogdan",
  age: 30,
  is_admin: true
}

# Creation (classic "hash rocket" syntax)
old_style = { "name" => "Charlie", "age" => 25 }

# Accessing values
puts person[:name] # "Bogdan" (using the symbol :name as key)

# Adding/modifying pairs
person[:city] = "New York"
person[:age] = 31

# Useful methods
puts person.keys    # [:name, :age, :is_admin, :city]
puts person.values  # ["Bogdan", 31, true, "New York"]
puts person.key?(:email) # false
```

### **Symbols**
Lightweight, immutable strings, often used as hash keys or identifiers for efficiency. They are prefixed with a colon (`:`).

```ruby
:name # This is a symbol
:success
```

---
## 3. Control Flow & Logic

### **`if`/`elsif`/`else` Conditionals**
-   Only `false` and `nil` are "falsy" in Ruby. Everything else (including `0`, `""`, and `[]`) is "truthy".

```ruby
score = 85

if score >= 90
  puts "Grade: A"
elsif score >= 80
  puts "Grade: B"
else
  puts "Grade: C or lower"
end

# `unless` is the opposite of `if`
is_logged_in = false
puts "Please log in." unless is_logged_in
```

### **Ternary & Inline Conditionals**
```ruby
# Ternary operator
result = score >= 60 ? "Pass" : "Fail"
puts result

# Inline/modifier conditional
puts "Congratulations!" if score > 95
```

### **`case` Statements**
A clean way to handle multiple conditions.

```ruby
grade = "B"

case grade
when "A"
  puts "Excellent!"
when "B"
  puts "Good job."
when "C"
  puts "You can do better."
else
  puts "Invalid grade."
end
```

---
## 4. Methods & Blocks

### **Defining and Calling Methods**
-   Method names also use `snake_case`.
-   Parentheses for arguments are often optional.

```ruby
def greet(name, punctuation = "!")
  "Hello, #{name}#{punctuation}"
end

# Calling the method
puts greet("World")
puts greet("Ruby", "!!!")
```

### **Implicit Return**
The last evaluated expression in a method is automatically returned. The `return` keyword is optional.

```ruby
def add(a, b)
  a + b # This value is returned
end

sum = add(5, 3) # sum is 8
```

### **Blocks, Procs, and Lambdas**
A **block** is a chunk of code that can be passed to a method. This is Ruby's most distinctive feature and is used everywhere for iteration and callbacks.

```ruby
# A method that accepts a block using `yield`
def run_task
  puts "Starting task..."
  yield # This executes the block passed to the method
  puts "Task finished."
end

run_task { puts "Doing the work inside the block!" }

# Passing arguments to a block
def with_name(name)
  yield(name.upcase)
end

with_name("Alice") { |n| puts "The name in uppercase is #{n}" }
```

---
## 5. Loops & Iterators

### **The `.each` Iterator (The Ruby Way)**
Iterating with blocks is the most common and idiomatic way to loop in Ruby.

```ruby
fruits = ["apple", "banana", "cherry"]

# The .each method iterates over each element, passing it to the block
fruits.each do |fruit|
  puts "I love #{fruit}s."
end

# Single-line blocks use curly braces {}
(1..5).each { |num| print "#{num} " } # Prints "1 2 3 4 5 "
```

### **`while` and `until` Loops**
```ruby
# while loop
count = 1
while count <= 5
  puts "Count: #{count}"
  count += 1
end

# until loop (runs until the condition is true)
power_level = 1
until power_level > 9000
  power_level *= 2
end
```

---
## 6. Classes & Objects (OOP)

### **Defining a Class**
-   Class names use `CamelCase`.
-   Instance variables start with `@`.

```ruby
class User
  # attr_accessor creates getter and setter methods for us
  attr_accessor :name, :email

  # The constructor method
  def initialize(name, email)
    @name = name   # Instance variable
    @email = email
    @logged_in_at = Time.now
  end

  # An instance method
  def greet
    "Hello, my name is #{@name}."
  end
end

# Creating an object (an instance of the class)
user1 = User.new("Dev", "dev@example.com")

# Using the methods
puts user1.greet         # "Hello, my name is Dev."
user1.name = "Developer" # Using the setter from attr_accessor
puts user1.name          # "Developer"
```

### **Inheritance**
A class can inherit behavior from a parent class using `<`.

```ruby
class Admin < User
  # Inherits initialize, name, email, and greet from User
  def announce
    "I am an admin named #{@name}!"
  end
end

admin = Admin.new("Superuser", "admin@corp.com")
puts admin.greet     # Method from parent class
puts admin.announce  # Method from its own class
```

---
## 7. Gems & Bundler

**Gems** are libraries of code you can use in your projects. **Bundler** is the tool for managing gem dependencies.

**1. Create a `Gemfile` in your project root:**
```ruby
# Gemfile
source 'https://rubygems.org'

# Declare the gems your project needs
gem 'httparty', '~> 0.20'
gem 'rspec'
```

**2. Install the gems:**
```bash
# In your terminal
bundle install
```

**3. Use the gems in your script:**
Bundler makes the gems available to your application.
```ruby
# my_script.rb
require 'httparty' # `require` loads the gem

response = HTTParty.get('http://api.open-notify.org/astros.json')
puts response.body
```

**4. Run your script using Bundler:**
```bash
bundle exec ruby my_script.rb
```
