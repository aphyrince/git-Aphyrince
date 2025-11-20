import { create } from "zustand";

interface Repo {
    name: string;
    path: string;
    key: string;
}

interface RepoState {
    currentRepo: Repo | null;
    list: Repo[];
    addRepo: (repo: Repo) => void;
    updateRepo: (repo: Repo) => void;
    deleteRepo: (key: string) => void;
}

const useRepoStore = create<RepoState>()((set) => ({
    currentRepo: null,
    list: [],

    addRepo: (repo) => {
        repo.key = Date();
        set((state) => ({ list: [...state.list, repo] }));
    },

    updateRepo: (repo) =>
        set((state) => ({
            list: state.list.map((r) => (r.key === repo.key ? repo : r)),
        })),

    deleteRepo: (key) =>
        set((state) => ({
            list: state.list.filter((r) => r.key !== key),
        })),
}));

export default useRepoStore;
