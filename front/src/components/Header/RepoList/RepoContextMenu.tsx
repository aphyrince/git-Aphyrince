import { useEffect } from "react";
import styled from "styled-components";

interface Props {
    x: number;
    y: number;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

interface WrapperProps {
    x: number;
    y: number;
}

const Wrapper = styled.div<WrapperProps>`
    position: fixed;
    top: ${({ y }) => y}px;
    left: ${({ x }) => x}px;
    background: #222;
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 9999;
`;

const Button = styled.div`
    padding: 4px 0;
    cursor: pointer;
`;

const RepoContextMenu = ({ x, y, onClose, onEdit, onDelete }: Props) => {
    //다른 곳을 클릭하면 close
    useEffect(() => {
        const handler = () => onClose();
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, [onClose]);

    return (
        <Wrapper x={x} y={y}>
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
        </Wrapper>
    );
};

export default RepoContextMenu;
