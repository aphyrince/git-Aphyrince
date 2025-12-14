import { create } from "zustand";

type Theme = "dark" | "white";

export const WHITE = "#ffffff";
export const BLACK = "#111111";

interface ThemeStatus {
    mode: Theme;
    keyColor: string;
    setTheme: (mode: Theme, keyColor: string) => void;
    toggleMode: () => void;
    setKeyColor: (color: string) => void;
}

const useThemeStore = create<ThemeStatus>((set) => ({
    mode: "white",
    keyColor: "#aaaaaa",
    setTheme: (mode: Theme, keyColor: string) => {
        set(() => ({ mode, keyColor }));
    },
    toggleMode: () => {
        set((s) => {
            const nextMode = s.mode === "white" ? "dark" : "white";
            return { mode: nextMode };
        });
    },
    setKeyColor: (keyColor: string) => {
        set(() => {
            return { keyColor };
        });
    },
}));

export default useThemeStore;
