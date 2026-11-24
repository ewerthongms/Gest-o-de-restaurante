const KEY = "pedidos";

export function listPedidos() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function criarPedido(dados) {
  const novo = { id: crypto.randomUUID(), status: "pago", criadoEm: Date.now(), ...dados };
  localStorage.setItem(KEY, JSON.stringify([...listPedidos(), novo]));
  return novo;
}

export function onPedidosChange(fn) {
  const h = (e) => { if (!e.key || e.key === KEY) fn(); };
  window.addEventListener("storage", h);
  return () => window.removeEventListener("storage", h);
}
