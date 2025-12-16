import { create } from "zustand";
import { Repository } from "../../global";

interface PromptLine {
    type: "result" | "cmd";
    text: string;
    key: string;
}

interface PromptLineState {
    currentRepo: Repository | null;
    list: PromptLine[];
    add: (text: string, type: "result" | "cmd") => void;
    clear: () => void;
    setPrompt: (newList: PromptLine[]) => void;
    setCurrentRepo: (repo: Repository) => void;
    cmdPaste: string;
    cmdExec: string;
    setCmdPaste: (cmd: string) => void;
    setCmdExec: (cmd: string) => void;
}

const usePromptStore = create<PromptLineState>((set) => ({
    currentRepo: null,
    list: [],
    add: (text: string, type: "result" | "cmd") => {
        const newKey = new Date().getTime().toString();
        const newLine = { text, type, key: newKey };
        set((state) => ({ list: [...state.list, newLine] }));
    },
    clear: () => {
        set(() => ({ list: [] }));
    },
    setPrompt: (newList: PromptLine[]) => {
        set(() => ({ list: [...newList] }));
    },
    setCurrentRepo: (repo: Repository) => {
        set(() => ({ currentRepo: repo }));
    },
    cmdPaste: "",
    cmdExec: "",
    setCmdPaste: (cmd: string) => {
        set(() => ({ cmdPaste: cmd }));
    },
    setCmdExec: (cmd: string) => {
        set(() => ({ cmdExec: cmd }));
    },
}));

export default usePromptStore;
