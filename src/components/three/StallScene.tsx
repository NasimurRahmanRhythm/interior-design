"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import { DayLight, Mat, Piece, reveal, useOrbitCamera, type Progress, type Vec3 } from "./build";

const C = {
  floor: "#d9cfbf",
  carpet: "#7b5136",
  wall: "#f1eade",
  ink: "#151415",
  stone: "#3f383c",
  umber: "#7b5136",
  sand: "#c9a07f",
  sage: "#9faf9b",
  truss: "#8c8c8c",
};

// A spotlight hung from the truss; it switches on once the last step begins.
function Spot({ at, progress, position, aim }: { at: number; progress: Progress; position: Vec3; aim: Vec3 }) {
  const light = useRef<THREE.SpotLight>(null);
  const lens = useRef<THREE.MeshStandardMaterial>(null);
  const target = useRef(new THREE.Object3D());

  useFrame(() => {
    const t = reveal(progress, at + 0.05);
    if (light.current) light.current.intensity = t * 26;
    if (lens.current) lens.current.emissiveIntensity = t * 3;
  });

  return (
    <Piece at={at} progress={progress} position={position}>
      <mesh position={[0, -0.12, 0]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 0.24, 16]} />
        <meshStandardMaterial color={C.ink} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.22, 0.06]} rotation={[0.5, 0, 0]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial ref={lens} color="#fff1dc" emissive="#ffd29a" emissiveIntensity={0} />
      </mesh>
      <primitive object={target.current} position={aim} />
      <spotLight
        ref={light}
        position={[0, -0.2, 0]}
        target={target.current}
        angle={0.55}
        penumbra={0.7}
        distance={9}
        decay={1.6}
        color="#ffd29a"
        intensity={0}
      />
    </Piece>
  );
}

