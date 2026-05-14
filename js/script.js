import { ROADMAP_DATA } from './data.js';

// --- Estado Global ---
let state = {
    completedSections: JSON.parse(localStorage.getItem('completedSections') || '{}'),
    highlights: JSON.parse(localStorage.getItem('highlights') || '{}'),
    lastViewed: localStorage.getItem('lastViewed') || (ROADMAP_DATA[0] && ROADMAP_DATA[0].files[0] ? ROADMAP_DATA[0].files[0].path : null),
    readingPoint: JSON.parse(localStorage.getItem('readingPoint') || '{}'),
    streaks: JSON.parse(localStorage.getItem('streaks') || '[]'),
    notes: JSON.parse(localStorage.getItem('notes') || '{}'),
    currentPath: null,
    currentTool: 'none', 
    currentColor: 'yellow'
};


// --- Config Marked ---
if (typeof marked !== 'undefined') {
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) return hljs.highlight(code, { language: lang }).value;
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
    });
}

// --- Config Mermaid ---
if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        maxTextSize: 99999,
        maxEdges: 500,
        themeVariables: {
            primaryColor: '#0ea5e9',
            primaryTextColor: '#f8fafc',
            primaryBorderColor: '#0ea5e9',
            lineColor: '#334155',
            secondaryColor: '#1e293b',
            tertiaryColor: '#0f172a',
            background: '#0b0f1a',
            mainBkg: '#1e293b',
            nodeBorder: '#334155'
        },
        flowchart: { 
            htmlLabels: true,
            curve: 'basis'
        }
    });
}

const viewer = document.getElementById('content-viewer');

// --- Inicialización ---
function init() {
    try {
        console.log("DASHBOARD MAESTRO v2.5 - CARGADO");
        renderSidebar();
        initTabs();
        initHighlighter();
        initPlayground();
        initMusic();
        initMobileMenu();
        initStats();
        initNotes();
        checkStreak();

        if (state.lastViewed) loadMarkdown(state.lastViewed);
    } catch (e) {
        console.error("ERROR CRÍTICO:", e);
    }
}

// --- Pestañas ---
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn, .view').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`view-${btn.dataset.tab}`).classList.add('active');
            if (btn.dataset.tab === 'stats') renderKnowledgeGraph();
        };
    });
}

// --- Navegación ---
function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    nav.innerHTML = '';
    ROADMAP_DATA.forEach(cat => {
        const totalFiles = cat.files.length;
        // Ahora verificamos si subLevelData.completed es true
        const completedCount = cat.files.filter(f => {
            const data = state.completedSections[f.path];
            return data && typeof data === 'object' && data.completed;
        }).length;
        
        const div = document.createElement('div');
        div.innerHTML = `<div class="category-title">${cat.category} <span class="cat-progress">${completedCount}/${totalFiles}</span></div>`;
        const ul = document.createElement('ul');
        cat.files.forEach(file => {
            const li = document.createElement('li');
            li.className = 'topic-item';
            const data = state.completedSections[file.path];
            const isCompleted = data && typeof data === 'object' && data.completed;
            const isActive = state.lastViewed === file.path;
            // Checkbox visual
            const checkbox = isCompleted ? '☑' : '☐';
            li.innerHTML = `<button class="topic-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" data-path="${file.path}"><span class="topic-check">${checkbox}</span>${file.name}</button>`;
            li.querySelector('button').onclick = () => loadMarkdown(file.path);
            ul.appendChild(li);
        });
        div.appendChild(ul);
        nav.appendChild(div);
    });
}

