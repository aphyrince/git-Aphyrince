import useRepositoryStore from "../stores/repository/useRepositoryStore";
import { Repository } from "../global";
import usePromptStore from "../stores/prompt/usePromptStore";
import useHistoryStore from "../stores/history/useHistoryStore";

const useRepositoryClick = () => {
    const repoState = useRepositoryStore();
    const promptState = usePromptStore();
    const historyState = useHistoryStore();

    const handleRepoClick = (repo: Repository) => {
        repoState.setCurrentRepo(repo);
        promptState.setCurrentRepo(repo);
        promptState.setPrompt(repo.promptList);
        historyState.setCurrentRepo(repo);
        historyState.setHistory(repo.hisList);
    };
    const handleRepoRightClick = (repo: Repository) => {};

    return { handleRepoClick, handleRepoRightClick };
};

export default useRepositoryClick;
