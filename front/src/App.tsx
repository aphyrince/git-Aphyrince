import "./App.css";
import CmdList from "./components/cmd-list/CmdList";
import Prompt from "./components/prompt/Prompt";
import History from "./components/history/History";
import Option from "./components/option/Option";
import { useEffect, useRef, useState } from "react";

const App = () => {
    const [cols, setCols] = useState([45, 34, 20]);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragging = useRef<number | null>(null);

    const onMouseDown = (index: number) => {
        dragging.current = index;
        setIsDragging(true);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (dragging.current === null || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const totalWidth = rect.width;
        const x = e.clientX - rect.left;

        let [c1, c2, c3] = cols;

        const toPercent = (px: number) => (px / totalWidth) * 100;

        if (dragging.current === 0) {
            const leftPercent = toPercent(x);
            const middlePercent = c1 + c2 - leftPercent;

            if (leftPercent > 5 && middlePercent > 5) {
                setCols([leftPercent, middlePercent, c3]);
            }
        }

        if (dragging.current === 1) {
            const middlePercent = toPercent(x) - c1;
            const rightPercent = c2 + c3 - middlePercent;

            if (middlePercent > 5 && rightPercent > 5) {
                setCols([c1, middlePercent, rightPercent]);
            }
        }
    };

    const onMouseUp = () => {
        dragging.current = null;
        setIsDragging(false);
    };

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    });

    return (
        <div className="app-container">
            <Option />
            <div
                className={`content ${isDragging ? "blurred" : ""}`}
                ref={containerRef}
                style={{
                    display: "grid",
                    gridTemplateColumns: `${cols[0]}% 5px ${cols[1]}% 5px ${cols[2]}%`,
                }}
            >
                <History />
                <div className="handle" onMouseDown={() => onMouseDown(0)} />
                <Prompt />
                <div className="handle" onMouseDown={() => onMouseDown(1)} />
                <CmdList />
            </div>
        </div>
    );
};

export default App;
