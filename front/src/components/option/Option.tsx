import useRepoStore, { Repo } from "../../stores/repo/useRepoStore";
import "./Option.css";
import { BiSolidBrightness, BiSolidFilePlus } from "react-icons/bi";
import RepoModal from "./repoModal/RepoModal";
import { useState } from "react";

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

    const handleOpenRepoModal = () => {
        console.log("open!");
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
                    className="repo-add-btn"
                    title="add repository"
                    onClick={handleOpenRepoModal}
                >
                    <BiSolidFilePlus size={40} />
                </button>
            </div>
            <div className="option-section right">
                <button className="setting-btn" title="setting">
                    <BiSolidBrightness size={40} />
                </button>
            </div>
            {isRepoModal && <RepoModal onExit={handleExitRepoModal} />}
        </div>
    );
};

export default Option;
