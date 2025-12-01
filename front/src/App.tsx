import "./App.css";
import CmdList from "./components/cmd-list/CmdList";
import Prompt from "./components/prompt/Prompt";
import History from "./components/history/History";
import Option from "./components/option/Option";
import { useEffect } from "react";
import useApplyTheme from "./hooks/useApplyTheme";
import useThemeStore from "./stores/theme/useThemeStore";
import useInitializeThemeFromCSS from "./hooks/useInitializeThemeFromCSS";
import useResizableLayout from "./hooks/useResizableLayout";

const App = () => {
    const { isDragging, containerRef, cols, onMouse } = useResizableLayout([
        45, 30, 20,
    ]);

    const setTheme = useThemeStore((s) => s.setTheme);

    useInitializeThemeFromCSS();
    useApplyTheme();

    useEffect(() => {
        const rootStyle = document.documentElement.style;

        const fontColor = rootStyle.getPropertyValue("--font-color");
        const bgColor = rootStyle.getPropertyValue("--bg-color");
        const keyColor = rootStyle.getPropertyPriority("--key-color");

        setTheme({ fontColor, bgColor, keyColor });
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
                <CmdList />
            </div>
        </div>
    );
};

export default App;
