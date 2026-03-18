import express from "express";

const app = express();
app.use(express.json());

let tarefas = [];

// Criar tarefa
app.post("/tasks", (req, res) => {
    const tarefa = { id: Date.now(), ...req.body };
    tarefas.push(tarefa);
    res.status(201).json(tarefa);
});

// Listar tarefas
app.get("/tasks", (req, res) => {
    res.json(tarefas);
});

// Atualizar tarefa
app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    tarefas[index] = { ...tarefas[index], ...req.body };
    res.json(tarefas[index]);
});

// Deletar tarefa
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    tarefas = tarefas.filter(t => t.id !== id);
    res.sendStatus(204);
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});