import { BsTextWrap, BsCopy, BsFillFileExcelFill } from "react-icons/bs";
import "./CmdElem.css";
import useCmdStore, { Cmd } from "../../../stores/command/useCmdStore";
import { MouseEvent, useCallback } from "react";
import usePromptStore from "../../../stores/prompt/usePromptStore";

const CmdElem = ({ cmd }: { cmd: Cmd }) => {
    const { deleteCmd } = useCmdStore();
    const { setCmdExec, setCmdPaste } = usePromptStore();

    const handleDelete = useCallback(
        (e: MouseEvent) => {
            deleteCmd(cmd.key);
            e.stopPropagation();
        },
        [deleteCmd, cmd.key]
    );

    const handleExec = useCallback(() => {
        setCmdExec(cmd.text);
    }, [cmd, setCmdExec]);

    const handlePaste = useCallback(
        (e: MouseEvent) => {
            setCmdPaste(cmd.text);
            e.stopPropagation();
        },
        [cmd, setCmdPaste]
    );

    return (
        <li
            className="cmd-elem flex-center"
            title="excute"
            onClick={handleExec}
        >
            <p>{cmd.text}</p>
            <button
                title="execute with parameter"
                className="flex-center"
                onClick={handlePaste}
            >
                <BsTextWrap size={24} />
            </button>
            <button
                title="delete"
                onClick={handleDelete}
                className="flex-center"
            >
                <BsFillFileExcelFill size={24} />
            </button>
        </li>
    );
};

export default CmdElem;