function Stall({ progress }: { progress: Progress }) {
  const stall = useRef<THREE.Group>(null);
  const screen = useRef<THREE.MeshStandardMaterial>(null);
  const { clock } = useThree();
  useOrbitCamera([10, 7.5, 10], [0, 1.2, 0]);

  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    if (stall.current) {
      const target = -0.3 + p * 0.6 + state.pointer.x * 0.06;
      stall.current.rotation.y = THREE.MathUtils.damp(stall.current.rotation.y, target, 4, delta);
    }
    // The screen breathes slowly once it is on.
    if (screen.current) {
      screen.current.emissiveIntensity = reveal(progress, 0.62) * (0.8 + Math.sin(clock.elapsedTime * 1.5) * 0.2);
    }
  });

  const post = (x: number, z: number) => (
    <mesh key={`${x}${z}`} position={[x, 1.9, z]} castShadow>
      <boxGeometry args={[0.12, 3.8, 0.12]} />
      <meshStandardMaterial color={C.truss} roughness={0.35} metalness={0.8} />
    </mesh>
  );

  return (
    <>
      <DayLight progress={progress} />

      <group ref={stall} position={[0, -0.6, 0]}>
        {/* Concept — platform and the two walls */}
        <Piece at={0} progress={progress}>
          <mesh position={[0, -0.08, 0]} receiveShadow>
            <boxGeometry args={[6, 0.16, 6]} />
            <Mat color={C.floor} roughness={0.8} />
          </mesh>
          <mesh position={[0.2, 0.005, 0.2]} receiveShadow>
            <boxGeometry args={[5.4, 0.02, 5.4]} />
            <Mat color={C.carpet} roughness={1} />
          </mesh>
        </Piece>
        <Piece at={0.05} progress={progress}>
          <mesh position={[0, 1.5, -2.95]} receiveShadow castShadow>
            <boxGeometry args={[6, 3, 0.1]} />
            <Mat color={C.wall} />
          </mesh>
        </Piece>
        <Piece at={0.1} progress={progress}>
          <mesh position={[-2.95, 1.5, -0.6]} receiveShadow castShadow>
            <boxGeometry args={[0.1, 3, 4.8]} />
            <Mat color={C.wall} />
          </mesh>
        </Piece>

        {/* Fabricate — counter, lightbox, plinths, meeting corner */}
        <Piece at={0.28} progress={progress} position={[-1.2, 0, 1.6]}>
          <RoundedBox args={[2, 1.05, 0.7]} radius={0.06} position={[0, 0.52, 0]} castShadow receiveShadow>
            <Mat color={C.ink} roughness={0.5} />
          </RoundedBox>
          <mesh position={[0, 1.07, 0]} castShadow>
            <boxGeometry args={[2.1, 0.06, 0.8]} />
            <Mat color={C.sand} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.55, 0.36]}>
            <boxGeometry args={[1.6, 0.5, 0.02]} />
            <Mat color={C.umber} roughness={0.6} />
          </mesh>
        </Piece>
        <Piece at={0.33} progress={progress} position={[-2.88, 1.7, -1.6]}>
          <mesh>
            <boxGeometry args={[0.06, 1.7, 1.8]} />
            <meshStandardMaterial color="#fff6e6" emissive="#ffe9c4" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0.04, 0, 0]}>
            <boxGeometry args={[0.02, 1.4, 1.5]} />
            <Mat color={C.sage} />
          </mesh>
        </Piece>
        <Piece at={0.38} progress={progress} position={[1.9, 0, -2.2]}>
          {[-0.7, 0, 0.7].map((x, i) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh position={[0, 0.45 + i * 0.12, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.5, 0.9 + i * 0.24, 0.5]} />
                <Mat color={C.wall} roughness={0.6} />
              </mesh>
              <mesh position={[0, 1.02 + i * 0.24, 0]} castShadow>
                {i === 1 ? <sphereGeometry args={[0.16, 24, 16]} /> : <boxGeometry args={[0.24, 0.3, 0.24]} />}
                <Mat color={[C.umber, C.ink, C.sage][i]} roughness={0.4} metalness={i === 1 ? 0.4 : 0} />
              </mesh>
            </group>
          ))}
        </Piece>
        <Piece at={0.43} progress={progress} position={[1.3, 0, 0.9]}>
          <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.05, 40]} />
            <Mat color={C.wall} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.36, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.18, 0.72, 16]} />
            <Mat color={C.ink} />
          </mesh>
          {[0, 2.1, 4.2].map((a) => (
            <mesh key={a} position={[Math.cos(a) * 0.85, 0.24, Math.sin(a) * 0.85]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.48, 24]} />
              <Mat color={C.umber} roughness={0.9} />
            </mesh>
          ))}
        </Piece>

        {/* Brand — graphic bands, tower, screen, plants */}
        <Piece at={0.52} progress={progress} position={[0, 2.25, -2.88]}>
          <mesh>
            <boxGeometry args={[5.2, 0.7, 0.04]} />
            <Mat color={C.ink} />
          </mesh>
          <mesh position={[-1.4, 0, 0.03]}>
            <boxGeometry args={[1.6, 0.14, 0.02]} />
            <Mat color={C.sand} />
          </mesh>
        </Piece>
        <Piece at={0.57} progress={progress} position={[2.55, 0, 2.4]}>
          <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 3.8, 0.6]} />
            <Mat color={C.umber} roughness={0.6} />
          </mesh>
          <mesh position={[0, 3.1, 0.31]}>
            <boxGeometry args={[0.44, 0.9, 0.02]} />
            <Mat color={C.wall} />
          </mesh>
        </Piece>
        <Piece at={0.62} progress={progress} position={[-0.6, 1.3, -2.88]}>
          <mesh castShadow>
            <boxGeometry args={[2, 1.15, 0.08]} />
            <meshStandardMaterial color={C.ink} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[1.88, 1.03]} />
            <meshStandardMaterial ref={screen} color="#2a2526" emissive="#c9a07f" emissiveIntensity={0} />
          </mesh>
        </Piece>
        <Piece at={0.67} progress={progress} position={[-2.4, 0, -2.4]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.2, 0.6, 24]} />
            <Mat color={C.wall} roughness={0.6} />
          </mesh>
          {[
            [0, 0.95, 0, 0.38],
            [0.18, 1.3, 0.08, 0.28],
            [-0.16, 1.36, -0.06, 0.26],
          ].map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]} castShadow>
              <icosahedronGeometry args={[r, 0]} />
              <meshStandardMaterial color="#5f6f5b" flatShading roughness={0.9} />
            </mesh>
          ))}
        </Piece>

        {/* Light up — truss frame and spotlights */}
        <Piece at={0.76} progress={progress}>
          {post(2.9, 2.9)}
          {post(-2.9, 2.9)}
          {[
            { p: [0, 3.8, 2.9] as Vec3, s: [5.92, 0.12, 0.12] as Vec3 },
            { p: [0, 3.8, -2.9] as Vec3, s: [5.92, 0.12, 0.12] as Vec3 },
            { p: [2.9, 3.8, 0] as Vec3, s: [0.12, 0.12, 5.92] as Vec3 },
            { p: [-2.9, 3.8, 0] as Vec3, s: [0.12, 0.12, 5.92] as Vec3 },
          ].map(({ p, s }, i) => (
            <mesh key={i} position={p} castShadow>
              <boxGeometry args={s} />
              <meshStandardMaterial color={C.truss} roughness={0.35} metalness={0.8} />
            </mesh>
          ))}
        </Piece>
        <Spot at={0.82} progress={progress} position={[-1.2, 3.74, 2.9]} aim={[0, -3.6, -1.2]} />
        <Spot at={0.85} progress={progress} position={[1.3, 3.74, 2.9]} aim={[0, -3.6, -2]} />
        <Spot at={0.88} progress={progress} position={[-2.9, 3.74, -1.6]} aim={[1.6, -3.6, 0]} />
      </group>
    </>
  );
}

export default function StallScene({ progress, className }: { progress: Progress; className?: string }) {
  return (
    <SceneCanvas className={className} shadows camera={{ position: [10, 7.5, 10], fov: 36 }} gl={{ antialias: true, alpha: true }}>
      <Stall progress={progress} />
    </SceneCanvas>
  );
}
