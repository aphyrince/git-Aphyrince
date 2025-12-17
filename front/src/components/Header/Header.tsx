import { BiSolidBrightness, BiSolidFilePlus } from "react-icons/bi";
import RepoModal from "./repoModal/RepoModal";
import { useState } from "react";
import SettingModal from "./settingModal/SettingModal";
import useRepositoryClick from "../../hooks/useRepositoryClick";
import useRepositoryStore from "../../stores/repository/useRepositoryStore";
import RepoContextMenu from "./repoContextMenu/RepoContextMenu";
import RepoEditModal from "./repoEditModal/RepoEditModal";
import useRepoContextMenu from "../../hooks/useRepoContextMenu";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 8vh;
    background-color: var(--key-color);
    color: var(--font-color);

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: relative;
`;

const Section = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 10px;
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

const RepoList = styled.div`
    display: flex;
    align-items: end;
    width: fit-content;
    height: 100%;
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

const Header = () => {
    const { currentRepo, list: repoList, remove } = useRepositoryStore();
    const { handleRepoClick } = useRepositoryClick();
    const { isOpen, pos, target, handleContextMenu, handleClose } =
        useRepoContextMenu();

    const [isAdd, setIsAdd] = useState(false);
    const [isSetting, setIsSetting] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <Wrapper>
            <Section>
                <RepoList>
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
                </RepoList>
                <Button title="add repository" onClick={() => setIsAdd(true)}>
                    <BiSolidFilePlus size={48} />
                </Button>
            </Section>
            <Section className="option-section right">
                <Button title="setting" onClick={() => setIsSetting(true)}>
                    <BiSolidBrightness size={48} />
                </Button>
            </Section>
            {isAdd && <RepoModal onExit={() => setIsAdd(false)} />}
            {isSetting && <SettingModal onExit={() => setIsSetting(false)} />}
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

export default Header;
