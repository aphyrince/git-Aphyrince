import { BsTextWrap, BsCopy, BsFillFileExcelFill } from "react-icons/bs";
import "./CmdElem.css";
import useCmdStore, { Cmd } from "../../../stores/command/useCmdStore";
import { useCallback } from "react";

const CmdElem = ({ cmd }: { cmd: Cmd }) => {
    const deleteCmd = useCmdStore((state) => state.deleteCmd);

    const handleDelete = useCallback(() => {
        deleteCmd(cmd.key);
    }, [deleteCmd, cmd.key]);

    return (
        <li className="cmd-elem" title="excute">
            <p>{cmd.text}</p>
            <button title="execute with parameter">
                <BsTextWrap />
            </button>
            <button title="copy">
                <BsCopy />
            </button>
            <button title="delete" onClick={handleDelete}>
                <BsFillFileExcelFill />
            </button>
        </li>
    );
};

export default CmdElem;
