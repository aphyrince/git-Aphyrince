import { create } from "zustand";

interface PromptLine {
    type: "result" | "cmd";
    text: string;
    key: string;
}

interface PromptLineState {
    list: PromptLine[];
    addLine: ({ text, type }: { text: string; type: "result" | "cmd" }) => void;
    clearLine: () => void;
}

const usePromptStore = create<PromptLineState>((set) => ({
    list: [],
    addLine: ({ text, type }: { text: string; type: "result" | "cmd" }) => {
        const newLine = { text, type, key: Date() };
        set((state) => ({ list: [...state.list, newLine] }));
    },
    clearLine: () => {
        set(() => ({ list: [] }));
    },
}));

export default usePromptStore;
