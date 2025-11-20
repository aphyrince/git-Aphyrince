import { create } from "zustand";

interface HistoryItem {
    graph: string;
    comment: string;
    date: string;
    author: string;
    commit: string;
    key: string;
}

interface HistoryState {
    list: HistoryItem[];
    addHistory: (history: HistoryItem) => void;
    updateHistory: (history: HistoryItem) => void;
}

const useHistoryStore = create<HistoryState>((set) => ({
    list: [],
    addHistory: (history: HistoryItem) => {
        history.key = Date();
        set((state) => ({ list: [...state.list, history] }));
    },
    updateHistory: (history: HistoryItem) => {
        set((state) => ({
            list: state.list.map((item) =>
                item.key === history.key ? history : item
            ),
        }));
    },
}));

export default useHistoryStore;
