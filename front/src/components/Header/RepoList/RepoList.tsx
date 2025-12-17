import styled from "styled-components";
import useRepositoryStore from "../../../stores/repository/useRepositoryStore";
import useRepositoryClick from "../../../hooks/useRepositoryClick";
import useRepoContextMenu from "../../../hooks/useRepoContextMenu";
import { BiSolidFilePlus } from "react-icons/bi";
import RepoContextMenu from "./repoContextMenu/RepoContextMenu";
import { useState } from "react";
import RepoEditModal from "./modals/EditModal/EditModal";
import AddModal from "./modals/AddModal";

const Wrapper = styled.div`
    display: flex;
    align-items: end;
    width: fit-content;
    height: 100%;
`;

const Button = styled.div`
    width: fit-content;
    height: fit-content;

    border: none;
    background: none;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: var(--font-color);

    &:hover {
        color: var(--bg-color);
    }
`;

const RepoItem = styled.div`
    color: var(--font-color);
    width: 100px;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid var(--font-color);
    border-top: 2px solid var(--font-color);
    &:first-of-type {
        border-left: 2px solid var(--font-color);
    }

    &.opened {
        background-color: var(--bg-color);
    }

    &:not(.opened):hover {
        background-color: var(--bg-color);
        filter: brightness(80%);
    }
`;

const RepoList = () => {
    const { currentRepo, list: repoList, remove } = useRepositoryStore();
    const { handleRepoClick } = useRepositoryClick();
    const { isOpen, pos, target, handleContextMenu, handleClose } =
        useRepoContextMenu();
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <Wrapper>
            {repoList.map((repo) => (
                <RepoItem
                    key={repo.key}
                    className={`${
                        currentRepo?.key === repo.key ? "opened" : ""
                    }`}
                    onClick={() => handleRepoClick(repo)}
                    onContextMenu={(e) => handleContextMenu(e, repo)}
                >
                    {repo.name}
                </RepoItem>
            ))}
            <Button title="add repository" onClick={() => setIsAdd(true)}>
                <BiSolidFilePlus size={48} />
            </Button>
            {isAdd && <AddModal onExit={() => setIsAdd(false)} />}
            {isOpen && pos && target && (
                <RepoContextMenu
                    x={pos.x}
                    y={pos.y}
                    onClose={handleClose}
                    onDelete={() => {
                        remove(target.key);
                    }}
                    onEdit={() => {
                        setIsEdit(true);
                    }}
                />
            )}
            {isEdit && target && (
                <RepoEditModal
                    onExit={() => setIsEdit(false)}
                    editRepo={target}
                />
            )}
        </Wrapper>
    );
};

export default RepoList;
