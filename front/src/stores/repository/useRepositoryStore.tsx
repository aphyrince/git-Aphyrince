import { create } from "zustand";
import { Repository } from "../../global";

interface RepositoryState {
    currentRepo: Repository | null;
    list: Repository[];
    add: (name: string, path: string) => void;
    update: (repo: Repository) => void;
    remove: (key: string) => void;
    setCurrentRepo: (repo: Repository) => void;
    setList: (repoList: Repository[]) => void;
}

const useRepositoryStore = create<RepositoryState>((set) => ({
    currentRepo: null,
    list: [],
    add: (name: string, path: string) => {
        const newRepo = {
            name,
            path,
            key: Date(),
            hisList: [],
            promptList: [],
        };
        set((state) => ({ list: [...state.list, newRepo] }));
    },
    update: (repo: Repository) =>
        set((state) => ({
            list: state.list.map((r) => (r.key === repo.key ? repo : r)),
        })),
    remove: (key: string) =>
        set((state) => ({
            list: state.list.filter((r) => r.key !== key),
        })),
    setCurrentRepo: (repo: Repository) =>
        set(() => ({
            currentRepo: repo,
        })),
    setList: (list: Repository[]) =>
        set({
            list,
        }),
}));

export default useRepositoryStore;
