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
}

const usePromptStore = create<PromptLineState>((set) => ({
    currentRepo: null,
    list: [],
    add: (text: string, type: "result" | "cmd") => {
        const newLine = { text, type, key: Date() };
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
}));

export default usePromptStore;
