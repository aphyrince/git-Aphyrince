import { create } from "zustand";

export interface Repo {
    name: string;
    path: string;
    key: string;
}

interface RepoState {
    currentRepo: Repo | null;
    repoList: Repo[];
    addRepo: (repo: Repo) => void;
    updateRepo: (repo: Repo) => void;
    deleteRepo: (key: string) => void;
    setCurrentRepo: (repo: Repo) => void;
}

const dummyRepoList = [
    { name: "repo1", path: "github.com/repo1", key: "23132131" },
    { name: "repo2", path: "github.com/repo2", key: "2313213213" },
    { name: "repo3", path: "github.com/repo3", key: "23132144454" },
];

const useRepoStore = create<RepoState>()((set) => ({
    currentRepo: null,
    repoList: dummyRepoList,

    addRepo: (repo) => {
        repo.key = Date();
        set((state) => ({ repoList: [...state.repoList, repo] }));
    },

    updateRepo: (repo) =>
        set((state) => ({
            repoList: state.repoList.map((r) =>
                r.key === repo.key ? repo : r
            ),
        })),

    deleteRepo: (key) =>
        set((state) => ({
            repoList: state.repoList.filter((r) => r.key !== key),
        })),

    setCurrentRepo: (repo: Repo) => {
        set((state) => ({
            currentRepo: repo,
        }));
    },
}));

export default useRepoStore;
