"use client";

import { Suspense, useEffect, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import { gsap } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

type Panel = { image: string; alt: string };
type Props = { panels: Panel[]; progress: RefObject<number>; className?: string };

// Where each photo hangs, in units of the panel size: x, y, depth, width, height, turn.
const LAYOUT: [number, number, number, number, number, number][] = [
  [0.75, 0.85, -1.2, 1.8, 1.2, -0.3],
  [-0.55, 0.15, -0.4, 1.5, 1.05, 0.28],
  [0.85, -0.65, 0.5, 1.6, 1.1, -0.22],
  [-0.1, -1.05, 1.1, 0.95, 1.2, 0.32],
  [-0.9, 1.25, -1.9, 1.15, 0.75, 0.38],
];

type ImageMesh = THREE.Mesh & { material: THREE.Material & { opacity: number } };

function Panels({ panels, progress }: Omit<Props, "className">) {
  const group = useRef<THREE.Group>(null);
  const items = useRef<(ImageMesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const intro = useRef({ v: 0 });
  const { viewport, size } = useThree();

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    const tween = gsap.to(intro.current, { v: 1, duration: 2.2, ease: "power3.out", paused: true });
    const off = onReady(() => tween.play());
    return () => {
      window.removeEventListener("pointermove", move);
      tween.kill();
      off();
    };
  }, []);

  const wide = size.width / size.height > 1;
  const unit = wide ? Math.min(viewport.width * 0.12, viewport.height * 0.24) : viewport.width * 0.2;
  const cx = wide ? viewport.width * 0.27 : 0;
  const cy = wide ? viewport.height * 0.02 : viewport.height * 0.2;

  useFrame((_, delta) => {
    const p = progress.current ?? 0;
    const g = group.current;
    if (g) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.22, 3, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.14, 3, delta);
    }
    const t = intro.current.v;
    items.current.forEach((mesh, i) => {
      if (!mesh) return;
      const [x, y, z] = LAYOUT[i];
      const side = x >= 0 ? 1 : -1;
      // Scrolling pushes the panels apart and toward the camera, then they fade.
      mesh.position.set(
        cx + x * unit + side * p * unit * 1.6,
        cy + y * unit - (1 - t) * unit * (2 + i * 0.4) + p * y * unit * 0.6,
        z + p * (2.5 + i * 0.6)
      );
      mesh.material.opacity = Math.min(t * 1.4, 1) * (1 - Math.max(0, p - 0.55) / 0.45);
    });
  });

  return (
    <group ref={group}>
      {panels.slice(0, LAYOUT.length).map((panel, i) => {
        const [, , , w, h, turn] = LAYOUT[i];
        return (
          <Image
            key={panel.image}
            ref={(m) => {
              items.current[i] = m as unknown as ImageMesh;
            }}
            url={panel.image}
            scale={[w * unit, h * unit]}
            rotation={[0, turn, 0]}
            color="#d9d2c6"
            transparent
            opacity={0}
          />
        );
      })}
    </group>
  );
}

export default function HeroPanels({ panels, progress, className }: Props) {
  return (
    <SceneCanvas className={className} camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <Panels panels={panels} progress={progress} />
      </Suspense>
    </SceneCanvas>
  );
}
