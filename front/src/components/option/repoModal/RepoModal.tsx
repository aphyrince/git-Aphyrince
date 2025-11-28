import { ChangeEvent, useState } from "react";
import useRepoStore from "../../../stores/repo/useRepoStore";
import "./RepoModal.css";
import { BsPlusSquareFill, BsXSquareFill, BsXCircleFill } from "react-icons/bs";

const RepoModal = ({ onExit }: { onExit: () => void }) => {
    const addRepo = useRepoStore((state) => state.addRepo);
    const [data, setData] = useState({ path: "", name: "" });

    const handleExit = () => {
        setData({ path: "", name: "" });
        onExit();
    };

    const handleCreate = () => {
        if (data.path === "" || data.name === "") return;
        const newRepo = { ...data, key: Date() };
        addRepo(newRepo);
        handleExit();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="modal-repo" onClick={handleExit}>
            <div
                className="modal-repo-container"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="modal-header">
                    <span>Add repository</span>
                    <button className="option-button" onClick={handleExit}>
                        <BsXCircleFill size={24} />
                    </button>
                </div>
                <div className="input-container">
                    <div className="input-text">
                        <label>path</label>
                        <input
                            name="path"
                            type="text"
                            value={data.path}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-text">
                        <label>name</label>
                        <input
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="btn-container">
                    <button onClick={handleExit} className="option-button">
                        <BsXSquareFill size={40} />
                    </button>
                    <button onClick={handleCreate} className="option-button">
                        <BsPlusSquareFill size={40} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RepoModal;
