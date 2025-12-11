import "./Option.css";
import { BiSolidBrightness, BiSolidFilePlus } from "react-icons/bi";
import RepoModal from "./repoModal/RepoModal";
import { MouseEvent, useState } from "react";
import SettingModal from "./settingModal/SettingModal";
import useRepositoryClick from "../../hooks/useRepositoryClick";
import useRepositoryStore from "../../stores/repository/useRepositoryStore";
import { Repository } from "../../global";
import RepoContextMenu from "./repoContextMenu/RepoContextMenu";

const Option = () => {
    const currentRepo = useRepositoryStore((s) => s.currentRepo);
    const repoList = useRepositoryStore((s) => s.list);
    const { handleRepoClick } = useRepositoryClick();

    const [isRepoModal, setIsRepoModal] = useState(false);
    const [isSetting, setIsSetting] = useState(false);
    const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

    const handleRepoRightClick = (
        e: MouseEvent<HTMLDivElement>,
        repo: Repository
    ) => {
        console.log(e);
        setMenu({ x: e.clientX, y: e.clientY });
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
                            // onContextMenu={() => handleRepoRightClick(repo)}
                            onContextMenu={(e) => handleRepoRightClick(e, repo)}
                        >
                            {repo.name}
                        </div>
                    ))}
                </div>
                <button
                    className="option-button "
                    title="add repository"
                    onClick={() => setIsRepoModal(true)}
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
            {isRepoModal && <RepoModal onExit={() => setIsRepoModal(false)} />}
            {isSetting && <SettingModal onExit={() => setIsSetting(false)} />}
            {menu && (
                <RepoContextMenu
                    x={menu.x}
                    y={menu.y}
                    onClose={() => {
                        setMenu(null);
                    }}
                />
            )}
        </div>
    );
};

export default Option;
