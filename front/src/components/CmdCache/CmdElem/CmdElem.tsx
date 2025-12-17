import { BsTextWrap, BsFillFileExcelFill } from "react-icons/bs";
import "./CmdElem.css";
import useCmdStore, { Cmd } from "../../../stores/command/useCmdStore";
import { MouseEvent, useCallback } from "react";
import usePromptStore from "../../../stores/prompt/usePromptStore";
import useCmdCacheContextMenu from "../../../hooks/useCmdCacheContextMenu";
import CmdContextMenu from "./CmdContextMenu/CmdContextMenu";

const CmdElem = ({ cmd }: { cmd: Cmd }) => {
    const { deleteCmd } = useCmdStore();
    const { setCmdExec, setCmdPaste } = usePromptStore();
    const { isOpen, pos, target, handleContextMenu, handleClose } =
        useCmdCacheContextMenu();

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
            onContextMenu={(e) => handleContextMenu(e, cmd.text)}
        >
            <p>{cmd.text}</p>
            {isOpen && pos && target && (
                <CmdContextMenu
                    x={pos.x}
                    y={pos.y}
                    onClose={handleClose}
                    onDelete={() => {
                        deleteCmd(cmd.key);
                    }}
                    onPaste={() => {
                        setCmdPaste(cmd.text);
                    }}
                />
            )}
        </li>
    );
};

export default CmdElem;
