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
        <li className="cmd-elem flex-center" title="excute">
            <p>{cmd.text}</p>
            <button title="execute with parameter" className="flex-center">
                <BsTextWrap size={24} />
            </button>
            <button title="copy" className="flex-center">
                <BsCopy size={24} />
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
