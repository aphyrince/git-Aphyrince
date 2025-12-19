import useRepositoryStore from "../stores/repository/useRepositoryStore";
import dataLoad from "../preloads/dataLoad";
import useThemeStore from "../stores/theme/useThemeStore";
import useCmdStore from "../stores/command/useCmdStore";
import dataUpdate from "../preloads/dataUpdate";

const useFetchActions = () => {
    const { setList, currentRepo, list: repoList } = useRepositoryStore();
    const { mode, keyColor } = useThemeStore();
    const { cmdList } = useCmdStore();

    const initialLoading = () => {
        const load = async () => {
            const data = await dataLoad();
            setList(data.repos);
        };
        load();
    };

    const composeData = () => {
        const themeData = {
            mode,
            keyColor,
        };
        const data = {
            currentRepo,
            repos: repoList,
            cmds: cmdList,
            themeData,
        };

        return data;
    };

    const updateFetch = () => {
        const data = composeData();
        return dataUpdate(data);
    };

    return {
        initialLoading,
        updateFetch,
    };
};

export default useFetchActions;
