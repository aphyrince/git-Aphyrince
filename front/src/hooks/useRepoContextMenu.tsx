import { useState } from "react";
import { Repository } from "../global";

const useRepoContextMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pos, setPos] = useState<{ x: Number; y: number } | null>(null);
    const [target, setTarget] = useState<Repository | null>(null);

    const handleContextMenu = (e: MouseEvent, target: Repository) => {
        setTarget(target);
        setPos({ x: e.clientX, y: e.clientY });
        setIsOpen(true);
        e.preventDefault();
    };
    const handleClose = () => {
        setIsOpen(false);
        setTarget(null);
        setPos(null);
    };
    return { isOpen, pos, target, handleContextMenu, handleClose };
};

export default useRepoContextMenu;
