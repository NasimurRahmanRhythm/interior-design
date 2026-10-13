"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import { useOrbitCamera, type Vec3 } from "./build";

const C = { ink: "#151415", stone: "#3f383c", bone: "#f1eade", umber: "#7b5136", sand: "#c9a07f", sage: "#9faf9b" };

// Each printed or promotional piece drifts and turns on its own slow cycle.
function Float({ position, speed = 1, children }: { position: Vec3; speed?: number; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const seed = useRef(Math.random() * 10);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime * speed + seed.current;
    g.position.y = position[1] + Math.sin(t * 0.8) * 0.18;
    g.rotation.y = Math.sin(t * 0.3) * 0.5;
    g.rotation.z = Math.cos(t * 0.4) * 0.08;
  });

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
}

function Calendar() {
  return (
    <group rotation={[-0.15, 0, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.5, 1.9, 0.04]} />
        <meshStandardMaterial color={C.bone} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.35, 0.025]}>
        <planeGeometry args={[1.3, 0.95]} />
        <meshStandardMaterial color={C.umber} roughness={0.8} />
      </mesh>
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 7 }, (_, c) => (
          <mesh key={`${r}${c}`} position={[-0.54 + c * 0.18, -0.36 - r * 0.15, 0.025]}>
            <planeGeometry args={[0.1, 0.06]} />
            <meshStandardMaterial color={r === 1 && c === 3 ? C.umber : C.stone} />
          </mesh>
        ))
      )}
      {[-0.45, -0.15, 0.15, 0.45].map((x) => (
        <mesh key={x} position={[x, 0.95, 0.02]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.06, 0.012, 8, 16]} />
          <meshStandardMaterial color="#8c8c8c" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Card() {
  return (
    <group>
      <mesh position={[-0.42, 0, 0.12]} rotation={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.9, 1.25, 0.015]} />
        <meshStandardMaterial color={C.sand} roughness={0.6} />
      </mesh>
      <mesh position={[0.42, 0, 0.12]} rotation={[0, -0.5, 0]} castShadow>
        <boxGeometry args={[0.9, 1.25, 0.015]} />
        <meshStandardMaterial color={C.bone} roughness={0.6} />
      </mesh>
      <mesh position={[0.46, 0.15, 0.16]} rotation={[0, -0.5, 0]}>
        <circleGeometry args={[0.2, 32, 0.6, 4.6]} />
        <meshStandardMaterial color={C.umber} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Mug() {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.32, 0.29, 0.75, 40]} />
        <meshStandardMaterial color={C.ink} roughness={0.35} />
      </mesh>
      <mesh position={[0.36, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.16, 0.04, 12, 24, Math.PI]} />
        <meshStandardMaterial color={C.ink} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.05, 0.322]}>
        <planeGeometry args={[0.3, 0.22]} />
        <meshStandardMaterial color={C.sand} />
      </mesh>
    </group>
  );
}

function Cap() {
  return (
    <group rotation={[0.2, 0, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={C.umber} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.01, 0.42]} rotation={[-0.1, 0, 0]} scale={[1, 0.08, 1]}>
        <cylinderGeometry args={[0.32, 0.32, 0.3, 32, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={C.umber} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.05, 12, 8]} />
        <meshStandardMaterial color={C.ink} />
      </mesh>
    </group>
  );
}

function LedPanel() {
  const screen = useRef<THREE.MeshStandardMaterial>(null);
  const tint = useRef(new THREE.Color());
  useFrame(({ clock }) => {
    if (!screen.current) return;
    tint.current.set(C.umber).lerp(new THREE.Color(C.sand), (Math.sin(clock.elapsedTime) + 1) / 2);
    screen.current.emissive.copy(tint.current);
  });
  return (
    <group>
      <RoundedBox args={[1.9, 1.1, 0.1]} radius={0.03} castShadow>
        <meshStandardMaterial color="#1a1819" roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[1.78, 0.98]} />
        <meshStandardMaterial ref={screen} color="#221d1e" emissive={C.umber} emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, -0.9, -0.05]}>
        <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
        <meshStandardMaterial color="#8c8c8c" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

function GiftBox() {
  return (
    <group>
      <RoundedBox args={[0.8, 0.6, 0.8]} radius={0.03} castShadow>
        <meshStandardMaterial color={C.bone} roughness={0.7} />
      </RoundedBox>
      <mesh>
        <boxGeometry args={[0.82, 0.62, 0.12]} />
        <meshStandardMaterial color={C.umber} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.12, 0.62, 0.82]} />
        <meshStandardMaterial color={C.umber} />
      </mesh>
    </group>
  );
}

function Pieces() {
  useOrbitCamera([0, 1.2, 9], [0, 0.2, 0]);
  return (
    <>
      <ambientLight intensity={0.8} color={C.bone} />
      <directionalLight position={[4, 6, 6]} intensity={2.4} color="#fff1dc" castShadow />
      <pointLight position={[-4, 1, 3]} intensity={10} color="#ffb774" distance={12} />

      <Float position={[-1.9, 1.2, -0.6]} speed={0.8}>
        <Calendar />
      </Float>
      <Float position={[1.9, 1.3, -1]} speed={0.7}>
        <LedPanel />
      </Float>
      <Float position={[0.1, 0.2, 0.6]} speed={1.1}>
        <Card />
      </Float>
      <Float position={[-2.1, -1.1, 0.4]} speed={1}>
        <Mug />
      </Float>
      <Float position={[2.1, -1, 0.6]} speed={0.9}>
        <Cap />
      </Float>
      <Float position={[0, -1.6, -0.8]} speed={0.75}>
        <GiftBox />
      </Float>
    </>
  );
}

export default function BrandScene({ className }: { className?: string }) {
  return (
    <SceneCanvas className={className} shadows camera={{ position: [0, 1.2, 9], fov: 36 }} gl={{ antialias: true, alpha: true }}>
      <Pieces />
    </SceneCanvas>
  );
}
