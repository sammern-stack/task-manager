import { useEffect, useRef } from "react";

export const useScrollToBottom = (condition: number) => {
  const shouldScrollToBottomRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!shouldScrollToBottomRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

    shouldScrollToBottomRef.current = false;
  }, [condition]);

  const enableScroll = () => {
    shouldScrollToBottomRef.current = true;
  };

  return { containerRef, enableScroll };
};
