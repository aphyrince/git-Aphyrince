import { useCallback, useState } from "react";
import useCmdStore from "../../stores/command/useCmdStore";
import CmdElem from "./cmd-elem/CmdElem";
import "./CmdList.css";
import { BsFilePlusFill } from "react-icons/bs";

const CmdList = () => {
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
        (e: React.KeyboardEvent) => {
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
        <div className="section cmd-list">
            <ul>
                {cmdList.map((line) => (
                    <CmdElem cmd={line} key={line.key} />
                ))}
            </ul>
            <div className="cmd-controls">
                <input
                    className="text"
                    type="text"
                    title="input new command"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleEnterKey}
                />
                <button
                    className="add"
                    title="add new command"
                    onClick={handleSubmit}
                >
                    <BsFilePlusFill size={40} />
                </button>
            </div>
        </div>
    );
};

export default CmdList;
