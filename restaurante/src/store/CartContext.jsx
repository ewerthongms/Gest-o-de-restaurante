import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);

const load = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
  catch { return fallback; }
};

export function CartProvider({ children }) {
  const [itens, setItens] = useState(() => load("carrinho", []));
  const [mesa, setMesa] = useState(() => load("mesa", ""));

  useEffect(() => localStorage.setItem("carrinho", JSON.stringify(itens)), [itens]);
  useEffect(() => localStorage.setItem("mesa", JSON.stringify(mesa)), [mesa]);

  const add = (produto, qtd) =>
    setItens((cur) => {
      const existe = cur.find((i) => i.id === produto.id);
      if (existe) return cur.map((i) => (i.id === produto.id ? { ...i, qtd: i.qtd + qtd } : i));
      return [...cur, { id: produto.id, nome: produto.nome, preco: produto.preco, qtd }];
    });

  const setQtd = (id, qtd) =>
    setItens((cur) => (qtd <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qtd } : i))));

  const limpar = () => setItens([]);
  const total = itens.reduce((s, i) => s + i.preco * i.qtd, 0);
  const count = itens.reduce((s, i) => s + i.qtd, 0);

  return (
    <Ctx.Provider value={{ itens, mesa, setMesa, add, setQtd, limpar, total, count }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
