let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// CADASTRO
const form = document.getElementById("formProduto");

import './style.css'

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let nome = document.getElementById("nome").value;
        let preco = document.getElementById("preco").value;

        if (nome === "" || preco === "") {
            alert("Preencha todos os campos!");
            return;
        }

        let produto = {
            nome: nome,
            preco: preco
        };

        produtos.push(produto);

        localStorage.setItem("produtos", JSON.stringify(produtos));

        alert("Produto cadastrado!");

        form.reset();
    });
}

// LISTAGEM
function renderizarLista() {
    const lista = document.getElementById("lista");

    if (!lista) return;

    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
    lista.innerHTML += `
    <div>
        <p>${produto.nome}</p>
        <p>R$ ${produto.preco}</p>

        <button class="editar" onclick="editarProduto(${index})">Editar</button>
        <button class="excluir" onclick="excluirProduto(${index})">Excluir</button>
    </div>
  `;
});
}

window.excluirProduto = function(index) {

    const confirmar = confirm("Tem certeza que deseja excluir?");

    if (!confirmar) {
        return;
    }

    produtos.splice(index, 1);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    renderizarLista();
}

window.editarProduto = function(index) {

    let novoNome = prompt("Novo nome do produto:", produtos[index].nome);
    let novoPreco = prompt("Novo preço:", produtos[index].preco);

    if (novoNome === null || novoPreco === null) {
        return;
    }

    if (novoNome === "" || novoPreco === "") {
        alert("Valores inválidos!");
        return;
    }

    produtos[index].nome = novoNome;
    produtos[index].preco = novoPreco;

    localStorage.setItem("produtos", JSON.stringify(produtos));

    renderizarLista();
}

renderizarLista();