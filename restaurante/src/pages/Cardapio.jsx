import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CATEGORIAS, brl } from "../data/produtos.js";
import { useCart } from "../store/CartContext.jsx";
import useCss from "../useCss.js";
import css from "../styles/cardapio.css?inline";

function Card({ cat, onAdd }) {
  const [opcaoId, setOpcaoId] = useState(cat.opcoes[0].id);
  const [qtd, setQtd] = useState(1);
  const opcao = cat.opcoes.find((o) => o.id === opcaoId);

  return (
    <div className="caixa" id={cat.id}>
      <img src={`/img/${cat.img}`} alt={cat.titulo} />
      <h2>{cat.titulo}</h2>
      <p className="preco">{brl(opcao.preco)}</p>
      <select className="options-card" value={opcaoId} onChange={(e) => setOpcaoId(e.target.value)}>
        {cat.opcoes.map((o) => (
          <option key={o.id} value={o.id}>{o.nome} — {brl(o.preco)}</option>
        ))}
      </select>
      <div className="pedido-row">
        <input
          type="number" className="qty-input" min="1" max="99" value={qtd}
          onChange={(e) => setQtd(Math.max(1, Number(e.target.value) || 1))}
        />
        <button className="btn-add" onClick={() => onAdd(opcao, qtd)}>+ Adicionar</button>
      </div>
    </div>
  );
}

export default function Cardapio() {
  useCss(css);
  const { add, count, setMesa } = useCart();
  const [params] = useSearchParams();
  const [busca, setBusca] = useState("");
  const [toast, setToast] = useState("");
  const timer = useRef();

  // QR code da mesa: /cardapio?mesa=5
  useEffect(() => {
    const m = params.get("mesa");
    if (m) setMesa(m);
  }, [params, setMesa]);

  function adicionar(opcao, qtd) {
    add(opcao, qtd);
    setToast(`✅ ${qtd}x ${opcao.nome} adicionado!`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2500);
  }

  const termo = busca.trim().toLowerCase();
  const categorias = CATEGORIAS.filter(
    (c) => !termo || c.titulo.toLowerCase().includes(termo) || c.opcoes.some((o) => o.nome.toLowerCase().includes(termo))
  );

  return (
    <>
      <wrapper id="pai">
       <Link to="/pagamento" className="carrinho visivel" id="carrinho-btn">
          <img src="/img/comprar-online.png" alt="icone-carrinho" className="carrinho-img" />
          <span className="carrinho-label"></span>
          <span className="carrinho-badge" id="carrinho-count">{count}</span>
        </Link>

        <nav id="browser">
          <button className="menu-buttons" type="button" id="menu-lateral">☰</button>
          <input id="researcher" type="search" placeholder="Pesquisar" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </nav>

        <section id="div-img">
          <img src="/img/A preferida.jpg" id="Logo-img" alt="logo" />
        </section>

        <main id="menu">
          <h1 className="title1">Cardápio</h1>
          <div className="buttons-div">
            {CATEGORIAS.map((c) => (
              <button key={c.id} className="menu-buttons"
                onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}>
                {c.titulo}
              </button>
            ))}
          </div>
        </main>

        <section id="img-menu">
          {categorias.map((c) => <Card key={c.id} cat={c} onAdd={adicionar} />)}
        </section>
      </wrapper>

      <div id="toast" className={toast ? "show" : ""}>{toast}</div>
    </>
  );
}
