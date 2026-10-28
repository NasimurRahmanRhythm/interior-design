"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import { useOrbitCamera, type Vec3 } from "./build";

const C = { ink: "#151415", stone: "#3f383c", bone: "#f1eade", umber: "#7b5136", sand: "#c9a07f", sage: "#9faf9b", steel: "#8c8c8c" };

// Each piece drifts and turns on its own slow cycle.
function Float({ position, speed = 1, children }: { position: Vec3; speed?: number; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const seed = useRef(Math.random() * 10);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime * speed + seed.current;
    g.position.y = position[1] + Math.sin(t * 0.8) * 0.16;
    g.rotation.y = Math.sin(t * 0.3) * 0.45;
    g.rotation.z = Math.cos(t * 0.4) * 0.06;
  });

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
}

// A triangular block, used for roofs and pediments: base `w`, height `h`, depth `d`, centred.
function Prism({ w, h, d, color, position }: { w: number; h: number; d: number; color: string; position?: Vec3 }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2, 0);
    shape.lineTo(w / 2, 0);
    shape.lineTo(0, h);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false });
    g.translate(0, 0, -d / 2);
    return g;
  }, [w, h, d]);
  return (
    <mesh geometry={geometry} position={position} castShadow>
      <meshStandardMaterial color={color} roughness={0.75} />
    </mesh>
  );
}

// A house with a pencil and a ruler crossed in front of it: designing a home.
function HouseKit() {
  return (
    <group scale={0.9}>
      <mesh position={[0, -0.15, 0]} castShadow>
        <boxGeometry args={[1.1, 0.8, 0.8]} />
        <meshStandardMaterial color={C.bone} roughness={0.8} />
      </mesh>
      <Prism w={1.4} h={0.62} d={0.9} color={C.umber} position={[0, 0.25, 0]} />
      <mesh position={[0.3, 0.55, -0.15]} castShadow>
        <boxGeometry args={[0.16, 0.36, 0.16]} />
        <meshStandardMaterial color={C.stone} />
      </mesh>
      <mesh position={[-0.22, -0.3, 0.405]}>
        <planeGeometry args={[0.26, 0.5]} />
        <meshStandardMaterial color={C.umber} />
      </mesh>
      <mesh position={[0.25, -0.08, 0.405]}>
        <planeGeometry args={[0.28, 0.24]} />
        <meshStandardMaterial color={C.sage} />
      </mesh>
      {/* ruler */}
      <group position={[0, -0.25, 0.62]} rotation={[0, 0, -0.62]}>
        <mesh castShadow>
          <boxGeometry args={[1.7, 0.16, 0.03]} />
          <meshStandardMaterial color={C.sand} roughness={0.6} />
        </mesh>
        {Array.from({ length: 13 }, (_, i) => (
          <mesh key={i} position={[-0.72 + i * 0.12, 0.05, 0.017]}>
            <planeGeometry args={[0.012, i % 2 ? 0.05 : 0.08]} />
            <meshStandardMaterial color={C.ink} />
          </mesh>
        ))}
      </group>
      {/* pencil */}
      <group position={[0, -0.25, 0.7]} rotation={[0, 0, 0.62]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.35, 6]} />
          <meshStandardMaterial color={C.umber} roughness={0.6} />
        </mesh>
        <mesh position={[0.78, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.05, 0.2, 6]} />
          <meshStandardMaterial color={C.sand} />
        </mesh>
        <mesh position={[-0.72, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.052, 0.052, 0.1, 12]} />
          <meshStandardMaterial color={C.bone} />
        </mesh>
      </group>
    </group>
  );
}

