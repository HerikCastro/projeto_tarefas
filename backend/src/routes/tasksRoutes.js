import * as controller from "../controllers/tasksController.js";

export const routes = {
    listar: () => controller.listar(),
    criar: (data) => controller.criar(data),
    atualizar: (id, data) => controller.atualizar(id, data),
    deletar: (id) => controller.deletar(id)
};