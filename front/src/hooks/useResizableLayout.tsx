import { useCallback, useRef, useState } from "react";

const useResizableLayout = (initialRatio: number[]) => {
    const [cols, setCols] = useState(initialRatio);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragging = useRef<number | null>(null);

    const onMouseDown = useCallback((index: number) => {
        dragging.current = index;
        setIsDragging(true);
    }, []);
    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (dragging.current === null || !containerRef.current) return;

            const index = dragging.current;
            const rect = containerRef.current.getBoundingClientRect();
            const totalWidth = rect.width;

            const delta = (e.movementX / totalWidth) * 100;

            setCols((prev) => {
                const next = [...prev];
                next[index] = Math.max(5, prev[index] + delta);
                next[index + 1] = Math.max(5, prev[index + 1] - delta);

                if (next[index] <= 5 || next[index + 1] <= 5) return prev;
                return next;
            });
        },
        [cols]
    );
    const onMouseUp = useCallback(() => {
        dragging.current = null;
        setIsDragging(false);
    }, []);

    const onMouse = { down: onMouseDown, move: onMouseMove, up: onMouseUp };

    return { isDragging, containerRef, cols, onMouse };
};

export default useResizableLayout;
