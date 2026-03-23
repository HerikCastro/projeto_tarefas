import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { routes } from "../backend/src/routes/tasksRoutes.js";

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: path.resolve("electron/preload.js")
        }
    });

    win.loadFile("frontend/index.html");
}

app.whenReady().then(createWindow);

ipcMain.handle("tasks:listar", async () => await routes.listar());
ipcMain.handle("tasks:criar", async (e, data) => await routes.criar(data));
ipcMain.handle("tasks:atualizar", async (e, id, data) => await routes.atualizar(id, data));
ipcMain.handle("tasks:deletar", async (e, id) => await routes.deletar(id));