import useRepoStore, { Repo } from "../../stores/repo/useRepoStore";
import "./Option.css";
import { BiSolidBrightness, BiSolidFilePlus } from "react-icons/bi";

const Option = () => {
    const {
        currentRepo,
        repoList,
        addRepo,
        updateRepo,
        deleteRepo,
        setCurrentRepo,
    } = useRepoStore();

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
                <button className="repo-add-btn" title="add repository">
                    <BiSolidFilePlus size={40} />
                </button>
            </div>
            <div className="option-section right">
                <button className="setting-btn" title="setting">
                    <BiSolidBrightness size={40} />
                </button>
            </div>
        </div>
    );
};

export default Option;
