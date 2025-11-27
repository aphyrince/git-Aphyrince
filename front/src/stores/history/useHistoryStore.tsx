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

const dummyHistory = [
    {
        graph: "grpds",
        comment: "hello",
        date: Date(),
        author: "dkswjdgh",
        commit: "219301",
        key: Date(),
    },
    {
        graph: "grpds312",
        comment: "world!",
        date: Date() + 1,
        author: "dkswjdgh123",
        commit: "21930111221",
        key: Date() + 1,
    },
    {
        graph: "grpd312dsas",
        comment: "good",
        date: Date() + 2,
        author: "dkswjdgdsasdadsh",
        commit: "21930qw12311",
        key: Date() + 2,
    },
];

const useHistoryStore = create<HistoryState>((set) => ({
    // list: [],
    list: dummyHistory,
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
