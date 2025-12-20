import { ChangeEvent, useCallback, useEffect, useState } from "react";
import usePromptStore from "../../stores/prompt/usePromptStore";
import { BsArrowRightSquareFill } from "react-icons/bs";
import commandExe from "../../preloads/commandExe";
import useRepositoryStore from "../../stores/repository/useRepositoryStore";
import useCmdStore from "../../stores/command/useCmdStore";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 92vh;
    color: var(--font-color);
`;

const PromptList = styled.ul`
    width: 100%;
    background-color: var(--bg-color);
    font-size: large;
    height: 84vh;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: start;
    align-items: start;
    list-style: none;
    padding: 0 5px;

    & > .cmd {
        display: flex;
        justify-content: end;

        & > p {
            padding: 4px;
            border-radius: 4px;
        }
    }
`;

const PromptItem = styled.li`
    width: 100%;
    border-bottom: 2px solid var(--key-color);
    padding: 3px 0;
`;

const InputContainer = styled.div`
    border-top: 2px solid var(--key-color);
    width: 100%;
    height: 8vh;
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const InputText = styled.input`
    flex: 1;
    padding: 8px;
    font-size: 24px;
    border-radius: 8px;
    border: none;
    background-color: var(--key-color);
    color: var(--font-color);

    &:focus {
        border: 3px solid var(--font-color);
    }
`;

const Button = styled.button`
    background: none;
    border: none;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--font-color);

    &:hover {
        filter: opacity(70%);
    }
`;

const Prompt = () => {
    const { list, add: addLine, cmdExec, cmdPaste } = usePromptStore();
    const [input, setInput] = useState("");
    const { currentRepo } = useRepositoryStore();
    const [path, setPath] = useState("error");
    const { addCmd } = useCmdStore();

    useEffect(() => {
        setPath(currentRepo?.path || "error");
    }, [currentRepo, path]);

    const commandTransmit = useCallback(async (command: string) => {
        console.log("command transmitted.");
        const cmdResult = await commandExe(command);
        addLine(cmdResult.output, "result");
    }, []);

    useEffect(() => {
        if (cmdExec === "") return;
        addLine(cmdExec, "cmd");
        commandTransmit(cmdExec);
    }, [cmdExec]);

    useEffect(() => {
        if (cmdPaste === "") return;
        setInput(cmdPaste);
    }, [cmdPaste]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    const handleExec = useCallback(() => {
        if (input === "") return;
        addLine(input, "cmd");
        commandTransmit(input);
        addCmd(input);
        setInput("");
    }, [input, addLine]);

    const handleEnterKey = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleExec();
        },
        [input]
    );

    return (
        <Wrapper className="prompt">
            <PromptList>
                {list.map((line) => (
                    <PromptItem className={line.type} key={line.key}>
                        <p>{line.text}</p>
                    </PromptItem>
                ))}
            </PromptList>
            <InputContainer>
                <p className="path">{path}</p>
                <InputText
                    type="text"
                    title="command"
                    onChange={handleChange}
                    onKeyDown={handleEnterKey}
                    value={input}
                />
                <Button title="execute" onClick={handleExec}>
                    <BsArrowRightSquareFill size={36} />
                </Button>
            </InputContainer>
        </Wrapper>
    );
};

export default Prompt;
