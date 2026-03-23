import * as model from "../models/tasksModel.js";

export const listar = async () => await model.getAll();

export const criar = async (data) => await model.create(data);

export const atualizar = async (id, data) => await model.update(id, data);

export const deletar = async (id) => await model.remove(id);