// A classical front: steps, four columns and a pediment.
function ClassicalBuilding() {
  return (
    <group scale={0.85}>
      <mesh position={[0, -0.82, 0]} castShadow>
        <boxGeometry args={[1.8, 0.12, 0.8]} />
        <meshStandardMaterial color={C.stone} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.7, 0]} castShadow>
        <boxGeometry args={[1.6, 0.12, 0.7]} />
        <meshStandardMaterial color={C.bone} roughness={0.8} />
      </mesh>
      {[-0.6, -0.2, 0.2, 0.6].map((x) => (
        <group key={x} position={[x, -0.1, 0.1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.09, 0.1, 1.05, 16]} />
            <meshStandardMaterial color={C.bone} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[0.26, 0.06, 0.26]} />
            <meshStandardMaterial color={C.bone} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[1.65, 0.16, 0.72]} />
        <meshStandardMaterial color={C.sand} roughness={0.75} />
      </mesh>
      <Prism w={1.75} h={0.45} d={0.72} color={C.umber} position={[0, 0.6, 0]} />
    </group>
  );
}

// An arched window: the frame, the glass and its glazing bars.
function ArchWindow() {
  const frame = useMemo(() => {
    const outer = new THREE.Shape();
    outer.moveTo(-0.6, -0.9);
    outer.lineTo(0.6, -0.9);
    outer.lineTo(0.6, 0.2);
    outer.absarc(0, 0.2, 0.6, 0, Math.PI, false);
    outer.lineTo(-0.6, -0.9);
    const hole = new THREE.Path();
    hole.moveTo(-0.48, -0.78);
    hole.lineTo(0.48, -0.78);
    hole.lineTo(0.48, 0.2);
    hole.absarc(0, 0.2, 0.48, 0, Math.PI, false);
    hole.lineTo(-0.48, -0.78);
    outer.holes.push(hole);
    const g = new THREE.ExtrudeGeometry(outer, { depth: 0.12, bevelEnabled: false, curveSegments: 24 });
    g.translate(0, 0, -0.06);
    return g;
  }, []);
  const glass = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.48, -0.78);
    s.lineTo(0.48, -0.78);
    s.lineTo(0.48, 0.2);
    s.absarc(0, 0.2, 0.48, 0, Math.PI, false);
    s.lineTo(-0.48, -0.78);
    return new THREE.ShapeGeometry(s, 24);
  }, []);
  return (
    <group scale={0.95}>
      <mesh geometry={frame} castShadow>
        <meshStandardMaterial color={C.bone} roughness={0.7} />
      </mesh>
      <mesh geometry={glass} position={[0, 0, -0.02]}>
        <meshStandardMaterial color={C.sage} roughness={0.2} metalness={0.1} transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, -0.15, 0.01]}>
        <boxGeometry args={[0.04, 1.3, 0.04]} />
        <meshStandardMaterial color={C.bone} />
      </mesh>
      <mesh position={[0, -0.2, 0.01]}>
        <boxGeometry args={[0.96, 0.04, 0.04]} />
        <meshStandardMaterial color={C.bone} />
      </mesh>
      <mesh position={[0, -0.95, 0.06]} castShadow>
        <boxGeometry args={[1.4, 0.08, 0.3]} />
        <meshStandardMaterial color={C.umber} />
      </mesh>
    </group>
  );
}

// A pendant lamp on its cord, lit from inside.
function PendantLamp() {
  const shade = useMemo(() => new THREE.ConeGeometry(0.5, 0.55, 32, 1, true), []);
  return (
    <group>
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1.1, 6]} />
        <meshStandardMaterial color={C.ink} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.12, 16]} />
        <meshStandardMaterial color={C.ink} />
      </mesh>
      <mesh geometry={shade} position={[0, -0.12, 0]} castShadow>
        <meshStandardMaterial color={C.umber} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial color="#fff1dc" emissive="#ffcf8a" emissiveIntensity={1.6} />
      </mesh>
      <pointLight position={[0, -0.45, 0]} intensity={2.5} color="#ffcf8a" distance={2.4} />
    </group>
  );
}

