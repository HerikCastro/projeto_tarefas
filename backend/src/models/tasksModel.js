import { db } from "../db.js";

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM tasks");
    return rows;
};

export const create = async ({ titulo, descricao, status }) => {
    const [result] = await db.query(
        "INSERT INTO tasks (titulo, descricao, status) VALUES (?, ?, ?)",
        [titulo, descricao, status]
    );

    return { id: result.insertId, titulo, descricao, status };
};

export const update = async (id, { titulo, descricao, status }) => {
    await db.query(
        "UPDATE tasks SET titulo=?, descricao=?, status=? WHERE id=?",
        [titulo, descricao, status, id]
    );

    return { id, titulo, descricao, status };
};

export const remove = async (id) => {
    await db.query("DELETE FROM tasks WHERE id=?", [id]);
};