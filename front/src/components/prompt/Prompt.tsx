import { ChangeEvent, useCallback, useEffect, useState } from "react";
import usePromptStore from "../../stores/prompt/usePromptStore";
import "./Prompt.css";
import { BsArrowRightSquareFill } from "react-icons/bs";
import commandExe from "../../preloads/commandExe";
import useRepositoryStore from "../../stores/repository/useRepositoryStore";

const Prompt = () => {
    const list = usePromptStore((state) => state.list);
    const addLine = usePromptStore((state) => state.add);
    const [input, setInput] = useState("");
    const { currentRepo } = useRepositoryStore();
    const [path, setPath] = useState("error");

    useEffect(() => {
        setPath(currentRepo?.path || "error");
    }, [currentRepo, path]);

    const commandExecute = useCallback(async (command: string) => {
        const cmdResult = await commandExe(command);
        addLine(cmdResult.output, "result");
    }, []);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    const handleExec = useCallback(() => {
        if (input === "") return;
        addLine(input, "cmd");
        commandExecute(input);
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
