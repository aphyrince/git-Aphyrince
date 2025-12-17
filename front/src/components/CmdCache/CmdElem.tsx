import useCmdStore, { Cmd } from "../../stores/command/useCmdStore";
import { useCallback } from "react";
import usePromptStore from "../../stores/prompt/usePromptStore";
import useCmdCacheContextMenu from "../../hooks/useCmdCacheContextMenu";
import CmdContextMenu from "./CmdContextMenu";
import styled from "styled-components";

const CmdListElem = styled.li`
    position: relative;
    font-size: 20px;
    border-radius: 4px;
    border: 2px solid var(--key-color);
    padding-left: 4px;
    transition: 0.3s ease;
    margin-bottom: 5px;
    color: var(--font-color);

    & > p {
        flex: 1;
    }

    &:hover {
        background-color: var(--key-color);
        cursor: pointer;
    }
`;

const CmdElem = ({ cmd }: { cmd: Cmd }) => {
    const { deleteCmd } = useCmdStore();
    const { setCmdExec, setCmdPaste } = usePromptStore();
    const { isOpen, pos, target, handleContextMenu, handleClose } =
        useCmdCacheContextMenu();

    const handleExec = useCallback(() => {
        setCmdExec(cmd.text);
    }, [cmd, setCmdExec]);

    return (
        <CmdListElem
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
        </CmdListElem>
    );
};

export default CmdElem;
