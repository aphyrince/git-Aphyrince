import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { Data } from "./types";
import fs from "fs";
import { exec } from "child_process";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
    app.quit();
}

const dataPath = path.join(app.getPath("userData"), "data.json");

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadFile(
            path.join(__dirname, "../../../front/build/index.html")
        );
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(
            path.join(process.resourcesPath, "build/index.html")
        );
    }
};

app.on("ready", () => {
    ipcMain.handle("data-load", async (): Promise<Data> => {
        try {
            if (!fs.existsSync(dataPath))
                throw new Error("data-file didn't exist");
            const json = fs.readFileSync(dataPath, "utf8");
            return JSON.parse(json);
        } catch (error) {
            console.error(error);
            return {
                repos: [],
                cmds: [],
                theme: {
                    mode: "white",
                    keyColor: "#aaaaaa",
                    fontColor: "#000000",
                    bgColor: "#ffffff ",
                },
            };
        }
    });

    ipcMain.handle("data-update", async (_, data: Data) => {
        console.log("DATA UPDATE CALLED WITH :", data);
        try {
            if (!data) {
                console.error("ERROR : DATA IS FALSE!!!");
            }
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error("WRITE ERROR:", error);
            return false;
        }
    });

    ipcMain.handle("command-exe", async (_, command) => {
        console.log("COMMAND EXE CALLED WITH :", command);
        return new Promise((resolve, _) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    resolve({ success: false, output: stderr });
                } else {
                    resolve({ success: true, output: stdout });
                }
            });
        });
    });
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
