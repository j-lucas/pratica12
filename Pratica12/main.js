// ============================================================
// ESTADO EM MEMÓRIA (array JavaScript — sem localStorage)
// ============================================================
let produtos = [];
let indiceEditando = null;

// ============================================================
// CADASTRO
// ============================================================
const form = document.getElementById("formProduto");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = document.getElementById("preco").value.trim();

    // Limpa erros anteriores
    document.getElementById("erroNome").textContent = "";
    document.getElementById("erroPreco").textContent = "";

    let valido = true;

    if (nome === "") {
      document.getElementById("erroNome").textContent = "Informe o nome do produto.";
      valido = false;
    }

    if (preco === "" || isNaN(preco) || Number(preco) < 0) {
      document.getElementById("erroPreco").textContent = "Informe um preço válido.";
      valido = false;
    }

    if (!valido) return;

    produtos.push({
      nome: nome,
      preco: parseFloat(preco),
    });

    mostrarMensagem("Produto cadastrado com sucesso! ✅");
    form.reset();
  });
}

function mostrarMensagem(texto) {
  const div = document.getElementById("mensagem");
  if (!div) return;
  div.textContent = texto;
  div.className = "mensagem-sucesso";
  setTimeout(() => (div.textContent = ""), 3000);
}

// ============================================================
// LISTAGEM
// ============================================================
function renderizarLista() {
  const lista = document.getElementById("lista");
  if (!lista) return;

  lista.innerHTML = "";

  if (produtos.length === 0) {
    lista.innerHTML = `<p class="vazio">Nenhum produto cadastrado ainda. <a href="/cadastro.html">Cadastrar agora</a></p>`;
    return;
  }

  produtos.forEach((produto, index) => {
    const precoFormatado = produto.preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const div = document.createElement("div");
    div.className = "card-produto";
    div.innerHTML = `
      <div class="info-produto">
        <strong>${produto.nome}</strong>
        <span>${precoFormatado}</span>
      </div>
      <div class="acoes">
        <button class="editar" data-index="${index}">Editar</button>
        <button class="excluir" data-index="${index}">Excluir</button>
      </div>
    `;
    lista.appendChild(div);
  });

  // Eventos dos botões via delegação
  lista.querySelectorAll(".excluir").forEach((btn) => {
    btn.addEventListener("click", () => excluirProduto(Number(btn.dataset.index)));
  });

  lista.querySelectorAll(".editar").forEach((btn) => {
    btn.addEventListener("click", () => abrirModal(Number(btn.dataset.index)));
  });
}

function excluirProduto(index) {
  const confirmar = confirm(`Excluir "${produtos[index].nome}"?`);
  if (!confirmar) return;
  produtos.splice(index, 1);
  renderizarLista();
}

// ============================================================
// MODAL DE EDIÇÃO
// ============================================================
const modalOverlay = document.getElementById("modalOverlay");
const formEditar = document.getElementById("formEditar");
const btnCancelar = document.getElementById("btnCancelar");

function abrirModal(index) {
  indiceEditando = index;
  document.getElementById("editNome").value = produtos[index].nome;
  document.getElementById("editPreco").value = produtos[index].preco;
  document.getElementById("erroEditNome").textContent = "";
  document.getElementById("erroEditPreco").textContent = "";
  modalOverlay.classList.remove("escondido");
}

function fecharModal() {
  modalOverlay.classList.add("escondido");
  indiceEditando = null;
}

if (btnCancelar) {
  btnCancelar.addEventListener("click", fecharModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) fecharModal();
  });
}

if (formEditar) {
  formEditar.addEventListener("submit", function (e) {
    e.preventDefault();

    const novoNome = document.getElementById("editNome").value.trim();
    const novoPreco = document.getElementById("editPreco").value.trim();

    document.getElementById("erroEditNome").textContent = "";
    document.getElementById("erroEditPreco").textContent = "";

    let valido = true;

    if (novoNome === "") {
      document.getElementById("erroEditNome").textContent = "Informe o nome.";
      valido = false;
    }

    if (novoPreco === "" || isNaN(novoPreco) || Number(novoPreco) < 0) {
      document.getElementById("erroEditPreco").textContent = "Informe um preço válido.";
      valido = false;
    }

    if (!valido) return;

    produtos[indiceEditando].nome = novoNome;
    produtos[indiceEditando].preco = parseFloat(novoPreco);

    fecharModal();
    renderizarLista();
  });
}

// ============================================================
// INIT
// ============================================================
renderizarLista();