// A lounge chair: cushioned seat and back, arms and slim legs.
function LoungeChair() {
  return (
    <group scale={0.85} rotation={[0, -0.5, 0]}>
      <RoundedBox args={[1.1, 0.22, 0.95]} radius={0.08} position={[0, -0.15, 0]} castShadow>
        <meshStandardMaterial color={C.sand} roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[1.1, 0.85, 0.2]} radius={0.08} position={[0, 0.25, -0.42]} rotation={[-0.18, 0, 0]} castShadow>
        <meshStandardMaterial color={C.sand} roughness={0.9} />
      </RoundedBox>
      {[-0.62, 0.62].map((x) => (
        <RoundedBox key={x} args={[0.14, 0.42, 0.9]} radius={0.05} position={[x, 0, -0.02]} castShadow>
          <meshStandardMaterial color={C.umber} roughness={0.7} />
        </RoundedBox>
      ))}
      {[
        [-0.55, -0.4],
        [0.55, -0.4],
        [-0.55, 0.38],
        [0.55, 0.38],
      ].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, -0.5, z]}>
          <cylinderGeometry args={[0.03, 0.02, 0.45, 8]} />
          <meshStandardMaterial color={C.ink} />
        </mesh>
      ))}
    </group>
  );
}

// A floor plan on a drawing sheet, with a set square resting on it.
function Blueprint() {
  const walls: [number, number, number, number][] = [
    // x, y, width, height of each wall line on the sheet
    [0, 0.5, 1.2, 0.03],
    [0, -0.5, 1.2, 0.03],
    [-0.6, 0, 0.03, 1.03],
    [0.6, 0, 0.03, 1.03],
    [-0.05, 0.2, 0.03, 0.6],
    [0.28, -0.1, 0.65, 0.03],
    [-0.35, -0.2, 0.5, 0.03],
  ];
  const square = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0.75, 0);
    s.lineTo(0, 0.75);
    s.closePath();
    const hole = new THREE.Path();
    hole.moveTo(0.12, 0.1);
    hole.lineTo(0.45, 0.1);
    hole.lineTo(0.12, 0.43);
    hole.closePath();
    s.holes.push(hole);
    return new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: false });
  }, []);
  return (
    <group rotation={[-0.35, 0.2, 0.08]}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 1.25, 0.02]} />
        <meshStandardMaterial color={C.bone} roughness={0.9} />
      </mesh>
      {walls.map(([x, y, w, h], i) => (
        <mesh key={i} position={[x, y, 0.012]}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial color={C.stone} />
        </mesh>
      ))}
      <mesh position={[0.35, 0.28, 0.012]}>
        <planeGeometry args={[0.28, 0.28]} />
        <meshStandardMaterial color={C.sage} />
      </mesh>
      <mesh geometry={square} position={[0.05, -0.55, 0.03]} rotation={[0, 0, 0.15]} castShadow>
        <meshStandardMaterial color={C.umber} roughness={0.4} transparent opacity={0.85} />
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

      <Float position={[-1.05, 1.6, -0.4]} speed={0.8}>
        <HouseKit />
      </Float>
      <Float position={[1.45, 1.3, -1]} speed={0.7}>
        <ClassicalBuilding />
      </Float>
      <Float position={[0, 0.3, 0.5]} speed={1.05}>
        <ArchWindow />
      </Float>
      <Float position={[-1.5, -1.15, 0.3]} speed={0.95}>
        <LoungeChair />
      </Float>
      <Float position={[1.5, -0.85, 0.5]} speed={0.85}>
        <PendantLamp />
      </Float>
      <Float position={[0, -1.65, -0.6]} speed={0.75}>
        <Blueprint />
      </Float>
    </>
  );
}

// The landing page hero: six architecture and interior pieces floating in the dark.
export default function HeroScene({ className }: { className?: string }) {
  return (
    <SceneCanvas className={className} shadows camera={{ position: [0, 1.2, 9], fov: 36 }} gl={{ antialias: true, alpha: true }}>
      <Pieces />
    </SceneCanvas>
  );
}
