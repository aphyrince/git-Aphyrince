import { ChangeEvent, useCallback, useEffect, useState } from "react";
import usePromptStore from "../../stores/prompt/usePromptStore";
import "./Prompt.css";
import { BsArrowRightSquareFill } from "react-icons/bs";
import commandExe from "../../preloads/commandExe";
import useRepositoryStore from "../../stores/repository/useRepositoryStore";
import useCmdStore from "../../stores/command/useCmdStore";

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
        // const cmdResult = await commandExe(command);
        // addLine(cmdResult.output, "result");
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
        <div className="section prompt">
            <div className="list">
                <ul>
                    {list.map((line) => (
                        <li className={line.type} key={line.key}>
                            <p>{line.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="input flex-center">
                <p className="path">{path}</p>
                <input
                    className="cmd"
                    type="text"
                    title="command"
                    onChange={handleChange}
                    onKeyDown={handleEnterKey}
                    value={input}
                />
                <button
                    className="enter flex-center"
                    title="execute"
                    onClick={handleExec}
                >
                    <BsArrowRightSquareFill size={36} />
                </button>
            </div>
        </div>
    );
};

export default Prompt;
