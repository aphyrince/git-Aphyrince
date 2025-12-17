import { ChangeEvent, useState } from "react";
import { BsPlusSquareFill, BsXSquareFill, BsXCircleFill } from "react-icons/bs";
import useRepositoryStore from "../../../../stores/repository/useRepositoryStore";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.63);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    color: var(--font-color);
    background-color: var(--bg-color);
    border-radius: 16px;
    width: 600px;
    height: 400px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    overflow: hidden;
`;

const ModalHeader = styled.div`
    width: 100%;
    height: 32px;
    background-color: var(--key-color);
    padding: 0px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InputContainer = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 20px;
    padding: 20px;
`;

const InputText = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 75px 1fr;
    font-size: 24px;
    & input {
        margin-left: 50px;
        border-radius: 8px;
        border: 2px solid var(--key-color);
        font-size: large;
        padding: 4px;

        &:focus {
            border: 4px solid var(--font-color);
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 20px;

    width: 100%;
    height: 80px;
    & > button:hover {
        color: var(--key-color);
    }
`;

const AddModal = ({ onExit }: { onExit: () => void }) => {
    const addRepo = useRepositoryStore((s) => s.add);

    const [data, setData] = useState({ path: "", name: "" });

    const handleExit = () => {
        setData({ path: "", name: "" });
        onExit();
    };

    const handleCreate = () => {
        if (data.path === "" || data.name === "") return;
        addRepo(data.name, data.path);
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
        <Wrapper onClick={handleExit}>
            <ModalContent
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <ModalHeader>
                    <span>Add repository</span>
                    <button className="option-button" onClick={handleExit}>
                        <BsXCircleFill size={24} />
                    </button>
                </ModalHeader>
                <InputContainer>
                    <InputText>
                        <label>path</label>
                        <input
                            name="path"
                            type="text"
                            value={data.path}
                            onChange={handleChange}
                        />
                    </InputText>
                    <InputText>
                        <label>name</label>
                        <input
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </InputText>
                </InputContainer>
                <ButtonContainer>
                    <button onClick={handleExit} className="option-button">
                        <BsXSquareFill size={40} />
                    </button>
                    <button onClick={handleCreate} className="option-button">
                        <BsPlusSquareFill size={40} />
                    </button>
                </ButtonContainer>
            </ModalContent>
        </Wrapper>
    );
};

export default AddModal;
