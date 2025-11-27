import { useEffect, useRef, useState } from "react";
import useHistoryStore from "../../stores/history/useHistoryStore";
import "./History.css";
const History = () => {
    const list = useHistoryStore((state) => state.list);

    const [cols, setCols] = useState([10, 43, 15, 15, 15]);
    const dragging = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (dragging.current === null || !containerRef.current) return;

            const index = dragging.current;
            const containerWidth = containerRef.current.offsetWidth;
            const delta = (e.movementX / containerWidth) * 100;

            setCols((prev) => {
                const next = [...prev];
                next[index] = Math.max(5, prev[index] + delta);
                next[index + 1] = Math.max(5, prev[index + 1] - delta);
                return next;
            });
        };

        const stopDrag = () => {
            dragging.current = null;
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", stopDrag);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", stopDrag);
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
                                        onMouseDown={() =>
                                            (dragging.current = i)
                                        }
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
