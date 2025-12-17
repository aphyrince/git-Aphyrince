import { useEffect } from "react";
import useHistoryStore from "../../stores/history/useHistoryStore";
import useResizableLayout from "../../hooks/useResizableLayout";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 92vh;
    font-size: small;
    color: var(--font-color);
`;

const HistoryHeader = styled.div`
    width: 100%;
    height: 4vh;
    display: flex;
    align-items: center;
    padding: 0 5px;
    background: #00000000;
`;

const HistoryContent = styled.div`
    width: 100%;
    height: 88vh;
    overflow-y: scroll;
`;

const Category = styled.div`
    width: 100%;
    height: 4vh;
    display: grid;
    grid-template-columns: 75px 2fr 100px 75px 75px;
    background: var(--key-color);
`;

const CategoryItem = styled.div`
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 5px;
    display: grid;
    & > p {
        padding-left: 5px;
        overflow: hidden;
    }
`;

const HistoryList = styled.ul`
    width: 100%;
    height: 84vh;
`;

const HistoryItem = styled.li`
    height: 20px;
    overflow: hidden;
    display: grid;
    & > p {
        padding-left: 5px;
        overflow: hidden;
    }
`;

const ResizeHandle = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: var(--font-color);
    cursor: col-resize;
    z-index: 10;
    filter: opacity(50%);

    &:hover {
        filter: opacity(30%);
    }
`;

const History = () => {
    const list = useHistoryStore((state) => state.list);

    const { containerRef, cols, onMouse } = useResizableLayout([
        10, 43, 15, 15, 15,
    ]);

    useEffect(() => {
        document.addEventListener("mousemove", onMouse.move);
        document.addEventListener("mouseup", onMouse.up);
        return () => {
            document.removeEventListener("mousemove", onMouse.move);
            document.removeEventListener("mouseup", onMouse.up);
        };
    }, []);

    return (
        <Wrapper>
            <HistoryHeader>header</HistoryHeader>
            <HistoryContent ref={containerRef}>
                <Category
                    className="history-grid "
                    style={{
                        gridTemplateColumns: cols.map((c) => `${c}%`).join(" "),
                    }}
                >
                    {["graph", "comment", "date", "author", "commit"].map(
                        (title, i) => (
                            <CategoryItem key={i}>
                                <p>{title}</p>
                                {/* 드래그 핸들 (마지막 컬럼 제외) */}
                                {i < cols.length - 1 && (
                                    <ResizeHandle
                                        onMouseDown={() => onMouse.down(i)}
                                    />
                                )}
                            </CategoryItem>
                        )
                    )}
                </Category>
                <HistoryList>
                    {list.map((line) => (
                        <HistoryItem
                            className="history-grid"
                            key={line.key}
                            style={{
                                gridTemplateColumns: cols
                                    .map((c) => `${c}%`)
                                    .join(" "),
                            }}
                        >
                            <p>{line.graph}</p>
                            <p>{line.comment}</p>
                            <p>{line.date}</p>
                            <p>{line.author}</p>
                            <p>{line.commit}</p>
                        </HistoryItem>
                    ))}
                </HistoryList>
            </HistoryContent>
        </Wrapper>
    );
};

export default History;
