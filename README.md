Here is the professional **README.md** for **SyntaxForge**.

I have refined the "Inspiration" text you provided to match the actual technical architecture we built (JSON-driven content, mouse-tracking glow effects, and the specific file structure).

***

<div align="center">

# SyntaxForge

**The Modern Developer's Syntax Reference**

<a href="https://shadowdevforge.github.io/SyntaxForge/">
  <img src="https://img.shields.io/badge/Status-Live_Forge-a6da95?style=for-the-badge&logo=github" alt="Live Status">
</a>
<a href="#-how-to-extend">
  <img src="https://img.shields.io/badge/Contributions-Welcome-8aadf4?style=for-the-badge&logo=git" alt="Contributions">
</a>
<a href="LICENSE">
  <img src="https://img.shields.io/badge/License-MIT-ed8796?style=for-the-badge" alt="License">
</a>

<br />

**[View the Live Forge](https://shadowdevforge.github.io/SyntaxForge/)**

</div>

<br />

<div align="center">
  <img width="100%" alt="SyntaxForge Preview" src="https://github.com/user-attachments/assets/8059a8e9-04f1-4de2-a704-289c6fde09ce" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</div>

<br />

## 🔥 About The Project

**SyntaxForge** is a curated collection of direct, "one-way-go" cheat sheets for essential programming languages. It cuts through the noise of documentation to provide the idiomatic syntax you need to be productive immediately.

Our philosophy is built on the **"Novice to Grandmaster"** progression. Instead of a flat list of commands, every guide is structured to take you from `Hello World` to `Advanced System Architecture`.

### Core Principles
*   **Direct & Practical:** No fluff. Just the code patterns you need.
*   **Aesthetic First:** Built on the **Catppuccin Macchiato** palette to reduce eye strain and look beautiful.
*   **Systems Focused:** Prioritizing languages like Rust, C, Go, and Zig.
*   **Modular Architecture:** Content is separated from logic via JSON, making it trivial to extend.

---

## ✨ Features

*   **🎨 Catppuccin Theming**: Fully styled with the Macchiato palette for a cohesive, high-contrast dark mode experience.
*   **💡 Ambient Glow**: Custom mouse-tracking CSS engine that creates dynamic lighting effects on cards based on the language's brand color.
*   **🧱 JSON-Driven Content**: Every cheat sheet is generated dynamically from a simple `content.json` file.
*   **⚡ Zero-Build**: Built with Vanilla JS and CSS. No Webpack, no React, no `node_modules`. Just raw performance.
*   **🌈 Syntax Highlighting**: Integrated `Highlight.js` with custom CSS overrides to match the Catppuccin theme perfectly.

---

## 🛠️ Tech Stack

*   **Core**: Semantic HTML5, Modern CSS3 (Grid/Flexbox), Vanilla JavaScript (ES6+).
*   **Highlighter**: [Highlight.js](https://highlightjs.org/) (Auto-detects language).
*   **Icons**: SVG (Feather Icons style).
*   **Font**: Inter (UI) & JetBrains Mono (Code).

---

## 🚀 Getting Started

To run the forge locally, you just need a static file server.

### Using Python (Built-in)
```bash
# Clone the repository
git clone https://github.com/shadowdevforge/SyntaxForge.git ~/shadowforge

# Navigate to directory
cd ~/shadowforge/SyntaxForge

# Start server
python3 -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Using VS Code
Simply install the **Live Server** extension and click "Go Live" on `index.html`.

---

## 🔨 How to Extend the Forge

SyntaxForge is designed to be extended. Adding a new language (e.g., `TypeScript`) takes 3 steps:

### 1. Create the Directory
Create a folder in the root directory with the language name (e.g., `typescript/`).

### 2. Add the Content
Create `typescript/content.json`. Define the color, icon, and sections (Novice, Apprentice, etc.).

```json
{
    "meta": {
        "language": "TypeScript",
        "description": "JavaScript with syntax for types.",
        "color": "#b7bdf8", 
        "icon": "URL_TO_ICON"
    },
    "sections": [
        {
            "level": "I. Novice",
            "topics": [
                {
                    "title": "Basic Types",
                    "desc": "Defining strings and numbers.",
                    "code": "let isDone: boolean = false;\nlet decimal: number = 6;"
                }
            ]
        }
    ]
}
```

### 3. Add the Engine
Copy the standard `index.html` template (from `rust/index.html` or `c/index.html`) into your new folder. No code changes are needed in this file; it automatically loads `content.json`.

### 4. Link it
Open the main `index.html` in the root directory and add the entry to the `guides` array script:

```javascript
const guides = [
    // ... existing guides
    {
        title: "TypeScript",
        desc: "JavaScript with syntax for types.",
        path: "typescript/index.html",
        color: "var(--lavender)",
        category: "Web & Frontend"
    }
];
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  
  **Forged by [ShadowDevForge](https://github.com/shadowdevforge)**
  
  *Code is the hammer, logic is the anvil.*

</div>
