import { MouseEvent, useState } from "react";

const useCmdCacheContextMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const [target, setTarget] = useState<string | null>(null);

    const handleContextMenu = (
        e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
        target: string
    ) => {
        setTarget(target);
        setPos({ x: e.clientX, y: e.clientY });
        setIsOpen(true);
        e.preventDefault();
    };
    const handleClose = () => {
        setIsOpen(false);
        setPos(null);
    };
    return { isOpen, pos, target, handleContextMenu, handleClose };
};

export default useCmdCacheContextMenu;
