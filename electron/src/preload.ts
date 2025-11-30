import { contextBridge, ipcRenderer } from "electron";
import { Cmd, Repository, Theme } from "./types.d";

interface Data {
    repos: Repository[];
    cmds: Cmd[];
    theme: Theme;
}

contextBridge.exposeInMainWorld("store", {
    dataLoad: (): Promise<Data> => {
        console.log("PRELOAD dataLoad() CALLED.");
        return ipcRenderer.invoke("data-load");
    },
    dataUpdate: (newData: Data): Promise<boolean> => {
        console.log("PRELOAD dataUpdate() CALLED.");
        return ipcRenderer.invoke("data-update", newData);
    },
    commandExe: (command: string): Promise<string> => {
        console.log("PRELOAD commandExe() CALLED.");
        return ipcRenderer.invoke("command-exe", command);
    },
});

/* command -> result -> 
    initial loading     /   update
*/
