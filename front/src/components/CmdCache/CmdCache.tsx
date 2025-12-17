import { useCallback, useState } from "react";
import styled from "styled-components";
import useCmdStore from "../../stores/command/useCmdStore";
import CmdElem from "./CmdElem";
import { BsFilePlusFill } from "react-icons/bs";

const Wrapper = styled.div`
    height: 92vh;
    color: var(--font-color);
`;

const CmdList = styled.ul`
    height: 84vh;
    padding: 5px;
    overflow-y: auto;
`;

const Controls = styled.div`
    border-top: 2px solid var(--key-color);
    width: 100%;
    height: 8vh;
    gap: 5px;
    padding: 0 4px;
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 24px;
    border-radius: 8px;
    border: none;
    background-color: var(--key-color);
    color: var(--font-color);

    &:focus {
        outline: none;
        border: 3px solid var(--font-color);
    }
`;

const AddButton = styled.button`
    border: none;
    background: none;
    transition: filter 0.3s ease;
    color: var(--font-color);
    width: fit-content;
    height: fit-content;
    cursor: pointer;

    &:hover {
        filter: opacity(70%);
    }
`;

const CmdCache = () => {
    const cmdList = useCmdStore((state) => state.cmdList);
    const addCmd = useCmdStore((state) => state.addCmd);
    const [input, setInput] = useState("");

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
        },
        []
    );

    const handleEnterKey = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleSubmit();
        },
        [input]
    );

    const handleSubmit = useCallback(() => {
        if (input === "") return;
        addCmd(input);
        setInput("");
    }, [addCmd, input]);

    return (
        <Wrapper className="section">
            <CmdList>
                {cmdList.map((line) => (
                    <CmdElem cmd={line} key={line.key} />
                ))}
            </CmdList>

            <Controls>
                <Input
                    type="text"
                    title="input new command"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleEnterKey}
                />
                <AddButton title="add new command" onClick={handleSubmit}>
                    <BsFilePlusFill size={36} />
                </AddButton>
            </Controls>
        </Wrapper>
    );
};

export default CmdCache;
