import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    listar: () => ipcRenderer.invoke("tasks:listar"),
    criar: (data) => ipcRenderer.invoke("tasks:criar", data),
    atualizar: (id, data) => ipcRenderer.invoke("tasks:atualizar", id, data),
    deletar: (id) => ipcRenderer.invoke("tasks:deletar", id)
});