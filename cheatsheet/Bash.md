# Ultimate Bash Cheatsheet
### **CHEAT SHEET**
version 1.0.0

### **Table of Contents**

1.  **The Scripting Foundation**
    *   The Shebang & Permissions
    *   Variables & Quoting
    *   Command Substitution & Arithmetic
    *   Reading User Input

2.  **Control Flow**
    *   `if`/`then`/`else` Conditionals
    *   File & String Tests
    *   `case` Statements

3.  **Loops**
    *   `for` Loops (Iterating over lists, ranges, C-style)
    *   `while` Loops (Looping until a condition is false)
    *   `until` Loops (Looping until a condition is true)

4.  **Functions**
    *   Defining and Calling Functions
    *   Positional Parameters & Return Status

5.  **Working with Data**
    *   Arrays (Indexed & Associative)
    *   Pipes (`|`) & Redirection (`>`, `>>`, `<`)

6.  **Scripting Best Practices**
    *   Unofficial Strict Mode (`set -euo pipefail`)
    *   Comments & Readability

---
## 1. The Scripting Foundation

### **The Shebang & Permissions**
Every Bash script should start with a "shebang" to specify which interpreter to use.

```bash
#!/bin/bash
# A shebang pointing to the Bash interpreter.
# Use `#!/usr/bin/env bash` for better portability.

# This is a comment.

echo "Hello, World!"
```

**Making the script executable:** Before you can run the script, you must give it execute permissions.
```bash
# In your terminal
chmod +x your_script.name.sh

# To run it
./your_script_name.sh
```

### **Variables & Quoting**
-   No spaces around the `=` for assignment.
-   **Always quote your variables** (`"$VAR"`) to prevent word splitting and globbing issues.
-   Single quotes (`'...'`) prevent all expansion. Double quotes (`"..."`) allow variable and command substitution.

```bash
# Variable assignment
NAME="Alice"
AGE=30

# Using variables (quoting is crucial!)
echo "User: $NAME"
echo "Age: $AGE"

# Single quotes prevent expansion
echo 'This will print $NAME literally'
```

### **Command Substitution & Arithmetic**
Capture the output of a command into a variable.

```bash
# Modern syntax: $(...)
CURRENT_DATE=$(date +"%Y-%m-%d")
echo "Today's date is $CURRENT_DATE"

# Arithmetic expansion: $((...))
SUM=$(( 5 + 10 ))
echo "5 + 10 = $SUM"

# Can use variables in arithmetic
X=100
Y=25
DIFFERENCE=$(( X - Y ))
echo "Difference is $DIFFERENCE"
```

### **Reading User Input**
The `read` command pauses the script and waits for the user to type something.

```bash
echo "What is your name?"
read USER_NAME

echo "Hello, $USER_NAME!"

# The -p flag provides a prompt on the same line
read -p "Enter your favorite color: " COLOR
echo "$COLOR is a great color."
```

---
## 2. Control Flow

### **`if`/`then`/`else` Conditionals**
-   The condition goes inside `[[ ... ]]` (modern, preferred) or `[ ... ]` (classic, less safe).
-   Pay attention to spaces: `[[` must be followed by a space, and `]]` must be preceded by one.

```bash
read -p "Enter a number: " NUMBER

if [[ "$NUMBER" -gt 100 ]]; then
    echo "That's a big number!"
elif [[ "$NUMBER" -eq 42 ]]; then
    echo "That's the answer to everything."
else
    echo "That's a normal number."
fi # `if` blocks are closed with `fi` (if backwards)
```

### **File & String Tests (Common Conditions)**

| Operator | Description (inside `[[ ... ]]`)          |
| :------- | :----------------------------------------- |
| `-f file`| True if `file` exists and is a regular file. |
| `-d dir` | True if `dir` exists and is a directory.   |
| `-e path`| True if `path` exists (file or directory). |
| `-z str` | True if string `str` is empty.             |
| `-n str` | True if string `str` is not empty.         |
| `str1 == str2` | True if strings are equal.           |
| `str1 != str2` | True if strings are not equal.       |
| `num1 -eq num2`| Equal (for integers).                |
| `num1 -ne num2`| Not equal.                           |
| `num1 -gt num2`| Greater than.                        |
| `num1 -lt num2`| Less than.                           |

```bash
FILE_PATH="/etc/hosts"
if [[ -f "$FILE_PATH" ]]; then
    echo "$FILE_PATH exists."
