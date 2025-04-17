import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect(); // Desconectamos una vez visible (puedes quitar si quieres repetir)
      }
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, options]);

  return { ref, isIntersecting };
}
