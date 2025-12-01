import { useEffect } from "react";
import useThemeStore from "../stores/theme/useThemeStore";

const useApplyTheme = () => {
    const currentTheme = useThemeStore((state) => state.currentTheme);

    useEffect(() => {
        const root = document.documentElement;

        root.style.setProperty("--font-color", currentTheme.fontColor);
        root.style.setProperty("--bg-color", currentTheme.bgColor);
        root.style.setProperty("--key-color", currentTheme.keyColor);
    }, [currentTheme]);
};

export default useApplyTheme;
