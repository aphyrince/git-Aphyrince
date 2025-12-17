import { ChangeEvent, useState } from "react";
import "./RepoEditModal.css";
import { BsPlusSquareFill, BsXSquareFill, BsXCircleFill } from "react-icons/bs";
import useRepositoryStore from "../../../../../stores/repository/useRepositoryStore";
import { Repository } from "../../../../../global";

const EditModal = ({
    onExit,
    editRepo,
}: {
    onExit: () => void;
    editRepo: Repository;
}) => {
    const { update } = useRepositoryStore();

    const [data, setData] = useState({
        path: editRepo.path,
        name: editRepo.name,
    });

    const handleExit = () => {
        onExit();
    };

    const handleEdit = () => {
        if (data.path === "" || data.name === "") return;
        update({ ...editRepo, ...data });
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
                    <span>Edit repository</span>
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
                    <button onClick={handleEdit} className="option-button">
                        <BsPlusSquareFill size={40} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
