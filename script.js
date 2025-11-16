document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher (unchanged) ---
    const themeToggle = document.getElementById('theme-toggle');
    const docElement = document.documentElement;
    const applyTheme = (theme) => {
        docElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark';
    };
    const preferredTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(preferredTheme);
    themeToggle.addEventListener('change', () => {
        applyTheme(themeToggle.checked ? 'dark' : 'light');
    });

    // --- CMatrix Background (unchanged) ---
    const canvas = document.getElementById('cmatrix');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let columns = Math.floor(width / 20);
        const drops = Array(columns).fill(1);
        const japanese = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
        const drawMatrix = () => {
            ctx.fillStyle = getComputedStyle(docElement).getPropertyValue('--bg-translucent').replace('0.5', '0.05');
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = getComputedStyle(docElement).getPropertyValue('--green');
            ctx.font = '15px monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = japanese[Math.floor(Math.random() * japanese.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);
                if (drops[i] * 20 > height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };
        setInterval(drawMatrix, 40);
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            const newColumns = Math.floor(width / 20);
            if (newColumns > columns) {
                for (let i = columns; i < newColumns; i++) drops.push(1);
            } else if (newColumns < columns) {
                drops.length = newColumns;
            }
            columns = newColumns;
        });
    }

    // --- Language Card Data with Official Logo Colors ---
    const languages = [
        { name: 'Rust', slug: 'rust', description: 'A systems programming language focused on safety, speed, and concurrency.', category: 'Systems & Backend', color: '#F74C00' /* Orange */ },
        { name: 'Go', slug: 'go', description: 'A statically typed, compiled language for building simple, reliable, and efficient software.', category: 'Systems & Backend', color: '#00ADD8' /* Blue */ },
        { name: 'C', slug: 'c', description: 'A general-purpose, procedural computer programming language supporting structured programming.', category: 'Systems & Backend', color: '#A8B9CC' /* Grey-Blue */ },
        { name: 'Python', slug: 'python', description: 'A high-level, interpreted language known for its readability and large standard library.', category: 'Scripting & Automation', color: '#FFD43B' /* Yellow */ },
        { name: 'Lua', slug: 'lua', description: 'A lightweight, high-level, multi-paradigm programming language designed for embedded use.', category: 'Scripting & Automation', color: '#000080' /* Dark Blue */ },
        { name: 'Bash', slug: 'bash', description: 'A Unix shell and command language, perfect for scripting and system administration tasks.', category: 'Scripting & Automation', color: '#4EAA25' /* Green */ },
        { name: 'HTML', slug: 'html', description: 'The standard markup language for documents designed to be displayed in a web browser.', category: 'Web & Frontend', color: '#E34F26' /* Orange-Red */ },
        { name: 'CSS', slug: 'css', description: 'A style sheet language used for describing the presentation of a document written in HTML.', category: 'Web & Frontend', color: '#1572B6' /* Blue */ },
        { name: 'JavaScript', slug: 'javascript', description: 'A high-level language that conforms to the ECMAScript specification, essential for web development.', category: 'Web & Frontend', color: '#F7DF1E' /* Yellow */ },
        { name: 'TypeScript', slug: 'typescript', description: 'A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.', category: 'Web & Frontend', color: '#3178C6' /* Blue */ },
        { name: 'SvelteKit', slug: 'sveltekit', description: 'A web framework for building robust, high-performance web applications of all sizes.', category: 'Web & Frontend', color: '#FF3E00' /* Svelte Orange */ },
    ];

    // --- Card Rendering (unchanged) ---
    const languageGrid = document.getElementById('language-grid');
    if (languageGrid) {
        const basePath = '/SyntaxForge';
        const groupedLanguages = languages.reduce((acc, lang) => {
            (acc[lang.category] = acc[lang.category] || []).push(lang);
            return acc;
        }, {});
        let gridHTML = '';
        for (const category in groupedLanguages) {
            gridHTML += `<section class="category-section" data-category="${category}"><h2 class="category-title">${category}</h2><div class="language-grid">`;
            groupedLanguages[category].forEach(lang => {
                gridHTML += `
                    <a href="${basePath}/cheatsheets/${lang.slug}" 
                       class="lang-card" 
                       style="--glow-color: ${lang.color};"
                       data-name="${lang.name.toLowerCase()}" 
                       data-description="${lang.description.toLowerCase()}">
                        <h3 class="card-title">${lang.name}</h3>
                        <p class="card-description">${lang.description}</p>
                    </a>
                `;
            });
            gridHTML += `</div></section>`;
        }
        languageGrid.innerHTML = gridHTML;
    }

    // --- Search Functionality (unchanged) ---
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', () => { /* ... */ });
    }
});
