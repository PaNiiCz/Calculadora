const visor = document.getElementById('visor');
const historico = document.getElementById('historico');

function adicionar(valor) {
    visor.value += valor;
}

function limpar() {
    visor.value = '';
    historico.textContent = '';
}

function apagar() {
    visor.value = visor.value.slice(0, -1);
}

function inverterSinal() {
    if (visor.value.startsWith('-')) {
        visor.value = visor.value.slice(1);
    } else if (visor.value.length > 0) {
        visor.value = '-' + visor.value;
    }
}

function calcular() {
    const expressaoOriginal = visor.value;

    fetch('/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expressao: expressaoOriginal })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.erro) {
            visor.value = 'Erro';
        } else {
            historico.textContent = expressaoOriginal;
            visor.value = dados.resultado;
        }
    })
    .catch(() => {
        visor.value = 'Erro';
    });
}

function alternarTema() {
    document.body.classList.toggle('claro');
    const modoClaro = document.body.classList.contains('claro');
    localStorage.setItem('temaClaro', modoClaro);
    atualizarIconeTema();
}

function atualizarIconeTema() {
    const icone = document.getElementById('temaIcone');
    const modoClaro = document.body.classList.contains('claro');
    icone.textContent = modoClaro ? '☀️' : '🌙';
}

// ao carregar a página, aplica o tema que a pessoa escolheu da última vez
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('temaClaro') === 'true') {
        document.body.classList.add('claro');
    }
    atualizarIconeTema();
});

function fecharApp() {
    // só funciona dentro do app desktop (pywebview); no navegador comum, não faz nada
    if (window.pywebview) {
        window.pywebview.api.fechar();
    }
}

function abrirMenu() {
    document.getElementById('menuLateral').classList.add('aberto');
    document.getElementById('overlay').classList.add('aberto');
}

function limparTudo() {
    visor.value = '';
    historico.textContent = '';
    historicoArray = [];
    atualizarHistorico();
}

function fecharMenu() {
    document.getElementById('menuLateral').classList.remove('aberto');
    document.getElementById('overlay').classList.remove('aberto');
}

function selecionarModo(elemento, modo) {
    if (modo !== 'padrao') {
        mostrarToast('Disponível em breve 🚧');
        fecharMenu();
        return;
    }

    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('ativo'));
    elemento.classList.add('ativo');
    fecharMenu();
}

function mostrarToast(mensagem) {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.classList.add('mostrar');
    setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 1800);
}

// ===== MEMÓRIA =====
let memoria = 0;
let memoriaAtiva = false;

function memoriaMC() {
    memoria = 0;
    memoriaAtiva = false;
    mostrarToast('Memória limpa');
}

function memoriaMR() {
    if (memoriaAtiva) {
        visor.value = memoria.toString();
        mostrarToast('MR: ' + memoria);
    } else {
        mostrarToast('Memória vazia');
    }
}

function memoriaMmais() {
    const valor = parseFloat(visor.value);
    if (!isNaN(valor)) {
        memoria += valor;
        memoriaAtiva = true;
        mostrarToast('M+ : ' + memoria);
        limpar();
    }
}

function memoriaMmenos() {
    const valor = parseFloat(visor.value);
    if (!isNaN(valor)) {
        memoria -= valor;
        memoriaAtiva = true;
        mostrarToast('M− : ' + memoria);
        limpar();
    }
}