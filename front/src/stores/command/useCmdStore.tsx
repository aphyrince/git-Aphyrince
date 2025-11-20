import { create } from "zustand";

export interface Cmd {
    text: string;
    key: string;
}

interface CmdState {
    cmdList: Cmd[];
    addCmd: (cmd: string) => void;
    deleteCmd: (key: string) => void;
}

const useCmdStore = create<CmdState>((set) => ({
    cmdList: [],

    addCmd: (cmd) => {
        const newCmd: Cmd = { text: cmd, key: Date() };
        set((state) => ({ cmdList: [...state.cmdList, newCmd] }));
    },

    deleteCmd: (key) => {
        set((state) => ({
            cmdList: state.cmdList.filter((c) => c.key !== key),
        }));
    },
}));

export default useCmdStore;
