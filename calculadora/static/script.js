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
        display.innerText = eval(display.innerText);
    } catch {
        display.innerText = 'Erro';
    }
}

// --- FUNÇÕES DO MENU ---
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
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

    // Se for um número (0-9) ou um ponto (.)
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    }
    // Se for um operador (+, -, *, /)
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        // O eval() entende '*' como multiplicação, mas o usuário digita 'x' ou '*'
        // Para ficar igual aos botões, vamos converter '*' para '*' (o próprio)
        appendToDisplay(key);
    }
    // Se apertar Enter ou '=' (no teclado numérico)
    else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Evita que o Enter recarregue a página
        calculateResult();
    }
    // Se apertar Backspace (apagar)
    else if (key === 'Backspace') {
        deleteLast();
    }
    // Se apertar Escape (limpar tudo)
    else if (key === 'Escape') {
        clearDisplay();
    }
    // Se apertar 'c' ou 'C' (limpar)
    else if (key === 'c' || key === 'C') {
        clearDisplay();
    }
    // Se apertar '%' (porcentagem)
    else if (key === '%') {
        appendToDisplay('%');
    }
});