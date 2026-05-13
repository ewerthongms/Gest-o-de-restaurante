   function scrollParaSecao(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        function addPedido(btn) {
            const caixa = btn.closest('.caixa');
            const select = caixa.querySelector('.options-card');
            const qty = caixa.querySelector('.qty-input').value;
            const item = select.options[select.selectedIndex].text.split(' — ')[0];

            const toast = document.getElementById('toast');
            toast.textContent = '✅ ' + qty + 'x ' + item + ' adicionado!';
            toast.classList.add('show');
            clearTimeout(toast._timer);
            toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
        }


        let totalItens = 0;

function addPedido(btn) {
    const caixa = btn.closest('.caixa');
    const select = caixa.querySelector('.options-card');
    const qty = parseInt(caixa.querySelector('.qty-input').value) || 1;
    const item = select.options[select.selectedIndex].text.split(' — ')[0];

    // Atualiza contagem do carrinho
    totalItens += qty;
    const badge = document.getElementById('carrinho-count');
    const carrinhoBtn = document.getElementById('carrinho-btn');

    badge.textContent = totalItens;

    if (!carrinhoBtn.classList.contains('visivel')) {
        carrinhoBtn.classList.add('visivel');
    }

    // Toast de confirmação
    const toast = document.getElementById('toast');
    toast.textContent = '✅ ' + qty + 'x ' + item + ' adicionado!';
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}