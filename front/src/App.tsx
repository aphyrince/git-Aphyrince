import "./App.css";
import CmdCache from "./components/CmdCache/CmdCache";
import Prompt from "./components/Prompt/Prompt";
import History from "./components/History/History";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import useApplyTheme from "./hooks/useApplyTheme";
import useResizableLayout from "./hooks/useResizableLayout";
import useFetchActions from "./hooks/useFetchActions";

const App = () => {
    const { isDragging, containerRef, cols, onMouse } = useResizableLayout([
        45, 34, 20,
    ]);
    const { initialLoading } = useFetchActions();

    useApplyTheme();

    // 초기 로딩
    useEffect(() => {
        initialLoading();
    }, []);

    useEffect(() => {
        document.addEventListener("mousemove", onMouse.move);
        document.addEventListener("mouseup", onMouse.up);
        return () => {
            document.removeEventListener("mousemove", onMouse.move);
            document.removeEventListener("mouseup", onMouse.up);
        };
    }, []);

    return (
        <div className="app-container">
            <Header />
            <div
                className={`content ${isDragging ? "blurred" : ""}`}
                ref={containerRef}
                style={{
                    display: "grid",
                    gridTemplateColumns: `${cols[0]}% 5px ${cols[1]}% 5px ${cols[2]}%`,
                }}
            >
                <History />
                <div className="handle" onMouseDown={() => onMouse.down(0)} />
                <Prompt />
                <div className="handle" onMouseDown={() => onMouse.down(1)} />
                <CmdCache />
            </div>
        </div>
    );
};

export default App;
