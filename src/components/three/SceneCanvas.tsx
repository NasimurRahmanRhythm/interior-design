"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";

type Props = CanvasProps & { className?: string };

// Canvas that only renders frames while it is on screen.
export default function SceneCanvas({ className, children, ...props }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "10%" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <Canvas frameloop={active ? "always" : "never"} dpr={[1, 1.75]} {...props}>
        {children}
      </Canvas>
    </div>
  );
}
