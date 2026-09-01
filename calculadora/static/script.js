// --- FUNÇÕES DA CALCULADORA ---
let display = document.getElementById('display');

function appendToDisplay(value) {
    display.innerText = display.innerText === '0' ? value : display.innerText + value;
}

function clearDisplay() {
    display.innerText = '0';
}

function deleteLast() {
    display.innerText = display.innerText.slice(0, -1) || '0';
}

function calculateResult() {
    try {
        let expressao = display.innerText
            .replace(/\^/g, '**')
            .replace(/√/g, 'sqrt');
        display.innerText = eval(expressao);
    } catch {
        display.innerText = 'Erro';
    }
}

// --- FUNÇÕES CIENTÍFICAS ---
function sin(x) { return Math.sin(x * Math.PI / 180); }
function cos(x) { return Math.cos(x * Math.PI / 180); }
function tan(x) { return Math.tan(x * Math.PI / 180); }
function log(x) { return Math.log10(x); }
function ln(x) { return Math.log(x); }
function sqrt(x) { return Math.sqrt(x); }

function factorial(n) {
    n = Math.round(n);
    if (n < 0) return NaN;
    if (n <= 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= n; i++) resultado *= i;
    return resultado;
}

// --- FUNÇÕES DO MENU ---
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function switchMode(modo) {
    const container = document.querySelector('.calculator-container');
    if (modo === 'cientifica') {
        container.classList.add('modo-cientifica');
    } else {
        container.classList.remove('modo-cientifica');
    }
    document.getElementById('sidebar').classList.remove('active');

    // Pede pro Python redimensionar a janela nativa de verdade
    if (window.pywebview) {
        window.pywebview.api.resize_window(modo);
    }
}

// Fecha o menu se clicar fora dele
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const header = document.querySelector('.window-header');
    if (!sidebar.contains(event.target) && !header.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// --- FUNÇÕES DA JANELA (via pywebview) ---
function closeWindow() {
    if (window.pywebview) {
        window.pywebview.api.close_window();
    } else {
        window.close();
    }
}

function minimizeWindow() {
    if (window.pywebview) {
        window.pywebview.api.minimize_window();
    }
}

function maximizeWindow() {
    if (window.pywebview) {
        window.pywebview.api.maximize_window();
    }
}

// --- FUNÇÕES DO TECLADO FÍSICO ---
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    }
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    }
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    }
    else if (key === 'Backspace') {
        deleteLast();
    }
    else if (key === 'Escape') {
        clearDisplay();
    }
    else if (key === 'c' || key === 'C') {
        clearDisplay();
    }
    else if (key === '%') {
        appendToDisplay('%');
    }
});