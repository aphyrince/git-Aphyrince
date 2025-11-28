import useRepoStore, { Repo } from "../../stores/repo/useRepoStore";
import "./Option.css";
import { BiSolidBrightness, BiSolidFilePlus } from "react-icons/bi";
import RepoModal from "./repoModal/RepoModal";
import { useState } from "react";
import SettingModal from "./settingModal/SettingModal";

const Option = () => {
    const {
        currentRepo,
        repoList,
        addRepo,
        updateRepo,
        deleteRepo,
        setCurrentRepo,
    } = useRepoStore();

    const [isRepoModal, setIsRepoModal] = useState(false);
    const [isSetting, setIsSetting] = useState(false);

    const handleOpenSetting = () => {
        setIsSetting(true);
    };

    const handleExitSetting = () => {
        setIsSetting(false);
    };

    const handleOpenRepoModal = () => {
        setIsRepoModal(true);
    };

    const handleExitRepoModal = () => {
        setIsRepoModal(false);
    };

    const handleRepoClick = (repo: Repo) => {
        setCurrentRepo(repo);
    };

    return (
        <div className="option">
            <div className="option-section left">
                <div className="repo-list">
                    {repoList.map((repo) => (
                        <div
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
                    onClick={handleOpenSetting}
                >
                    <BiSolidBrightness size={48} />
                </button>
            </div>
            {isRepoModal && <RepoModal onExit={handleExitRepoModal} />}
            {isSetting && <SettingModal onExit={handleExitSetting} />}
        </div>
    );
};

export default Option;
