let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// =====================
// CADASTRO
// =====================

const form = document.getElementById("formProduto");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let nome = document.getElementById("nome").value.trim();
        let preco = document.getElementById("preco").value.replace(",", ".");
        if (preco === "" || isNaN(preco)) {
    alert("Digite um preço válido! Ex: 1,50");
    return;
}

        if (!preco || isNaN(parseFloat(preco))) {
            alert("Digite um preço válido! Ex: 1,50");
        return;
        }

        let produto = {
            nome: nome,
            preco: parseFloat(preco).toFixed(2)
        };

        produtos.push(produto);

        localStorage.setItem("produtos", JSON.stringify(produtos));

        alert("Produto cadastrado!");

        form.reset();
    });
}

// =====================
// LISTAGEM
// =====================

function renderizarLista(lista = produtos) {
  let listaHTML = document.getElementById("lista");
  listaHTML.innerHTML = "";

  if (lista.length === 0) {
  listaHTML.innerHTML = "<p>Nenhum produto encontrado.</p>";
  return;
}

  lista.forEach((produto) => {
  let indexReal = produtos.indexOf(produto);

  listaHTML.innerHTML += `
    <div class="produto-card">
      <h3>${produto.nome}</h3>
        <p class="preco">R$ ${produto.preco.replace(".", ",")}</p>

      <div class="botoes">
        <button class="editar" onclick="editarProduto(${indexReal})">Editar</button>
        <button class="excluir" onclick="excluirProduto(${indexReal})">Excluir</button>
      </div>
    </div>
  `;
});
}

// =====================
// AÇÕES (editar/excluir)
// =====================

window.excluirProduto = function(index) {

    const confirmar = confirm("Tem certeza que deseja excluir?");

    if (!confirmar) {
        return;
    }

    produtos.splice(index, 1);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    if (document.getElementById("lista")) {
  renderizarLista();
}
}

window.editarProduto = function(index) {

    let novoNome = prompt("Novo nome do produto:", produtos[index].nome);
    let novoPreco = prompt("Novo preço:", produtos[index].preco);

    if (novoNome === null || novoPreco === null) return;

    novoPreco = novoPreco.replace(",", ".");

    if (novoNome === "" || novoPreco === "" || isNaN(novoPreco)) {
        alert("Valores inválidos!");
        return;
    }

    produtos[index].nome = novoNome;
    produtos[index].preco = parseFloat(novoPreco).toFixed(2);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    renderizarLista();
}

// =====================
// FILTRO
// =====================

window.filtrarProdutos = function() {
  let termo = document.getElementById("busca").value.toLowerCase();

  let listaFiltrada = produtos.filter(p =>
    p.nome.toLowerCase().includes(termo)
  );

  renderizarLista(listaFiltrada);
}

renderizarLista();