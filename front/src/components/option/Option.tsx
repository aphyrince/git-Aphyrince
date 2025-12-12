import "./Option.css";
import { BiSolidBrightness, BiSolidFilePlus } from "react-icons/bi";
import RepoModal from "./repoModal/RepoModal";
import { MouseEvent, useState } from "react";
import SettingModal from "./settingModal/SettingModal";
import useRepositoryClick from "../../hooks/useRepositoryClick";
import useRepositoryStore from "../../stores/repository/useRepositoryStore";
import { Repository } from "../../global";
import RepoContextMenu from "./repoContextMenu/RepoContextMenu";
import RepoEditModal from "./repoEditModal/RepoEditModal";

const Option = () => {
    const { currentRepo, list: repoList, remove } = useRepositoryStore();
    const { handleRepoClick } = useRepositoryClick();

    const [isAdd, setIsAdd] = useState(false);
    const [isSetting, setIsSetting] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editRepo, setEditRepo] = useState<Repository | null>(null);
    const [menuPos, setMenuPos] = useState<{
        x: number;
        y: number;
    } | null>(null);

    const handleRepoRightClick = (
        e: MouseEvent<HTMLDivElement>,
        repo: Repository
    ) => {
        setEditRepo(repo);
        setMenuPos({ x: e.clientX, y: e.clientY });
        e.preventDefault();
    };

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
                            onContextMenu={(e) => handleRepoRightClick(e, repo)}
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
            {menuPos && editRepo && (
                <RepoContextMenu
                    x={menuPos.x}
                    y={menuPos.y}
                    onClose={() => {
                        setMenuPos(null);
                    }}
                    onDelete={() => {
                        remove(editRepo.key);
                    }}
                    onEdit={() => {
                        setIsEdit(true);
                        setEditRepo(editRepo);
                    }}
                />
            )}
            {isEdit && editRepo && (
                <RepoEditModal
                    onExit={() => setIsEdit(false)}
                    editRepo={editRepo}
                />
            )}
        </div>
    );
};

export default Option;
