async function carregar() {
    const tarefas = await window.api.listar();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    tarefas.forEach(t => {
        const li = document.createElement("li");

        li.innerHTML = `
            <b>${t.titulo}</b> - ${t.status}
            <button onclick="remover(${t.id})">❌</button>
            <button onclick="editar(${t.id})">✏️</button>
        `;

        lista.appendChild(li);
    });
}

async function criar() {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    await window.api.criar({
        titulo,
        descricao,
        status: "pendente"
    });

    carregar();
}

async function remover(id) {
    await window.api.deletar(id);
    carregar();
}

async function editar(id) {
    const novo = prompt("Novo título:");
    if (!novo) return;

    await window.api.atualizar(id, {
        titulo: novo,
        descricao: "",
        status: "pendente"
    });

    carregar();
}

carregar();