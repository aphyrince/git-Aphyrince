import { useEffect } from "react";

interface Props {
    x: number;
    y: number;
    onClose: () => void;
    onPaste: () => void;
    onDelete: () => void;
}

const CmdContextMenu = ({ x, y, onClose, onPaste, onDelete }: Props) => {
    useEffect(() => {
        const handler = () => onClose();
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, [onClose]);
    return (
        <div
            style={{
                position: "fixed",
                top: y,
                left: x,
                background: "#222",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: 6,
                fontSize: 14,
                zIndex: 9999,
            }}
        >
            <div
                style={{ padding: "4px 0", cursor: "pointer" }}
                onClick={onPaste}
            >
                Paste
            </div>
            <div
                style={{ padding: "4px 0", cursor: "pointer" }}
                onClick={onDelete}
            >
                Delete
            </div>
        </div>
    );
};

export default CmdContextMenu;
