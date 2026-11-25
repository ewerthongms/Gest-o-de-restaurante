// ── Scroll suave ──
function scrollParaSecao(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ── Carrinho ──
let totalItens = 0;

function addPedido(btn) {
    const caixa = btn.closest('.caixa');
    const select = caixa.querySelector('.options-card');
    const qty = parseInt(caixa.querySelector('.qty-input').value) || 1;
    const item = select.options[select.selectedIndex].text.split(' — ')[0];

    // Atualiza contagem
    totalItens += qty;
    const badge = document.getElementById('carrinho-count');
    const carrinhoBtn = document.getElementById('carrinho-btn');

    badge.textContent = totalItens;

    if (!carrinhoBtn.classList.contains('visivel')) {
        carrinhoBtn.classList.add('visivel');
    }

    // Toast
    const toast = document.getElementById('toast');
    toast.textContent = '✅ ' + qty + 'x ' + item + ' adicionado!';
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Drag do botão carrinho ──
const carrinho = document.querySelector('.carrinho');
let isDragging = false;
let hasMoved   = false;
let startX, startY, initialX, initialY;

const MARGIN = 16;

function enableDrag(el) {
    const rect = el.getBoundingClientRect();
    el.style.left   = rect.left + 'px';
    el.style.top    = rect.top  + 'px';
    el.style.bottom = 'auto';
    el.style.right  = 'auto';
}

function clampX(x) {
    return Math.min(Math.max(MARGIN, x), window.innerWidth  - carrinho.offsetWidth  - MARGIN);
}

function clampY(y) {
    return Math.min(Math.max(MARGIN, y), window.innerHeight - carrinho.offsetHeight - MARGIN);
}

function snapToEdge(el) {
    const rect  = el.getBoundingClientRect();
    const snapLeft = (rect.left + rect.width / 2) < window.innerWidth / 2;

    el.style.transition = 'left 0.25s ease, top 0.25s ease';
    el.style.left = snapLeft
        ? MARGIN + 'px'
        : (window.innerWidth - rect.width - MARGIN) + 'px';

    el.style.top = clampY(parseFloat(el.style.top)) + 'px';
    setTimeout(() => el.style.transition = '', 300);
}

// TOUCH
carrinho.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;

    if (carrinho.style.bottom !== 'auto') enableDrag(carrinho);

    initialX = parseFloat(carrinho.style.left);
    initialY = parseFloat(carrinho.style.top);

    isDragging = true;
    hasMoved   = false;
    carrinho.classList.add('dragging');
}, { passive: true });

carrinho.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved = true;

    carrinho.style.left = clampX(initialX + dx) + 'px';
    carrinho.style.top  = clampY(initialY + dy) + 'px';
}, { passive: false });

carrinho.addEventListener('touchend', () => {
    isDragging = false;
    carrinho.classList.remove('dragging');
    if (hasMoved) snapToEdge(carrinho);
});

// MOUSE
carrinho.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;

    if (carrinho.style.bottom !== 'auto') enableDrag(carrinho);

    initialX = parseFloat(carrinho.style.left);
    initialY = parseFloat(carrinho.style.top);

    isDragging = true;
    hasMoved   = false;
    carrinho.classList.add('dragging');
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved = true;

    carrinho.style.left = clampX(initialX + dx) + 'px';
    carrinho.style.top  = clampY(initialY + dy) + 'px';
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    carrinho.classList.remove('dragging');
    if (hasMoved) snapToEdge(carrinho);
});

// Clique só abre o carrinho se não arrastou
carrinho.addEventListener('click', () => {
    if (hasMoved) { hasMoved = false; return; }
    // sua lógica de abrir carrinho aqui
    // ex: document.getElementById('modal-carrinho').classList.add('aberto');
});