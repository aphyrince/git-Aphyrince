import "./App.css";
import CmdCache from "./components/CmdCache/";
import Prompt from "./components/prompt/Prompt";
import History from "./components/history/History";
import Option from "./components/option/Option";
import { useEffect } from "react";
import useApplyTheme from "./hooks/useApplyTheme";
import useResizableLayout from "./hooks/useResizableLayout";
import useRepositoryState from "./stores/repository/useRepositoryStore";
import dataLoad from "./preloads/dataLoad";
import CmdCache2 from "./components/CmdCache";

const App = () => {
    const { isDragging, containerRef, cols, onMouse } = useResizableLayout([
        45, 34, 20,
    ]);
    const { setList } = useRepositoryState();

    useApplyTheme();

    // useEffect(() => {
    //     const load = async () => {
    //         const data = await dataLoad();
    //         setList(data.repos);
    //     };
    //     load();
    // }, []);

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
                <div className="handle" onMouseDown={() => onMouse.down(0)} />
                <Prompt />
                <div className="handle" onMouseDown={() => onMouse.down(1)} />
                {/* <CmdCache /> */}
                <CmdCache />
            </div>
        </div>
    );
};

export default App;
