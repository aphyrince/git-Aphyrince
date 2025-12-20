export interface Repository {
    name: string;
    path: string;
    key: string;
    hisList: History[];
    promptList: PromptLine[];
}

export interface Repo {
    name: string;
    path: string;
    key: string;
}

export interface PromptLine {
    type: "result" | "cmd";
    text: string;
    key: string;
}

export interface History {
    graph: string;
    comment: string;
    date: string;
    author: string;
    commit: string;
    key: string;
}

export interface Cmd {
    text: string;
    key: string;
}

export interface ThemeData {
    mode: "dark" | "white";
    keyColor: string;
}

export interface Data {
    currentRepo: Repository | null;
    repos: Repository[];
    cmds: Cmd[];
    themeData: ThemeData;
}

export {};

declare global {
    interface Window {
        store: {
            dataLoad: () => Promise<Data>;
            dataUpdate: (newData: Data) => Promise<boolean>;
            commandExe: (
                path: string,
                command: string
            ) => Promise<{ success: boolean; output: string }>;
        };
    }
}
