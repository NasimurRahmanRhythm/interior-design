"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
import SceneCanvas from "./SceneCanvas";
import { gsap } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

type Props = { progress: RefObject<number>; className?: string };

function Stone({ progress }: { progress: RefObject<number> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const intro = useRef({ v: 0 });

  // A faceted boulder: an icosphere pushed around by two octaves of noise.
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.45, 5);
    const noise = new ImprovedNoise();
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = v.clone().normalize();
      const big = noise.noise(n.x * 1.1 + 4, n.y * 1.1, n.z * 1.1);
      const small = noise.noise(n.x * 3.2, n.y * 3.2 + 9, n.z * 3.2);
      const r = 1 + big * 0.55 + Math.round(small * 4) / 4 * 0.12;
      v.copy(n).multiplyScalar(1.45 * r);
      v.y *= 1.18;
      v.x *= 0.86;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move);
    const off = onReady(() => gsap.to(intro.current, { v: 1, duration: 2.4, ease: "power3.out" }));
    return () => {
      window.removeEventListener("pointermove", move);
      off();
    };
  }, []);

  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    const m = mesh.current;
    if (m) {
      m.rotation.y += delta * 0.12;
      m.rotation.x = THREE.MathUtils.damp(m.rotation.x, pointer.current.y * -0.18 + p * 1.1, 3, delta);
      m.rotation.z = THREE.MathUtils.damp(m.rotation.z, pointer.current.x * -0.12, 3, delta);
      m.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06 - (1 - intro.current.v) * 0.8;
      // Shrink on portrait screens so the stone never hides the whole title.
      const fit = Math.min(1, (state.size.width / state.size.height) * 1.15);
      m.scale.setScalar((0.32 + intro.current.v * 0.26) * (1 + p * 1.1) * fit);
    }
    // The warm light trails the cursor, like a torch held up to the stone.
    if (light.current) {
      light.current.position.x = THREE.MathUtils.damp(light.current.position.x, pointer.current.x * 4, 4, delta);
      light.current.position.y = THREE.MathUtils.damp(light.current.position.y, pointer.current.y * 3, 4, delta);
      light.current.intensity = 34 * intro.current.v;
    }
  });

  return (
    <>
      <mesh ref={mesh} geometry={geometry}>
        <meshStandardMaterial color="#2b2728" roughness={0.3} metalness={0.45} flatShading envMapIntensity={1.5} />
      </mesh>
      <pointLight ref={light} position={[0, 0, 3.2]} color="#ffcf9e" distance={9} decay={2} />
    </>
  );
}

export default function StoneScene({ progress, className }: Props) {
  return (
    <SceneCanvas className={className} camera={{ position: [0, 0, 7], fov: 32 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[-4, 5, 2]} intensity={1.1} color="#9faf9b" />
      <directionalLight position={[5, -2, -3]} intensity={1.4} color="#7b5136" />
      <Stone progress={progress} />
      <Sparkles count={50} scale={[9, 6, 4]} size={1.6} speed={0.25} opacity={0.35} color="#f1eade" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} color="#f1eade" position={[0, 5, -2]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#7b5136" position={[-5, 0, 2]} scale={[3, 6, 1]} />
        <Lightformer form="ring" intensity={2} color="#9faf9b" position={[5, 1, 3]} scale={2.5} />
      </Environment>
    </SceneCanvas>
  );
}
