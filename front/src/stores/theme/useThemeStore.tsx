import { create } from "zustand";

interface Theme {
    fontColor: string;
    bgColor: string;
    keyColor: string;
}

interface ThemeStatus {
    currentTheme: Theme;
    setTheme: (theme: Theme) => void;
    setKeyColor: (color: string) => void;
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
    setKeyColor: (keyColor: string) => {
        set((s) => {
            const newTheme = { ...s.currentTheme, keyColor };
            return { currentTheme: newTheme };
        });
    },
}));

export default useThemeStore;
