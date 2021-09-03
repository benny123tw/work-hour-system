import { ipcMain, dialog, app } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import whms, { UploadConfigSchema } from 'whms';

const dataPath = app.isPackaged
    ? path.join(process.resourcesPath, "data")
    : "data";
const CONFIG_PATH = path.join(dataPath, 'config.json');

ipcMain.on('save-dialog', async (event, data) => {
    const file = await dialog.showSaveDialog({
        title: "Select File",

    })
});

ipcMain.on('save-to-web', async (event, data: UploadConfigSchema) => {
    writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2));
    const res = await whms.upload(data);
    console.log(res)
    event.sender.send('save-to-web');
});

ipcMain.on('load-config', async (event) => {
    const file = readFileSync(CONFIG_PATH);
    const config: UploadConfigSchema = JSON.parse(file.toString(),);
});