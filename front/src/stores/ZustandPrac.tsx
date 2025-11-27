import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const initialState = { bears: 0, food: "honey" };

type BearState = typeof initialState & {
    increase: (by: number) => void;
    reset: () => void;
};

const useBearStore = create<BearState>()((set) => ({
    ...initialState,
    increase: (by) => set((s) => ({ bears: s.bears + by })),
    reset: () => set(initialState),
}));

function ResetZoo() {
    const { bears, food } = useBearStore(
        useShallow((state) => ({ bears: state.bears, food: state.food }))
    );

    return <div></div>;
}
