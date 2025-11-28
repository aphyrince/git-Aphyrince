import { create } from "zustand";

interface Theme {
    fontColor: string;
    bgColor: string;
    keyColor: string;
}

interface ThemeStatus {
    currentTheme: Theme;
    setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeStatus>((set) => ({
    currentTheme: {
        fontColor: "#000000",
        bgColor: "#ffffff",
        keyColor: "#aaaaaa",
    },
    setTheme: (theme: Theme) => {
        set(() => ({ currentTheme: theme }));
    },
}));

export default useThemeStore;
