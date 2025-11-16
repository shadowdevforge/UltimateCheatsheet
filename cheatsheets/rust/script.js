// No longer need the DOMContentLoaded wrapper
const docElement = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const lightThemeLink = document.getElementById('hljs-light-theme');
const darkThemeLink = document.getElementById('hljs-dark-theme');

// --- Theme Management ---
themeToggle.checked = docElement.getAttribute('data-theme') === 'dark';
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    docElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    lightThemeLink.disabled = newTheme === 'dark';
    darkThemeLink.disabled = newTheme === 'light';
});

// --- CMatrix Background ---
const canvas = document.getElementById('cmatrix');
const ctx = canvas.getContext('2d');
if (ctx) {
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let columns = Math.floor(width / 20);
    const drops = Array(columns).fill(1);
    const japanese = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    
    const drawMatrix = () => {
        ctx.fillStyle = getComputedStyle(docElement).getPropertyValue('--bg-translucent').replace('0.75', '0.05');
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

    // STATIC CMATRIX: Update dimensions on resize without restarting the animation.
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

// --- View Switcher ---
const showCheatsheetBtn = document.getElementById('show-cheatsheet');
const showProjectsBtn = document.getElementById('show-projects');
const cheatsheetContent = document.getElementById('cheatsheet-content');
const projectsContent = document.getElementById('projects-content');

showCheatsheetBtn.addEventListener('click', () => {
    cheatsheetContent.classList.remove('hidden');
    projectsContent.classList.add('hidden');
    showCheatsheetBtn.classList.add('active');
    showProjectsBtn.classList.remove('active');
});

showProjectsBtn.addEventListener('click', () => {
    cheatsheetContent.classList.add('hidden');
    projectsContent.classList.remove('hidden');
    showProjectsBtn.classList.add('active');
    showCheatsheetBtn.classList.remove('active');
});

// --- Dynamic Table of Contents ---
const tocList = document.getElementById('toc-list');
const headings = cheatsheetContent.querySelectorAll('h2.card-title');

headings.forEach(heading => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    const sectionId = heading.parentElement.id;
    
    link.textContent = heading.textContent;
    link.href = `#${sectionId}`;
    listItem.appendChild(link);
    tocList.appendChild(listItem);
});

// --- Initialize Highlight.js ---
hljs.highlightAll();
