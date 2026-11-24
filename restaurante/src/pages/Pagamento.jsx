import { useState } from "react";
import { Link } from "react-router-dom";
import { brl } from "../data/produtos.js";
import { useCart } from "../store/CartContext.jsx";
import { criarPedido } from "../store/pedidos.js";
import useCss from "../useCss.js";
import css from "../styles/pagamento.css?inline";

export default function Pagamento() {
  useCss(css);
  const { itens, mesa, setMesa, setQtd, limpar, total } = useCart();
  const [nome, setNome] = useState("");
  const [enviado, setEnviado] = useState(null);

  const pronto = itens.length > 0 && nome.trim() && String(mesa).trim();

  // TEMPORÁRIO: simula a aprovação do pagamento.
  // Depois, quem cria o pedido como "pago" é o webhook do gateway, no backend.
  function simularPagamento() {
    const pedido = criarPedido({ mesa: String(mesa).trim(), cliente: nome.trim(), itens, total });
    limpar();
    setEnviado(pedido);
  }

  if (enviado) {
    return (
      <div className="checkout" style={{ display: "block", textAlign: "center" }}>
        <div className="card">
          <div className="card-title">Pedido enviado!</div>
          <p>Mesa {enviado.mesa} · {enviado.cliente}</p>
          <p className="item-desc" style={{ margin: "12px 0" }}>Total pago: {brl(enviado.total)}</p>
          <Link to="/cardapio" className="btn-pay" style={{ textDecoration: "none", justifyContent: "center" }}>
            Voltar ao cardápio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <header>
        <div className="logo">Seu <span>Pedido</span></div>
        <Link to="/cardapio" className="badge" style={{ textDecoration: "none" }}>← Cardápio</Link>
      </header>

      <div className="checkout">
        <div>
          <div className="card">
            <div className="card-title">Dados do Pedido</div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Seu nome</label>
                <input id="nome" type="text" placeholder="Como devemos te chamar?" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="mesa">Mesa</label>
                <input id="mesa" type="text" placeholder="Nº da mesa" value={mesa} onChange={(e) => setMesa(e.target.value)} />
              </div>
            </div>

            <hr className="divider" style={{ margin: "24px 0 20px" }} />
            <div className="card-title">Pagamento via Pix</div>
            <div className="pix-block">
              <div className="pix-placeholder">O QR Code Pix será gerado aqui pelo gateway de pagamento (a integrar).</div>
            </div>

            <button className="btn-pay" type="button" disabled={!pronto} onClick={simularPagamento}
              style={!pronto ? { opacity: 0.5, cursor: "not-allowed" } : undefined}>
              Simular pagamento aprovado
            </button>
          </div>
        </div>

        <div>
          <div className="card order-summary">
            <div className="card-title">Resumo do Pedido</div>
            {itens.length === 0 ? (
              <p className="item-desc">Seu carrinho está vazio.</p>
            ) : (
              <div className="items">
                {itens.map((i) => (
                  <div className="item" key={i.id}>
                    <div className="item-info">
                      <div className="item-name">{i.nome}</div>
                      <div className="item-desc">
                        <button type="button" onClick={() => setQtd(i.id, i.qtd - 1)} style={qtdBtn}>−</button>
                        {" "}{i.qtd}{" "}
                        <button type="button" onClick={() => setQtd(i.id, i.qtd + 1)} style={qtdBtn}>+</button>
                      </div>
                    </div>
                    <div className="item-price">{brl(i.preco * i.qtd)}</div>
                  </div>
                ))}
              </div>
            )}
            <hr className="divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span className="price-total">{brl(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const qtdBtn = { background: "none", border: "1px solid #555", color: "inherit", borderRadius: 4, width: 24, cursor: "pointer" };
