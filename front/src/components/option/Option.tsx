import "./Option.css";
import { BiSolidBrightness, BiSolidFilePlus } from "react-icons/bi";
import RepoModal from "./repoModal/RepoModal";
import { useState } from "react";
import SettingModal from "./settingModal/SettingModal";
import useRepositoryClick from "../../hooks/useRepositoryClick";
import useRepositoryStore from "../../stores/repository/useRepositoryStore";

const Option = () => {
    const currentRepo = useRepositoryStore((s) => s.currentRepo);
    const repoList = useRepositoryStore((s) => s.list);
    const { handleRepoClick, handleRepoRightClick } = useRepositoryClick();

    const [isRepoModal, setIsRepoModal] = useState(false);
    const [isSetting, setIsSetting] = useState(false);

    const handleOpenRepoModal = () => {
        setIsRepoModal(true);
    };

    const handleExitRepoModal = () => {
        setIsRepoModal(false);
    };

    const openSetting = () => {
        setIsSetting(true);
    };

    const exitSetting = () => {
        setIsSetting(false);
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
                        >
                            {repo.name}
                        </div>
                    ))}
                </div>
                <button
                    className="option-button "
                    title="add repository"
                    onClick={handleOpenRepoModal}
                >
                    <BiSolidFilePlus size={48} />
                </button>
            </div>
            <div className="option-section right">
                <button
                    className="option-button"
                    title="setting"
                    onClick={openSetting}
                >
                    <BiSolidBrightness size={48} />
                </button>
            </div>
            {isRepoModal && <RepoModal onExit={handleExitRepoModal} />}
            {isSetting && <SettingModal onExit={exitSetting} />}
        </div>
    );
};

export default Option;
