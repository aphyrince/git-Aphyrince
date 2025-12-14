import { useEffect } from "react";
import useThemeStore, { BLACK, WHITE } from "../stores/theme/useThemeStore";

const useApplyTheme = () => {
    const { mode, keyColor } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;

        root.style.setProperty("--key-color", keyColor);
    }, [keyColor]);

    useEffect(() => {
        const root = document.documentElement;

        root.style.setProperty(
            "--font-color",
            mode === "white" ? BLACK : WHITE
        );
        root.style.setProperty("--bg-color", mode === "white" ? WHITE : BLACK);
    }, [mode]);
};

export default useApplyTheme;
