"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, OrbitControls, useGLTF, useProgress } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Loading progress sits over the canvas, outside the 3D scene.
function Progress() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <span className="t-label pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-bone/70">
      Loading model {Math.round(progress)}%
    </span>
  );
}

/** Shows an uploaded .glb. Drag to turn it; zoom stays off so the wheel keeps scrolling the page. */
export default function ModelViewer({ url, className = "" }: { url: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Canvas camera={{ position: [4, 3, 6], fov: 35 }} dpr={[1, 1.75]} shadows>
        <ambientLight intensity={0.8} color="#f1eade" />
        <directionalLight position={[5, 8, 6]} intensity={2.4} color="#fff1dc" castShadow />
        <directionalLight position={[-6, 3, -4]} intensity={0.8} color="#c9a07f" />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <Model url={url} />
            </Center>
          </Bounds>
          <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={12} blur={2.4} far={4} />
        </Suspense>
        <OrbitControls makeDefault enablePan={false} enableZoom={false} />
      </Canvas>
      <Progress />
    </div>
  );
}
