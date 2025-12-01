import { useEffect, useRef, useState } from "react";
import useHistoryStore from "../../stores/history/useHistoryStore";
import "./History.css";
import useResizableLayout from "../../hooks/useResizableLayout";
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
        <div className="section history">
            <header>header</header>
            <div className="history-content" ref={containerRef}>
                <div
                    className="history-grid category"
                    style={{
                        gridTemplateColumns: cols.map((c) => `${c}%`).join(" "),
                    }}
                >
                    {["graph", "comment", "date", "author", "commit"].map(
                        (title, i) => (
                            <div
                                className="category-item"
                                key={i}
                                style={{ position: "relative" }}
                            >
                                <p>{title}</p>
                                {/* 드래그 핸들 (마지막 컬럼 제외) */}
                                {i < cols.length - 1 && (
                                    <div
                                        className="resize-handle"
                                        onMouseDown={() => onMouse.down(i)}
                                    />
                                )}
                            </div>
                        )
                    )}
                </div>
                <ul className="history-list">
                    {list.map((line) => (
                        <li
                            className="history-grid history-item"
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default History;
