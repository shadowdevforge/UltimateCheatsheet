document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const docElement = document.documentElement;

    const applyTheme = (theme) => {
        docElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark';
    };

    const preferredTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    applyTheme(preferredTheme || (systemPrefersDark ? 'dark' : 'light'));

    themeToggle.addEventListener('change', () => {
        applyTheme(themeToggle.checked ? 'dark' : 'light');
    });

    // --- cmatrix Background ---
    const canvas = document.getElementById('cmatrix');
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

                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        let intervalId = setInterval(drawMatrix, 40);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / 20);
            drops.length = 0; // Clear the array
            for (let i = 0; i < columns; i++) {
                drops.push(1);
            }
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(drawMatrix, 40);
        });
    }

    // --- Language Card Data ---
    const languages = [
        { name: 'Rust', slug: 'rust', description: 'A systems programming language focused on safety, speed, and concurrency.', category: 'Systems & Backend' },
        { name: 'Go', slug: 'go', description: 'A statically typed, compiled language designed at Google for building simple, reliable, and efficient software.', category: 'Systems & Backend' },
        { name: 'C', slug: 'c', description: 'A general-purpose, procedural computer programming language supporting structured programming.', category: 'Systems & Backend' },
        { name: 'Python', slug: 'python', description: 'A high-level, interpreted language known for its readability and large standard library.', category: 'Scripting & Automation' },
        { name: 'Lua', slug: 'lua', description: 'A lightweight, high-level, multi-paradigm programming language designed primarily for embedded use.', category: 'Scripting & Automation' },
        { name: 'Bash', slug: 'bash', description: 'A Unix shell and command language, perfect for scripting and system administration tasks.', category: 'Scripting & Automation' },
        { name: 'HTML', slug: 'html', description: 'The standard markup language for documents designed to be displayed in a web browser.', category: 'Web & Frontend' },
        { name: 'CSS', slug: 'css', description: 'A style sheet language used for describing the presentation of a document written in HTML.', category: 'Web & Frontend' },
        { name: 'JavaScript', slug: 'javascript', description: 'A high-level language that conforms to the ECMAScript specification, essential for web development.', category: 'Web & Frontend' },
        { name: 'TypeScript', slug: 'typescript', description: 'A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.', category: 'Web & Frontend' },
        { name: 'SvelteKit', slug: 'sveltekit', description: 'A web framework for building robust, high-performance web applications of all sizes.', category: 'Web & Frontend' },
    ];

    // --- Card Rendering ---
    const languageGrid = document.getElementById('language-grid');

    if (languageGrid) {
        const groupedLanguages = languages.reduce((acc, lang) => {
            (acc[lang.category] = acc[lang.category] || []).push(lang);
            return acc;
        }, {});

        let gridHTML = '';
        for (const category in groupedLanguages) {
            gridHTML += `
                <section class="category-section" data-category="${category}">
                    <h2 class="category-title">${category}</h2>
                    <div class="language-grid">
            `;
            groupedLanguages[category].forEach(lang => {
                gridHTML += `
                    <a href="/cheatsheets/${lang.slug}" class="lang-card" data-name="${lang.name.toLowerCase()}" data-description="${lang.description.toLowerCase()}">
                        <h3 class="card-title">${lang.name}</h3>
                        <p class="card-description">${lang.description}</p>
                    </a>
                `;
            });
            gridHTML += `</div></section>`;
        }
        languageGrid.innerHTML = gridHTML;
    }

    // --- Search Functionality ---
    const searchBar = document.getElementById('search-bar');

    if (searchBar) {
        searchBar.addEventListener('input', () => {
            const searchTerm = searchBar.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.lang-card');
            const sections = document.querySelectorAll('.category-section');

            cards.forEach(card => {
                const name = card.dataset.name || '';
                const description = card.dataset.description || '';
                const isVisible = name.includes(searchTerm) || description.includes(searchTerm);
                card.classList.toggle('hidden', !isVisible);
            });

            sections.forEach(section => {
                const visibleCards = section.querySelectorAll('.lang-card:not(.hidden)');
                section.style.display = visibleCards.length > 0 ? 'block' : 'none';
            });
        });
    }
});
