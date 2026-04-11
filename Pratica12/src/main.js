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

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div>
                <p>${produto.nome}</p>
                <p>R$ ${produto.preco}</p>
            </div>
        `;
    });
}

renderizarLista();