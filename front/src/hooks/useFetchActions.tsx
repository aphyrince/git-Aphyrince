import React from "react";
import useRepositoryStore from "../stores/repository/useRepositoryStore";
import dataLoad from "../preloads/dataLoad";

const useFetchActions = () => {
    const { setList } = useRepositoryStore();

    const initialLoading = () => {
        const load = async () => {
            const data = await dataLoad();
            setList(data.repos);
        };
        load();
    };

    return { initialLoading };
};

export default useFetchActions;
