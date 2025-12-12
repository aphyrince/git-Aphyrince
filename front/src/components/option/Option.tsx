import "./Option.css";
import { BiSolidBrightness, BiSolidFilePlus } from "react-icons/bi";
import RepoModal from "./repoModal/RepoModal";
import { useState } from "react";
import SettingModal from "./settingModal/SettingModal";
import useRepositoryClick from "../../hooks/useRepositoryClick";
import useRepositoryStore from "../../stores/repository/useRepositoryStore";
import RepoContextMenu from "./repoContextMenu/RepoContextMenu";
import RepoEditModal from "./repoEditModal/RepoEditModal";
import useRepoContextMenu from "../../hooks/useRepoContextMenu";

const Option = () => {
    const { currentRepo, list: repoList, remove } = useRepositoryStore();
    const { handleRepoClick } = useRepositoryClick();
    const { isOpen, pos, target, handleContextMenu, handleClose } =
        useRepoContextMenu();

    const [isAdd, setIsAdd] = useState(false);
    const [isSetting, setIsSetting] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="option">
            <div className="option-section left">
                <div className="repo-list">
                    {repoList.map((repo) => (
                        <div
                            key={repo.key}
                            className={`repo-item ${
                                currentRepo?.key === repo.key ? "opened" : ""
                            }`}
                            onClick={() => handleRepoClick(repo)}
                            onContextMenu={(e) => handleContextMenu(e, repo)}
                        >
                            {repo.name}
                        </div>
                    ))}
                </div>
                <button
                    className="option-button "
                    title="add repository"
                    onClick={() => setIsAdd(true)}
                >
                    <BiSolidFilePlus size={48} />
                </button>
            </div>
            <div className="option-section right">
                <button
                    className="option-button"
                    title="setting"
                    onClick={() => setIsSetting(true)}
                >
                    <BiSolidBrightness size={48} />
                </button>
            </div>
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
        </div>
    );
};

export default Option;
