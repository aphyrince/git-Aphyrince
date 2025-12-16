import { create } from "zustand";
import { Repository } from "../../global";

interface HistoryItem {
    graph: string;
    comment: string;
    date: string;
    author: string;
    commit: string;
    key: string;
}

interface HistoryState {
    currentRepo: Repository | null;
    list: HistoryItem[];
    add: (history: HistoryItem) => void;
    update: (history: HistoryItem) => void;
    setHistory: (newList: HistoryItem[]) => void;
    setCurrentRepo: (repo: Repository) => void;
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
    currentRepo: null,
    list: dummyHistory,
    add: (history: HistoryItem) => {
        const newKey = new Date().getTime().toString();
        history.key = newKey;
        set((state) => ({ list: [...state.list, history] }));
    },
    update: (history: HistoryItem) => {
        set((state) => ({
            list: state.list.map((item) =>
                item.key === history.key ? history : item
            ),
        }));
    },
    setHistory: (newList: HistoryItem[]) => {
        set(() => ({ list: [...newList] }));
    },
    setCurrentRepo: (repo: Repository) => {
        set(() => ({ currentRepo: repo }));
    },
}));

export default useHistoryStore;
