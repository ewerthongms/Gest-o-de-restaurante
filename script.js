const pedidos = []

function addPedido() {
  const mesa = document.getElementById("mesa").value
  const produto = document.getElementById("produto").value

  if (!mesa || !produto) {
    alert("Preencha tudo")
    return
  }

  pedidos.push({ mesa, produto })
  renderPedidos()
}

function renderPedidos() {
  const lista = document.getElementById("pedidos")
  lista.innerHTML = ""

  pedidos.forEach((p, index) => {
    const li = document.createElement("li")
    li.textContent = `Mesa ${p.mesa}: ${p.produto}`

    const btn = document.createElement("button")
    btn.textContent = "Finalizar"
    btn.onclick = () => {
      pedidos.splice(index, 1)
      renderPedidos()
    }

    li.appendChild(btn)
    lista.appendChild(li)
  })
}