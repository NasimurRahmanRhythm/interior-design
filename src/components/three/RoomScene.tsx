"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";

export type Finish = { name: string; floor: string; wall: string; accent: string; fabric: string };

type Progress = RefObject<number>;
type Vec3 = [number, number, number];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** 0→1 as scroll progress passes this piece's slot. */
const reveal = (progress: Progress, at: number) => easeOut(clamp01(((progress.current ?? 0) - at) / 0.12));

// A piece of the room that drops into place once scroll progress reaches `at`.
function Piece({
  at,
  progress,
  position = [0, 0, 0],
  rotation,
  children,
}: {
  at: number;
  progress: Progress;
  position?: Vec3;
  rotation?: Vec3;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const t = reveal(progress, at);
    g.visible = t > 0.001;
    g.position.y = position[1] + (1 - t) * 2.4;
    g.scale.setScalar(0.6 + t * 0.4);
  });

  return (
    <group ref={group} position={position} rotation={rotation} visible={false}>
      {children}
    </group>
  );
}

// Standard material whose colour eases toward the chosen finish.
function Mat({ color, roughness = 0.85, metalness = 0 }: { color: string; roughness?: number; metalness?: number }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const target = useRef(new THREE.Color(color));

  useEffect(() => {
    target.current.set(color);
  }, [color]);

  useFrame((_, delta) => {
    mat.current?.color.lerp(target.current, 1 - Math.exp(-delta * 5));
  });

  return <meshStandardMaterial ref={mat} color={color} roughness={roughness} metalness={metalness} />;
}

function Lamp({ at, progress, position, color }: { at: number; progress: Progress; position: Vec3; color: string }) {
  const light = useRef<THREE.PointLight>(null);
  const shade = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const t = reveal(progress, at + 0.06);
    if (light.current) light.current.intensity = t * 9;
    if (shade.current) shade.current.emissiveIntensity = t * 1.6;
  });

  return (
    <Piece at={at} progress={progress} position={position}>
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 32]} />
        <Mat color={color} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.75, 12]} />
        <Mat color={color} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.18, 0.32, 0.42, 32, 1, true]} />
        <meshStandardMaterial ref={shade} color="#f1eade" emissive="#ffb774" emissiveIntensity={0} side={THREE.DoubleSide} />
      </mesh>
      <pointLight ref={light} position={[0, 1.8, 0]} color="#ffb774" distance={6} decay={2} intensity={0} />
    </Piece>
  );
}