fi

USERNAME="admin"
if [[ "$USERNAME" == "admin" && "$UID" -eq 0 ]]; then
    echo "Welcome, root administrator."
fi
```

### **`case` Statements**
Useful for matching a variable against several patterns.

```bash
read -p "Enter 'start', 'stop', or 'status': " ACTION

case "$ACTION" in
    start)
        echo "Starting service..."
        ;;
    stop)
        echo "Stopping service..."
        ;;
    status)
        echo "Service is running."
        ;;
    *) # Wildcard for any other value
        echo "Invalid command. Please use start, stop, or status."
        ;;
esac # `case` is closed with `esac` (case backwards)
```

---
## 3. Loops

### **`for` Loops**
```bash
# 1. Iterating over a list of items
FILES="file1.txt file2.txt file3.txt"
for FILENAME in $FILES; do # Note: word splitting is intentional here
    echo "Processing $FILENAME"
done

# 2. Iterating over an array (safer)
SERVICES=("nginx" "mysql" "redis")
for SERVICE in "${SERVICES[@]}"; do
    echo "Checking service: $SERVICE"
done

# 3. C-style for loop
for (( i=1; i<=5; i++ )); do
    echo "Count: $i"
done
```

### **`while` Loops**
Loops as long as a condition is true.
```bash
COUNTER=1
while [[ "$COUNTER" -le 5 ]]; do
    echo "While loop count: $COUNTER"
    # Don't forget to change the condition variable!
    COUNTER=$(( COUNTER + 1 ))
done
```

### **`until` Loops**
Loops as long as a condition is false (i.e., until it becomes true).
```bash
COUNT=1
until [[ "$COUNT" -gt 5 ]]; do
    echo "Until loop count: $COUNT"
    COUNT=$(( COUNT + 1 ))
done
```

---
## 4. Functions

Functions help organize code into reusable blocks.
-   Variables inside functions are global by default; use `local` for local scope.
-   Functions return an "exit status" (0 for success, 1-255 for failure), not values. To get a value, use command substitution.

```bash
# Function definition
greet() {
    local NAME="$1" # $1 is the first argument passed to the function
    local AGE="$2"  # $2 is the second argument
    echo "Hello, $NAME! You are $AGE years old."
}

# Calling the function
greet "Bob" 42

# Function that returns a value via echo
get_current_user() {
    whoami # Echo the output
}

# Capture the function's output
CURRENT_USER=$(get_current_user)
echo "Script is being run by: $CURRENT_USER"
```

---
## 5. Working with Data

### **Arrays**
```bash
# Indexed array
declare -a FRUITS=("Apple" "Banana" "Cherry")

# Access an element (0-indexed)
echo "First fruit is: ${FRUITS[0]}"

# Access all elements
echo "All fruits: ${FRUITS[@]}"

# Add an element
FRUITS+=("Dragonfruit")

# Get the number of elements
echo "There are ${#FRUITS[@]} fruits."
```

### **Pipes (`|`) & Redirection**
This is the core philosophy of the shell: chain simple commands together to do complex things.

-   **Pipe (`|`)**: Sends the standard output of one command to the standard input of another.
-   **Redirect Output (`>`)**: Sends output to a file (overwrites the file).
-   **Append Output (`>>`)**: Appends output to a file.
-   **Redirect Input (`<`)**: Reads input from a file.

```bash
# List all files, find lines containing "log", and count them
ls -l | grep "log" | wc -l

# Save the list of running processes to a file
ps aux > process_list.txt

# Add a new entry to a log file
echo "$(date): User logged in" >> app.log

# Read a file line by line with a while loop
while read -r LINE; do
    echo "Read line: $LINE"
done < /etc/hosts
```

---
## 6. Scripting Best Practices

### **Unofficial Strict Mode**
Start every script with this line to make it safer and more robust.

```bash
#!/bin/bash
set -euo pipefail

# -e: Exit immediately if a command exits with a non-zero status.
# -u: Treat unset variables as an error when substituting.
# -o pipefail: The return value of a pipeline is the status of the last
#              command to exit with a non-zero status, or zero if no
#              command exited with a non-zero status.
```

This prevents common bugs, like a script continuing after a critical command has failed.
