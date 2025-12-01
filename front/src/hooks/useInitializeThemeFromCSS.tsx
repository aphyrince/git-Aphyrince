import { useEffect } from "react";
import useThemeStore from "../stores/theme/useThemeStore";

const useInitializeThemeFromCSS = () => {
    const { currentTheme, setTheme } = useThemeStore();

    useEffect(() => {
        if (
            !currentTheme.fontColor ||
            !currentTheme.bgColor ||
            !currentTheme.keyColor
        ) {
            const rootStyle = getComputedStyle(document.documentElement);
            const fontColor =
                rootStyle.getPropertyValue("--font-color").trim() || "#000000";
            const bgColor =
                rootStyle.getPropertyValue("--bg-color").trim() || "#ffffff";
            const keyColor =
                rootStyle.getPropertyValue("--key-color").trim() || "#aaaaaa";

            setTheme({ fontColor, bgColor, keyColor });
        }
    }, [currentTheme, setTheme]);
};

export default useInitializeThemeFromCSS;
