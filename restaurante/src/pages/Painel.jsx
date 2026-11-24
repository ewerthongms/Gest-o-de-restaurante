import { useEffect, useState } from "react";
import { listPedidos, criarPedido, onPedidosChange } from "../store/pedidos.js";
import useCss from "../useCss.js";
import css from "../styles/painel.css?inline";

export default function Painel() {
  useCss(css);
  const [pedidos, setPedidos] = useState(listPedidos);
  const [mesa, setMesa] = useState("");
  const [produto, setProduto] = useState("");

  // Atualiza quando outra aba/página cria um pedido
  useEffect(() => onPedidosChange(() => setPedidos(listPedidos())), []);

  const mesas = [...new Set(pedidos.map((p) => p.mesa))];

  function addPedido() {
    if (!mesa.trim() || !produto.trim()) return;
    criarPedido({ mesa: mesa.trim(), cliente: "", itens: [{ nome: produto.trim(), qtd: 1, preco: 0 }], total: 0 });
    setPedidos(listPedidos());
    setMesa("");
    setProduto("");
  }

  return (
    <>
      <header>
        <h1>🍽️ Restaurante Manager</h1>
      </header>

      <main>
        <section className="card">
          <h2>Mesas</h2>
          <div id="mesas">{mesas.map((m) => <div key={m}>Mesa {m}</div>)}</div>
        </section>

        <section className="card">
          <h2>Pedidos</h2>
          <ul id="pedidos">
            {pedidos.map((p) => (
              <li key={p.id}>
                Mesa {p.mesa}{p.cliente ? ` - ${p.cliente}` : ""}: {p.itens.map((i) => `${i.qtd}x ${i.nome}`).join(", ")}
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Adicionar Pedido</h2>
          <input type="text" id="mesa" placeholder="Mesa" value={mesa} onChange={(e) => setMesa(e.target.value)} />
          <input type="text" id="produto" placeholder="Produto" value={produto} onChange={(e) => setProduto(e.target.value)} />
          <button onClick={addPedido}>Adicionar</button>
        </section>
      </main>
    </>
  );
}