async function loadMarkdown(path) {
    try {
        const res = await fetch(path);
        const text = await res.text();
        state.currentPath = path;
        state.lastViewed = path;
        localStorage.setItem('lastViewed', path);

        document.querySelectorAll('.topic-btn').forEach(b => b.classList.toggle('active', b.dataset.path === path));
        
        viewer.innerHTML = marked.parse(text);

        // Encontrar a qué categoría y nivel pertenece este archivo
        let levelNum = 1, tomoLevels = 5;
        for (const cat of ROADMAP_DATA) {
            const file = cat.files.find(f => f.path === path);
            if (file) {
                levelNum = cat.files.indexOf(file) + 1;
                tomoLevels = file.levels || 5;
                break;
            }
        }

        const STEPS = tomoLevels;
        if (!state.completedSections[path] || typeof state.completedSections[path] !== 'object') {
            state.completedSections[path] = { completed: false, steps: new Array(STEPS).fill(false) };
        } else if (state.completedSections[path].steps.length !== STEPS) {
            const oldSteps = state.completedSections[path].steps;
            state.completedSections[path].steps = new Array(STEPS).fill(false).map((_, i) => oldSteps[i] || false);
        }
        
        const subLevelData = state.completedSections[path];

        // --- INYECCIÓN DE CHECKPOINTS CONTEXTUALES ---
        const sectionHeaders = Array.from(viewer.querySelectorAll('h2, h3')).filter(h => h.innerText.toLowerCase().includes('nivel'));
        const ACTUAL_STEPS = sectionHeaders.length || STEPS;
        
        if (subLevelData.steps.length !== ACTUAL_STEPS) {
            subLevelData.steps = new Array(ACTUAL_STEPS).fill(false).map((_, i) => subLevelData.steps[i] || false);
        }
        
        for (let i = 0; i < ACTUAL_STEPS; i++) {
            const isDone = subLevelData.steps[i];
            const btn = document.createElement('div');
            btn.className = `checkpoint-box ${isDone ? 'done' : ''}`;
            btn.style.cssText = `
                margin: 1rem 0 2rem; padding: 1rem; border-radius: 10px;
                background: ${isDone ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.01)'};
                border: 1px solid ${isDone ? '#10b981' : 'rgba(255,255,255,0.05)'};
                display: flex; justify-content: space-between; align-items: center;
                cursor: pointer; transition: all 0.2s;
            `;
            btn.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="font-size: 0.6rem; color: var(--primary-color); font-weight: 800;">LECCIÓN ${i + 1}</div>
                    <div style="font-size: 0.8rem; font-weight: 600; color: ${isDone ? '#10b981' : '#94a3b8'};">
                        ${isDone ? '✓ SECCIÓN COMPLETADA' : 'MARCAR COMO LEÍDA'}
                    </div>
                </div>
                <div style="width: 18px; height: 18px; border-radius: 4px; border: 1.5px solid ${isDone ? '#10b981' : 'rgba(255,255,255,0.1)'}; background: ${isDone ? '#10b981' : 'transparent'}; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.6rem;">
                    ${isDone ? '✓' : ''}
                </div>
            `;

            btn.onclick = (e) => {
                e.stopPropagation();
                subLevelData.steps[i] = !subLevelData.steps[i];
                subLevelData.completed = subLevelData.steps.every(s => s);
                localStorage.setItem('completedSections', JSON.stringify(state.completedSections));
                loadMarkdown(path);
                renderKnowledgeGraph();
                if (subLevelData.completed) triggerStreakAnimation(state.streaks.length);
            };

            // El botón de la lección i se pone al FINAL de dicha lección.
            // Si el siguiente encabezado tiene una línea divisoria (HR) justo antes, 
            // ponemos el botón ANTES de la línea para que la línea "cierre" la lección.
            if (sectionHeaders[i + 1]) {
                const prev = sectionHeaders[i + 1].previousElementSibling;
                if (prev && prev.tagName === 'HR') {
                    prev.before(btn);
                } else {
                    sectionHeaders[i + 1].before(btn);
                }
            } else {
                viewer.appendChild(btn);
            }
        }

        // Botón final
        if (subLevelData.steps.every(s => s)) {
            const finalBtn = document.createElement('button');
            finalBtn.className = 'complete-topic-btn completed';
            finalBtn.style.marginTop = '2rem';
            finalBtn.innerHTML = '🏁 TOMO COMPLETADO';
            finalBtn.onclick = () => {
                subLevelData.completed = true;
                localStorage.setItem('completedSections', JSON.stringify(state.completedSections));
                loadMarkdown(path);
                renderKnowledgeGraph();
            };
            viewer.appendChild(finalBtn);
        }

        hljs.highlightAll();
        document.getElementById('notes-editor').value = state.notes[path] || '';
        updateNotesList(); 
        viewer.scrollTop = 0;
        renderSidebar();
    } catch (e) {
        console.error(e);
        viewer.innerHTML = '<div class="error">Error al cargar el archivo.</div>';
    }
}


// --- Herramientas ---
function initHighlighter() {
    // Modo Enfoque (Ojo)
    const focusBtn = document.getElementById('toggle-focus');
    const sidebar = document.querySelector('aside');
    if (focusBtn) {
        focusBtn.onclick = () => {
            sidebar.classList.toggle('collapsed');
            focusBtn.classList.toggle('active');
        };
    }

    // Selector de colores
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentColor = btn.dataset.color;
        };
    });

    // Lapiz y Borrador por sus IDs reales
    const markerBtn = document.getElementById('toggle-marker');
    const eraserBtn = document.getElementById('toggle-eraser');

    if (markerBtn) {
        markerBtn.onclick = () => {
            const isActive = state.currentTool === 'marker';
            state.currentTool = isActive ? 'none' : 'marker';
            markerBtn.classList.toggle('active', !isActive);
            if (eraserBtn) eraserBtn.classList.remove('active');
        };
    }

    if (eraserBtn) {
        eraserBtn.onclick = () => {
            const isActive = state.currentTool === 'eraser';
            state.currentTool = isActive ? 'none' : 'eraser';
            eraserBtn.classList.toggle('active', !isActive);
            if (markerBtn) markerBtn.classList.remove('active');
        };
    }

    // Aplicar highlight/erase al seleccionar texto
    const viewer = document.getElementById('content-viewer');
    if (viewer) {
        viewer.onmouseup = () => {
            if (state.currentTool === 'none') return;
            const selection = window.getSelection();
            if (!selection || selection.isCollapsed) return;
            const range = selection.getRangeAt(0);
            if (state.currentTool === 'marker') {
                const colorMap = { yellow: '#fbbf24', green: '#34d399', blue: '#38bdf8', pink: '#f472b6' };
                const mark = document.createElement('mark');
                mark.style.background = colorMap[state.currentColor] || '#fbbf24';
                mark.style.color = '#000';
                mark.style.borderRadius = '3px';
                mark.style.padding = '0 2px';
                range.surroundContents(mark);
            } else if (state.currentTool === 'eraser') {
                const mark = selection.anchorNode.parentElement;
                if (mark && mark.tagName === 'MARK') {
                    const parent = mark.parentNode;
                    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
                    parent.removeChild(mark);
                }
            }
            selection.removeAllRanges();
        };
    }
}

// --- Playground ---
const JS_HINTS = [
    // Keywords & Logic
    { label: 'if', snippet: 'if () {\n  \n}' },
    { label: 'else', snippet: 'else {\n  \n}' },
    { label: 'for', snippet: 'for (let i = 0; i < .length; i++) {\n  \n}' },
    { label: 'while', snippet: 'while () {\n  \n}' },
    { label: 'switch', snippet: 'switch () {\n  case :\n    break;\n  default:\n    break;\n}' },
    { label: 'try', snippet: 'try {\n  \n} catch (e) {\n  console.error(e);\n}' },
    { label: 'function', snippet: 'function () {\n  \n}' },
    { label: 'async function', snippet: 'async function () {\n  \n}' },
    { label: 'return', snippet: 'return ' },
    { label: 'const', snippet: 'const  = ' },
    { label: 'let', snippet: 'let  = ' },
    { label: 'await', snippet: 'await ' },
    { label: 'class', snippet: 'class  {\n  constructor() {\n    \n  }\n}' },

    // Console & Debug
    { label: 'console.log()', snippet: 'console.log("")' },
    { label: 'console.error()', snippet: 'console.error("")' },
    { label: 'console.table()', snippet: 'console.table()' },
    
    // DOM & APIs
    { label: 'document.getElementById()', snippet: 'document.getElementById("")' },
    { label: 'document.querySelector()', snippet: 'document.querySelector("")' },
    { label: 'document.querySelectorAll()', snippet: 'document.querySelectorAll("")' },
    { label: 'addEventListener()', snippet: 'addEventListener("", (e) => {\n  \n})' },
    { label: 'fetch()', snippet: 'fetch("")\n  .then(res => res.json())\n  .then(data => console.log(data))' },
    { label: 'localStorage.getItem()', snippet: 'localStorage.getItem("")' },
    { label: 'localStorage.setItem()', snippet: 'localStorage.setItem("", "")' },
    { label: 'setTimeout()', snippet: 'setTimeout(() => {\n  \n}, 1000)' },
    { label: 'setInterval()', snippet: 'setInterval(() => {\n  \n}, 1000)' },

    // Array Methods
    { label: 'forEach()', snippet: 'forEach(item => {\n  \n})' },
    { label: 'map()', snippet: 'map(item => {\n  return item\n})' },
    { label: 'filter()', snippet: 'filter(item => {\n  return true\n})' },
    { label: 'reduce()', snippet: 'reduce((acc, item) => {\n  return acc\n}, 0)' },
    { label: 'find()', snippet: 'find(item => item === )' },
    { label: 'push()', snippet: 'push()' },
    { label: 'pop()', snippet: 'pop()' },
    { label: 'includes()', snippet: 'includes()' },
    { label: 'join()', snippet: 'join("")' },

    // Object & Utility
    { label: 'JSON.stringify()', snippet: 'JSON.stringify()' },
    { label: 'JSON.parse()', snippet: 'JSON.parse()' },
    { label: 'Object.keys()', snippet: 'Object.keys()' },
    { label: 'Object.values()', snippet: 'Object.values()' },
    { label: 'Math.random()', snippet: 'Math.random()' },
    { label: 'Math.floor()', snippet: 'Math.floor()' },
    { label: 'Math.ceil()', snippet: 'Math.ceil()' },

    // Types
    { label: 'new Promise', snippet: 'new Promise((resolve, reject) => {\n  \n})' },
    { label: 'new Date()', snippet: 'new Date()' },
    { label: 'new Map()', snippet: 'new Map()' },
    { label: 'new Set()', snippet: 'new Set()' }
];

function initPlayground() {
    const editor = document.getElementById('code-editor');
    const runBtn = document.getElementById('run-code');
    const output = document.getElementById('console-output');
    const gutter = document.getElementById('line-numbers');
    if (!runBtn) return;

    const updateLineNumbers = () => {
        if (!gutter) return;
        const lines = editor.value.split('\n').length;
        gutter.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
    };

    const hintBox = document.createElement('div');
    hintBox.id = 'hint-box';
    hintBox.style.cssText = [
        'position:absolute', 'bottom:0', 'left:0', 'right:0',
        'background:#1e293b', 'border:1px solid #0ea5e9',
        'border-radius:0 0 10px 10px', 'z-index:9999',
        'max-height:160px', 'overflow-y:auto',
        'display:none', 'font-family:Fira Code,monospace', 'font-size:0.8rem'
    ].join(';');
    const container = document.querySelector('.editor-container');
    if (container) container.appendChild(hintBox);

    // Sincronizar Scroll
    editor.addEventListener('scroll', () => {
        if (gutter) gutter.scrollTop = editor.scrollTop;
    });

    // --- Funciones de Editor Pro ---
    editor.addEventListener('keydown', (e) => {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const value = editor.value;

        // Auto-completado de llaves, paréntesis y comillas
        const pairs = { '{': '}', '(': ')', '[': ']', '"': '"', "'": "'" };
        if (pairs[e.key]) {
            e.preventDefault();
            editor.value = value.substring(0, start) + e.key + pairs[e.key] + value.substring(end);
            editor.selectionStart = editor.selectionEnd = start + 1;
            updateLineNumbers();
        }

        // Smart Indentation (Enter)
        if (e.key === 'Enter') {
            e.preventDefault();
            const line = value.substring(0, start).split('\n').pop();
            const indent = line.match(/^\s*/)[0];
            const lastChar = line.trim().slice(-1);
            const nextChar = value.substring(start, start + 1);
            
            let newText = '\n' + indent;
            let offset = 1 + indent.length;
            
            // BUG FIX: No duplicar llave de cierre
            if (lastChar === '{' && nextChar !== '}') {
                newText += '  \n' + indent + '}';
                offset += 2;
            } else if (lastChar === '{') {
                newText += '  ';
                offset += 2;
            }
            
            editor.value = value.substring(0, start) + newText + value.substring(end);
            editor.selectionStart = editor.selectionEnd = start + offset;
            updateLineNumbers();
        }

        // Tabulación
        if (e.key === 'Tab') {
            e.preventDefault();
            editor.value = value.substring(0, start) + '  ' + value.substring(end);
            editor.selectionStart = editor.selectionEnd = start + 2;
            updateLineNumbers();
        }

        if (e.key === 'Escape') hintBox.style.display = 'none';
    });

    editor.addEventListener('input', () => {
        updateLineNumbers();
        const val = editor.value;
        const pos = editor.selectionStart;
        const word = val.slice(0, pos).split(/[\s;{}()\[\]\n]/).pop();
        if (word.length < 2) { hintBox.style.display = 'none'; return; }
        const matches = JS_HINTS.filter(h => h.label.startsWith(word));
        if (matches.length === 0) { hintBox.style.display = 'none'; return; }
        hintBox.innerHTML = '';
        matches.forEach(h => {
            const item = document.createElement('div');
            item.textContent = h.label;
            item.style.cssText = 'padding:0.4rem 1rem;cursor:pointer;color:#a5d6ff;border-bottom:1px solid rgba(255,255,255,0.05)';
            item.addEventListener('mouseenter', () => item.style.background = 'rgba(14,165,233,0.15)');
            item.addEventListener('mouseleave', () => item.style.background = '');
            item.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const v = editor.value, p = editor.selectionStart;
                const w = v.slice(0, p).split(/[\s;{}()\[\]\n]/).pop();
                editor.value = v.slice(0, p - w.length) + h.snippet + v.slice(p);
                let newPos = p - w.length + h.snippet.length;
                if (h.snippet.includes('""')) newPos = p - w.length + h.snippet.indexOf('""') + 1;
                editor.selectionStart = editor.selectionEnd = newPos;
                editor.focus();
                hintBox.style.display = 'none';
                updateLineNumbers();
            });
            hintBox.appendChild(item);
        });
        hintBox.style.display = 'block';
    });

    editor.addEventListener('blur', () => setTimeout(() => hintBox.style.display = 'none', 200));

    // Ejecutar código
    runBtn.onclick = () => {
        output.innerHTML = '<div style="color:#64748b; font-size:0.75rem; padding:5px;">Ejecutando...</div>';
        hintBox.style.display = 'none';
        const userCode = editor.value;
        
        const html = `<!DOCTYPE html><html><head><style>body{margin:0;padding:0;}</style></head><body><script>
            (function(){
                const logToParent = (type, content) => window.parent.postMessage({type, content}, '*');
                window.onerror = (msg, src, line, col, err) => {
                    logToParent('err', 'Línea ' + line + ': ' + msg);
                    return true;
                };
                console.log = (...args) => logToParent('log', args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
                console.error = (...args) => logToParent('err', args.join(' '));
                console.warn = (...args) => logToParent('warn', args.join(' '));
                try {
                    const script = document.createElement('script');
                    script.textContent = \`${userCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
                    document.body.appendChild(script);
                } catch(e) {
                    logToParent('err', e.message);
                }
            })();
        <\/script></body></html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const iframe = document.getElementById('playground-iframe');
        iframe.src = URL.createObjectURL(blob);
    };

    window.addEventListener('message', (e) => {
        if (!e.data || !e.data.type) return;
        if (output.innerText.includes('Ejecutando...')) output.innerHTML = '';
        
        const log = document.createElement('div');
        log.style.cssText = 'padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-family:Fira Code,monospace;font-size:0.85rem;line-height:1.4;white-space:pre-wrap;';
        if (e.data.type === 'log') {
            log.textContent = '>> ' + e.data.content;
            log.style.color = '#a5d6ff';
        } else if (e.data.type === 'err') {
            log.innerHTML = '<b style="color:#ef4444">ERROR:</b> ' + e.data.content;
            log.style.color = '#fca5a5';
            log.style.background = 'rgba(239, 68, 68, 0.05)';
            log.style.paddingLeft = '5px';
        } else if (e.data.type === 'warn') {
            log.textContent = '⚠ ' + e.data.content;
            log.style.color = '#fbbf24';
        }
        output.appendChild(log);
        output.scrollTop = output.scrollHeight;
    });

    updateLineNumbers();
}

// --- Música ---
function initMusic() {
    const hub = document.getElementById('music-hub');
    const toggleBtn = document.getElementById('toggle-music');
    const closeBtn = document.getElementById('close-hub');
    const minimizeBtn = document.getElementById('minimize-hub');

    if (!toggleBtn || !hub) return;

    toggleBtn.onclick = (e) => {
        e.stopPropagation();
        const isMinimized = hub.classList.contains('minimized');
        const isHidden = window.getComputedStyle(hub).display === 'none';

        if (isHidden) {
            hub.style.display = 'block';
            toggleBtn.classList.add('active');
        } else if (isMinimized) {
            // Si está como burbuja, lo expandimos
            hub.classList.remove('minimized');
            if (minimizeBtn) minimizeBtn.textContent = '➖';
        } else {
            // Si está expandido, lo ocultamos
            hub.style.display = 'none';
            toggleBtn.classList.remove('active');
        }
    };

    // Click en la propia burbuja para expandir
    hub.addEventListener('click', (e) => {
        if (hub.classList.contains('minimized')) {
            hub.classList.remove('minimized');
            if (minimizeBtn) minimizeBtn.textContent = '➖';
        }
    });

    if (closeBtn) {
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            hub.style.display = 'none';
            toggleBtn.classList.remove('active');
        };
    }

    if (minimizeBtn) {
        minimizeBtn.onclick = (e) => {
            e.stopPropagation();
            hub.classList.toggle('minimized');
            if (minimizeBtn) minimizeBtn.textContent = hub.classList.contains('minimized') ? '🔳' : '➖';
        };
    }

    dragElement(hub);
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = elmnt.querySelector('.hub-header');
    if (header) header.onmousedown = (e) => {
        e.preventDefault();
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
            pos3 = e.clientX; pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        };
    };
}

// --- Menú Móvil ---
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('aside');
    const overlay = document.querySelector('.menu-overlay');
    if (btn) btn.onclick = () => { sidebar.classList.toggle('open'); overlay.classList.toggle('active'); };
    if (overlay) overlay.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); };
}

// --- Stats ---
function initStats() {
    const heatmap = document.getElementById('streak-heatmap');
    if (!heatmap) return;
    heatmap.innerHTML = '';
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    const calendarGrid = document.createElement('div');
    calendarGrid.style.display = 'grid';
    calendarGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
    calendarGrid.style.gap = '1.5rem';
    calendarGrid.style.width = '100%';

    for (let m = 0; m < 12; m++) {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month-card';
        monthDiv.style.background = 'rgba(255,255,255,0.03)';
        monthDiv.style.padding = '1rem';
        monthDiv.style.borderRadius = '15px';
        monthDiv.style.border = m === currentMonth ? '1px solid var(--primary-color)' : '1px solid var(--border-color)';
        monthDiv.innerHTML = `<div style="font-size:0.7rem; font-weight:800; text-transform:uppercase; margin-bottom:0.8rem; color:${m === currentMonth ? 'var(--primary-color)' : 'var(--text-muted)'}">${monthNames[m]}</div>`;
        const daysGrid = document.createElement('div');
        daysGrid.style.display = 'grid';
        daysGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        daysGrid.style.gap = '4px';
        const daysInMonth = new Date(2026, m + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const dayDot = document.createElement('div');
            const dateStr = new Date(2026, m, d).toLocaleDateString();
            const hasAttended = state.streaks.includes(dateStr);
            dayDot.style.aspectRatio = '1/1'; dayDot.style.borderRadius = '3px';
            dayDot.style.background = hasAttended ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)';
            dayDot.title = dateStr;
            daysGrid.appendChild(dayDot);
        }
        monthDiv.appendChild(daysGrid);
        calendarGrid.appendChild(monthDiv);
    }
    heatmap.appendChild(calendarGrid);
    document.getElementById('streak-text').textContent = `${state.streaks.length} DÍAS TOTALES EN 2026`;
    renderKnowledgeGraph();
}

function renderKnowledgeGraph() {
    const container = document.getElementById('knowledge-graph');
    if (!container) return;

    // Agrupar categorías en ramas principales
    const branches = [
        { label: '🧠 Lógica & Algoritmos', keywords: ['gica'], color: '#f59e0b' },
        { label: '⚡ JavaScript Core',      keywords: ['JavaScript'], color: '#facc15' },
        { label: '🎨 Frontend Moderno',     keywords: ['Frontend'], color: '#38bdf8' },
        { label: '⚙️ Git & GitHub',         keywords: ['Git'], color: '#fb923c' },
        { label: '🖥️ Backend NodeJS',       keywords: ['Backend'], color: '#34d399' },
        { label: '🗄️ Bases de Datos',       keywords: ['Bases'], color: '#a78bfa' },
        { label: '🏗️ Ingeniería',           keywords: ['Ingenier', 'Limpio'], color: '#f472b6' },
        { label: '🌍 Habilidades Blandas',  keywords: ['Ingl', 'Scrum'], color: '#94a3b8' },
    ];

    let html = `<div class="tree-root">
        <div class="tree-root-node">🚀 CONEXIONES TÉCNICAS</div>
        <div class="tree-branches">`;

    branches.forEach(branch => {
        // Buscar categorías que pertenecen a esta rama
        const cats = ROADMAP_DATA.filter(cat =>
            branch.keywords.some(kw => cat.category.includes(kw))
        );
        if (cats.length === 0) return;

        const totalFiles = cats.reduce((sum, cat) => sum + cat.files.length, 0);
        const completedFiles = cats.reduce((sum, cat) =>
            sum + cat.files.filter(f => {
                const data = state.completedSections[f.path];
                return data && typeof data === 'object' && data.completed;
            }).length, 0);
        const pct = totalFiles > 0 ? Math.round((completedFiles / totalFiles) * 100) : 0;

        html += `<div class="tree-branch">
            <div class="tree-branch-label" style="border-color:${branch.color};color:${branch.color}">
                ${branch.label}
                <span class="tree-pct">${pct}%</span>
            </div>
            <div class="tree-topics">`;

        cats.forEach(cat => {
            cat.files.forEach(file => {
                const data = state.completedSections[file.path];
                const isCompleted = data && typeof data === 'object' && data.completed;
                const isCurrent = state.currentPath === file.path;
                const cls = isCompleted ? 'topic-done' : isCurrent ? 'topic-current' : '';
                html += `<div class="tree-topic ${cls}" onclick="loadMarkdown('${file.path}')" title="${file.name}">
                    ${isCompleted ? '✅' : isCurrent ? '▶' : '○'} ${file.name}
                </div>`;
            });
        });

        html += `</div></div>`;
    });

    html += `</div></div>`;
    container.innerHTML = html;
}

function checkStreak() {
    const today = new Date().toLocaleDateString();
    if (!state.streaks.includes(today)) {
        state.streaks.push(today);
        localStorage.setItem('streaks', JSON.stringify(state.streaks));
        triggerStreakAnimation(state.streaks.length);
    }
}

function triggerStreakAnimation(count) {
    let popup = document.querySelector('.streak-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'streak-popup';
        document.body.appendChild(popup);
    }
    popup.innerHTML = `<span class="fire-icon">🔥</span><span style="color:var(--primary-color);font-weight:800;">DÍA COMPLETADO</span><span class="streak-number">${count}</span>`;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 3000);
}

function initNotes() {
    const editor = document.getElementById('notes-editor');
    const searchInput = document.getElementById('search-notes');
    const sidebar = document.querySelector('.notes-sidebar');
    const toggleHistory = document.getElementById('toggle-history');
    if (!editor) return;

    // Ocultar sidebar por defecto
    if (sidebar) sidebar.style.display = 'none';

    if (toggleHistory) {
        toggleHistory.onclick = () => {
            const isHidden = sidebar.style.display === 'none';
            sidebar.style.display = isHidden ? 'flex' : 'none';
            toggleHistory.textContent = isHidden ? 'OCULTAR HISTORIAL 📂' : 'VER HISTORIAL 📜';
            if (!isHidden) updateNotesList();
        };
    }

    editor.oninput = () => {
        if (!state.currentPath) return;
        state.notes[state.currentPath] = editor.value;
        localStorage.setItem('notes', JSON.stringify(state.notes));
        // No actualizamos la lista en tiempo real si está escribiendo
    };

    if (searchInput) {
        searchInput.oninput = () => updateNotesList(searchInput.value);
    }

    const exportBtn = document.getElementById('export-pdf');
    if (exportBtn) exportBtn.onclick = () => {
        if (!state.currentPath) { alert('Selecciona un tema primero'); return; }
        
        let levelNum = 1, catName = 'Estudio';
        for (const cat of ROADMAP_DATA) {
            const file = cat.files.find(f => f.path === state.currentPath);
            if (file) { levelNum = cat.files.indexOf(file) + 1; catName = cat.category; break; }
        }

        const topic = prompt('Materia:', catName) || catName;
        const level = prompt('Nivel/Sección:', `Nivel ${levelNum}`) || `Nivel ${levelNum}`;

        const notesText = editor.value;
        const date = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
        const subTitle = `${topic} — ${level}`;
        const printWin = window.open('', '_blank');
        printWin.document.write(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Apuntes - ${subTitle}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: white; color: #1e293b; }
        .header-band { width: 100%; height: 8px; background: linear-gradient(90deg, #0ea5e9, #6366f1, #10b981); }
        .header {
            background: linear-gradient(135deg, #0b0f1a 0%, #1e293b 100%);
            color: white; padding: 1.5rem 2.5rem;
            display: flex; justify-content: space-between; align-items: center;
            border-bottom: 3px solid #0ea5e9;
        }
        .header-left h1 { font-size: 1.2rem; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; color: #f8fafc; }
        .header-left .topic { font-size: 0.8rem; color: #0ea5e9; margin-top: 0.3rem; font-weight: 700; }
        .header-left .subtitle { font-size: 0.7rem; color: #94a3b8; margin-top: 0.15rem; letter-spacing: 0.06em; }
        .header-right { text-align: right; }
        .header-right .name { font-size: 1.1rem; font-weight: 900; color: #0ea5e9; letter-spacing: 0.08em; }
        .header-right .date { font-size: 0.7rem; color: #64748b; margin-top: 0.2rem; }
        .content { padding: 2.5rem; white-space: pre-wrap; font-size: 11pt; line-height: 1.8; color: #1e293b; }
        .footer { text-align: center; padding: 1rem; font-size: 0.7rem; color: #94a3b8; border-top: 1px solid #e2e8f0; margin-top: 2rem; }
        @media print { @page { size: A4; margin: 0; } }
    </style>
</head>
<body>
    <div class="header-band"></div>
    <div class="header">
        <div class="header-left">
            <h1>📓 Apuntes de Estudio</h1>
            <div class="topic">${topic}</div>
            <div class="subtitle">${level}</div>
        </div>
        <div class="header-right">
            <div class="name">devbernix</div>
            <div class="date">${date}</div>
        </div>
    </div>
    <div class="content">${notesText.replace(/</g,'&lt;').replace(/>/g,'&gt;') || '<em style="color:#94a3b8">No hay apuntes escritos aún.</em>'}</div>
    <div class="footer">Full Stack Developer Roadmap 2026 — devbernix</div>
    <script>window.onload = () => { window.print(); window.onafterprint = () => window.close(); }<\/script>
</body>
</html>`);
        printWin.document.close();
        updateNotesList(); 
    };
}

function updateNotesList(query = '') {
    const list = document.getElementById('notes-list');
    const title = document.getElementById('current-note-title');
    if (!list) return;
    list.innerHTML = '';
    
    // Agrupar archivos del roadmap que tienen notas
    ROADMAP_DATA.forEach(cat => {
        const catFilesWithNotes = cat.files.filter(f => {
            const hasNote = state.notes[f.path] && state.notes[f.path].trim().length > 0;
            const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase()) || cat.category.toLowerCase().includes(query.toLowerCase());
            return hasNote && matchesQuery;
        });

        if (catFilesWithNotes.length > 0) {
            const catLabel = document.createElement('div');
            catLabel.style.cssText = 'font-size: 0.65rem; color: var(--primary-color); font-weight: 800; margin: 0.8rem 0 0.3rem; letter-spacing: 0.05em;';
            catLabel.textContent = cat.category.toUpperCase();
            list.appendChild(catLabel);

            catFilesWithNotes.forEach(file => {
                const item = document.createElement('div');
                const isActive = state.currentPath === file.path;
                item.className = `note-item ${isActive ? 'active' : ''}`;
                item.style.cssText = `
                    padding: 0.6rem 0.8rem; border-radius: 10px; cursor: pointer; font-size: 0.8rem;
                    background: ${isActive ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255,255,255,0.03)'};
                    color: ${isActive ? 'var(--primary-color)' : 'var(--text-muted)'};
                    border: 1px solid ${isActive ? 'rgba(14, 165, 233, 0.3)' : 'transparent'};
                    transition: all 0.2s;
                `;
                item.innerHTML = `<span>${file.name}</span>`;
                item.onclick = () => {
                    loadMarkdown(file.path);
                    // Cambiar a la pestaña de lectura si es necesario? No, el usuario está en notas.
                    // Simplemente cargamos la nota en el editor
                    document.getElementById('notes-editor').value = state.notes[file.path] || '';
                    title.textContent = `${cat.category} — ${file.name}`;
                    updateNotesList(query);
                };
                list.appendChild(item);
                if (isActive) title.textContent = `${cat.category} — ${file.name}`;
            });
        }
    });

    if (list.innerHTML === '') {
        list.innerHTML = '<div style="color: var(--text-muted); font-size: 0.75rem; text-align: center; padding: 1rem;">No se encontraron notas</div>';
    }
}

// Esperar a que el sistema de seguridad autorice el acceso
window.addEventListener('auth-ready', init);
