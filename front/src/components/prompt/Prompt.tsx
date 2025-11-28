import { ChangeEvent, useCallback, useState } from "react";
import usePromptStore from "../../stores/prompt/usePromptStore";
import "./Prompt.css";
import { BsArrowRightSquareFill } from "react-icons/bs";

const Prompt = () => {
    const list = usePromptStore((state) => state.list);
    const addLine = usePromptStore((state) => state.addLine);
    const [input, setInput] = useState("");

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    const handleExec = useCallback(() => {
        if (input === "") return;
        addLine({ type: "cmd", text: input });
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
