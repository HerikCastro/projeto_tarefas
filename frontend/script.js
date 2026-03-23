if (!window.api) {
    window.api = (() => {
        let tarefas = [
            { id: 1, titulo: "Tarefa Exemplo", descricao: "Descrição", status: 0 },
            { id: 2, titulo: "Outra Tarefa", descricao: "Teste", status: 1 }
        ];
        let idCounter = 3;
        return {
            listar: async () => tarefas,
            criar: async (tarefa) => {
                tarefa.id = idCounter++;
                tarefas.push(tarefa);
            },
            atualizar: async (id, dados) => {
                const t = tarefas.find(t => t.id === id);
                if (t) Object.assign(t, dados);
            },
            deletar: async (id) => {
                tarefas = tarefas.filter(t => t.id !== id);
            }
        };
    })();
}

document.getElementById("btnAdd").addEventListener("click", criar);

async function carregar() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    const tarefas = await window.api.listar();

    tarefas.forEach(t => {
        const li = document.createElement("li");
        const concluido = t.status == 1;
        if (concluido) li.classList.add("concluida");

        li.innerHTML = `
            <div class="task">
                <div>
                    <b class="${concluido ? "concluido" : "pendente"}">${t.titulo}</b>
                    <small>${t.descricao || ""}</small>
                </div>
                <div class="acoes">
                    <button class="edit">✏️</button>
                    <button class="check">${concluido ? "↩" : "✔"}</button>
                    <button class="delete">❌</button>
                </div>
            </div>
        `;

        li.querySelector(".edit").onclick = () => editar(t.id);
        li.querySelector(".check").onclick = () => toggleStatus(t.id);
        li.querySelector(".delete").onclick = () => remover(t.id);

        lista.appendChild(li);
    });
}

async function criar() {
    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    if (!titulo) return;

    await window.api.criar({ titulo, descricao, status: 0 });
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    await carregar();
}

async function remover(id) {
    await window.api.deletar(id);
    await carregar();
}

async function editar(id) {
    const tarefas = await window.api.listar();
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    const li = document.querySelector(`#lista li:nth-child(${tarefas.indexOf(tarefa)+1})`);
    const div = li.querySelector(".task > div:first-child");

    // cria inputs temporários
    const inputTitulo = document.createElement("input");
    inputTitulo.type = "text";
    inputTitulo.value = tarefa.titulo;
    const inputDesc = document.createElement("input");
    inputDesc.type = "text";
    inputDesc.value = tarefa.descricao;

    div.innerHTML = "";
    div.appendChild(inputTitulo);
    div.appendChild(inputDesc);

    const btnSalvar = document.createElement("button");
    btnSalvar.textContent = "💾 Salvar";
    li.querySelector(".acoes").appendChild(btnSalvar);

    btnSalvar.onclick = async () => {
        const novoTitulo = inputTitulo.value.trim();
        const novaDescricao = inputDesc.value.trim();
        if (!novoTitulo) return;

        await window.api.atualizar(id, {
            titulo: novoTitulo,
            descricao: novaDescricao,
            status: tarefa.status
        });
        await carregar();
    };
}

async function toggleStatus(id) {
    const tarefas = await window.api.listar();
    const tarefa = tarefas.find(t => t.id === id);

    const novoStatus = tarefa.status == 1 ? 0 : 1;

    await window.api.atualizar(id, { titulo: tarefa.titulo, descricao: tarefa.descricao, status: novoStatus });
    await carregar();
}

window.onload = carregar;