function Room({ progress, finish }: { progress: Progress; finish: Finish }) {
  const room = useRef<THREE.Group>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const pendant = useRef<THREE.PointLight>(null);
  const bulb = useRef<THREE.MeshStandardMaterial>(null);
  const { camera, size } = useThree();

  // Pull the camera back on narrow screens so the room stays in frame.
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = size.width / size.height < 1 ? 50 : 36;
    cam.updateProjectionMatrix();
  }, [camera, size]);

  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    camera.lookAt(0, 0.9, 0);
    if (room.current) {
      const target = -0.3 + p * 0.6 + state.pointer.x * 0.06;
      room.current.rotation.y = THREE.MathUtils.damp(room.current.rotation.y, target, 4, delta);
    }
    // Last stretch of the scroll: daylight fades and the lamps carry the room.
    const night = clamp01((p - 0.82) / 0.16);
    if (sun.current) sun.current.intensity = 2.6 * (1 - night * 0.9);
    if (ambient.current) ambient.current.intensity = 0.7 * (1 - night * 0.75);
    const glow = reveal(progress, 0.86);
    if (pendant.current) pendant.current.intensity = glow * 12;
    if (bulb.current) bulb.current.emissiveIntensity = glow * 2;
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.7} color="#f1eade" />
      <directionalLight
        ref={sun}
        position={[5, 8, 6]}
        intensity={2.6}
        color="#fff1dc"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0004}
      />

      <group ref={room} position={[0, -0.6, 0]}>
        {/* Shell */}
        <Piece at={0} progress={progress}>
          <mesh position={[0, -0.1, 0]} receiveShadow>
            <boxGeometry args={[6, 0.2, 6]} />
            <Mat color={finish.floor} roughness={0.7} />
          </mesh>
        </Piece>
        <Piece at={0.05} progress={progress}>
          <mesh position={[-3.05, 1.6, 0]} receiveShadow>
            <boxGeometry args={[0.1, 3.4, 6]} />
            <Mat color={finish.wall} />
          </mesh>
        </Piece>
        <Piece at={0.1} progress={progress}>
          <mesh position={[0, 1.6, -3.05]} receiveShadow>
            <boxGeometry args={[6.2, 3.4, 0.1]} />
            <Mat color={finish.wall} />
          </mesh>
        </Piece>
        <Piece at={0.16} progress={progress} position={[-2.98, 1.75, 1.1]}>
          <mesh>
            <boxGeometry args={[0.06, 1.9, 1.6]} />
            <meshStandardMaterial color="#fff6e6" emissive="#ffe9c4" emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[0.03, 0, 0]}>
            <boxGeometry args={[0.05, 1.9, 0.05]} />
            <Mat color={finish.accent} />
          </mesh>
          <mesh position={[0.03, 0, 0]}>
            <boxGeometry args={[0.05, 0.05, 1.6]} />
            <Mat color={finish.accent} />
          </mesh>
        </Piece>

        {/* Ground */}
        <Piece at={0.27} progress={progress} position={[0.3, 0.02, 0.3]}>
          <mesh receiveShadow>
            <cylinderGeometry args={[1.9, 1.9, 0.04, 64]} />
            <Mat color={finish.fabric} roughness={1} />
          </mesh>
        </Piece>
        <Piece at={0.33} progress={progress} position={[0.3, 0, 0.3]}>
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.7, 0.7, 0.07, 48]} />
            <Mat color={finish.accent} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.26, 0.38, 24]} />
            <Mat color={finish.accent} roughness={0.5} />
          </mesh>
          <mesh position={[0.2, 0.52, -0.1]} castShadow>
            <sphereGeometry args={[0.11, 24, 16]} />
            <Mat color="#f1eade" roughness={0.6} />
          </mesh>
        </Piece>

        {/* Furnish */}
        <Piece at={0.44} progress={progress} position={[0.3, 0, -2.2]}>
          <RoundedBox args={[2.8, 0.42, 1.05]} radius={0.12} position={[0, 0.36, 0]} castShadow receiveShadow>
            <Mat color={finish.fabric} roughness={1} />
          </RoundedBox>
          <RoundedBox args={[2.8, 0.75, 0.3]} radius={0.12} position={[0, 0.72, -0.4]} castShadow>
            <Mat color={finish.fabric} roughness={1} />
          </RoundedBox>
          <RoundedBox args={[0.3, 0.6, 1.05]} radius={0.1} position={[-1.4, 0.5, 0]} castShadow>
            <Mat color={finish.fabric} roughness={1} />
          </RoundedBox>
          <RoundedBox args={[0.3, 0.6, 1.05]} radius={0.1} position={[1.4, 0.5, 0]} castShadow>
            <Mat color={finish.fabric} roughness={1} />
          </RoundedBox>
          <RoundedBox args={[0.55, 0.45, 0.18]} radius={0.08} position={[-0.8, 0.78, -0.15]} rotation={[-0.25, 0.1, 0]} castShadow>
            <Mat color={finish.accent} roughness={1} />
          </RoundedBox>
        </Piece>
        <Piece at={0.5} progress={progress} position={[-1.9, 0, 0.9]} rotation={[0, Math.PI / 2.6, 0]}>
          <RoundedBox args={[0.9, 0.3, 0.9]} radius={0.1} position={[0, 0.4, 0]} castShadow>
            <Mat color={finish.accent} roughness={0.9} />
          </RoundedBox>
          <RoundedBox args={[0.9, 0.7, 0.2]} radius={0.09} position={[0, 0.75, -0.38]} rotation={[-0.15, 0, 0]} castShadow>
            <Mat color={finish.accent} roughness={0.9} />
          </RoundedBox>
          {[-0.36, 0.36].flatMap((x) =>
            [-0.36, 0.36].map((z) => (
              <mesh key={`${x}${z}`} position={[x, 0.13, z]} castShadow>
                <cylinderGeometry args={[0.025, 0.02, 0.26, 8]} />
                <meshStandardMaterial color="#1a1819" />
              </mesh>
            ))
          )}
        </Piece>
        <Piece at={0.57} progress={progress} position={[-2.85, 1.7, -1.3]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.05, 1.9]} />
            <Mat color={finish.accent} roughness={0.6} />
          </mesh>
          {[-0.7, -0.55, -0.42].map((z, i) => (
            <mesh key={z} position={[0, 0.2 - i * 0.02, z]} castShadow>
              <boxGeometry args={[0.2, 0.34 - i * 0.04, 0.09]} />
              <Mat color={["#f1eade", "#9faf9b", "#3f383c"][i]} />
            </mesh>
          ))}
          <mesh position={[0, 0.2, 0.4]} castShadow>
            <capsuleGeometry args={[0.09, 0.16, 6, 16]} />
            <Mat color="#f1eade" roughness={0.5} />
          </mesh>
        </Piece>
        <Piece at={0.62} progress={progress} position={[1.5, 2.1, -2.97]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 1.45, 0.06]} />
            <meshStandardMaterial color="#1a1819" />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[0.95, 1.3]} />
            <Mat color="#f1eade" />
          </mesh>
          <mesh position={[0.05, -0.1, 0.04]}>
            <circleGeometry args={[0.3, 48]} />
            <Mat color={finish.accent} />
          </mesh>
        </Piece>
        <Piece at={0.67} progress={progress} position={[2.4, 0, -2.3]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.2, 0.6, 24]} />
            <Mat color="#f1eade" roughness={0.6} />
          </mesh>
          {[
            [0, 1.0, 0, 0.42],
            [0.22, 1.35, 0.1, 0.32],
            [-0.2, 1.4, -0.08, 0.3],
            [0.02, 1.72, 0, 0.26],
          ].map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]} castShadow>
              <icosahedronGeometry args={[r, 0]} />
              <meshStandardMaterial color="#5f6f5b" flatShading roughness={0.9} />
            </mesh>
          ))}
        </Piece>

        {/* Light */}
        <Lamp at={0.76} progress={progress} position={[-2.35, 0, -2.35]} color={finish.accent} />
        <Piece at={0.84} progress={progress} position={[0.3, 0, 0.3]}>
          <mesh position={[0, 2.85, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 1.1, 6]} />
            <meshStandardMaterial color="#1a1819" />
          </mesh>
          <mesh position={[0, 2.25, 0]} castShadow>
            <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <Mat color={finish.accent} roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0, 2.2, 0]}>
            <sphereGeometry args={[0.09, 16, 12]} />
            <meshStandardMaterial ref={bulb} color="#fff1dc" emissive="#ffb774" emissiveIntensity={0} />
          </mesh>
          <pointLight ref={pendant} position={[0, 2.1, 0]} color="#ffb774" distance={7} decay={2} intensity={0} />
        </Piece>
      </group>
    </>
  );
}

export default function RoomScene({
  progress,
  finish,
  className,
}: {
  progress: Progress;
  finish: Finish;
  className?: string;
}) {
  return (
    <SceneCanvas className={className} shadows camera={{ position: [10, 7.5, 10], fov: 36 }} gl={{ antialias: true, alpha: true }}>
      <Room progress={progress} finish={finish} />
    </SceneCanvas>
  );
}
