"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import { DayLight, Mat, Piece, reveal, useOrbitCamera, type Progress, type Vec3 } from "./build";
import type { Finish } from "./RoomScene";

const C = {
  deck: "#151415",
  stone: "#3f383c",
  umber: "#7b5136",
  sand: "#c9a07f",
  truss: "#8c8c8c",
};

const DECK_Y = 0.8;
const TRUSS_H = 4.4;

// One square truss tower: four chords and a few braces.
function Tower({ x }: { x: number }) {
  const w = 0.32;
  return (
    <group position={[x, 0, -2.3]}>
      {[
        [-w / 2, -w / 2],
        [w / 2, -w / 2],
        [-w / 2, w / 2],
        [w / 2, w / 2],
      ].map(([dx, dz]) => (
        <mesh key={`${dx}${dz}`} position={[dx, TRUSS_H / 2, dz]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, TRUSS_H, 6]} />
          <meshStandardMaterial color={C.truss} roughness={0.35} metalness={0.8} />
        </mesh>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} position={[0, 0.25 + i * 0.5, 0]}>
          <boxGeometry args={[w, 0.03, w]} />
          <meshStandardMaterial color={C.truss} roughness={0.35} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// A moving-head light on the top beam with a soft visible beam that sweeps once the show starts.
function Beam({ at, progress, x, phase }: { at: number; progress: Progress; x: number; phase: number }) {
  const head = useRef<THREE.Group>(null);
  const cone = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t = reveal(progress, at);
    if (cone.current) cone.current.opacity = t * 0.22;
    if (head.current) {
      const s = clock.elapsedTime * 0.8 + phase;
      head.current.rotation.z = Math.sin(s) * 0.45;
      head.current.rotation.x = 0.35 + Math.cos(s * 0.7) * 0.15;
    }
  });

  return (
    <Piece at={at - 0.06} progress={progress} position={[x, TRUSS_H - 0.2, -2.3]}>
      <group ref={head}>
        <mesh>
          <boxGeometry args={[0.22, 0.26, 0.22]} />
          <meshStandardMaterial color="#1a1819" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, -2.6, 0]}>
          <coneGeometry args={[0.9, 5, 24, 1, true]} />
          <meshBasicMaterial
            ref={cone}
            color="#ffd29a"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Piece>
  );
}

function Stage({ progress, finish }: { progress: Progress; finish: Finish }) {
  const stage = useRef<THREE.Group>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);
  const wash = useRef<THREE.PointLight>(null);
  const tint = useRef(new THREE.Color());
  useOrbitCamera([11, 7, 12], [0, 1.6, 0]);

  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    if (stage.current) {
      const target = -0.3 + p * 0.6 + state.pointer.x * 0.06;
      stage.current.rotation.y = THREE.MathUtils.damp(stage.current.rotation.y, target, 4, delta);
    }
    // The LED wall drifts between umber and sand; it brightens for the show.
    const on = reveal(progress, 0.54);
    const show = reveal(progress, 0.82);
    if (led.current) {
      tint.current.set(C.umber).lerp(new THREE.Color(C.sand), (Math.sin(state.clock.elapsedTime * 0.9) + 1) / 2);
      led.current.emissive.copy(tint.current);
      led.current.emissiveIntensity = on * (0.6 + show * 1.2);
    }
    if (wash.current) wash.current.intensity = show * 14;
  });

  const chairs: Vec3[] = [];
  for (let row = 0; row < 4; row++) for (let col = 0; col < 7; col++) chairs.push([-2.7 + col * 0.9, 0, 1 + row * 0.75]);

  return (
    <>
      <DayLight progress={progress} shadowSize={7} />

      <group ref={stage} position={[0, -0.8, 0]} scale={0.88}>
        {/* Deck — ground, stage platform, steps, seating */}
        <Piece at={0} progress={progress}>
          <mesh position={[0, -0.08, 0]} receiveShadow>
            <boxGeometry args={[8.4, 0.16, 7.6]} />
            <Mat color={finish.wall} roughness={0.9} />
          </mesh>
        </Piece>
        <Piece at={0.06} progress={progress} position={[0, 0, -1.7]}>
          <mesh position={[0, DECK_Y / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.4, DECK_Y, 2.6]} />
            <Mat color={C.deck} roughness={0.6} />
          </mesh>
          <mesh position={[0, DECK_Y / 2, 1.31]}>
            <boxGeometry args={[6.4, 0.08, 0.02]} />
            <Mat color={finish.accent} />
          </mesh>
        </Piece>
        <Piece at={0.12} progress={progress} position={[0, 0, -0.2]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0, 0.13 + i * 0.13, -i * 0.22]} castShadow receiveShadow>
              <boxGeometry args={[1.4, 0.26 + i * 0.26, 0.24]} />
              <Mat color={C.stone} />
            </mesh>
          ))}
        </Piece>
        <Piece at={0.18} progress={progress}>
          {chairs.map((c, i) => (
            <group key={i} position={c}>
              <mesh position={[0, 0.24, 0]} castShadow>
                <boxGeometry args={[0.46, 0.06, 0.42]} />
                <Mat color={finish.accent} roughness={0.9} />
              </mesh>
              <mesh position={[0, 0.5, 0.19]} castShadow>
                <boxGeometry args={[0.46, 0.5, 0.05]} />
                <Mat color={finish.accent} roughness={0.9} />
              </mesh>
            </group>
          ))}
        </Piece>

        {/* Truss — two towers and the top beam */}
        <Piece at={0.28} progress={progress}>
          <Tower x={-3.5} />
        </Piece>
        <Piece at={0.33} progress={progress}>
          <Tower x={3.5} />
        </Piece>
        <Piece at={0.4} progress={progress} position={[0, TRUSS_H, -2.3]}>
          {[-0.14, 0.14].map((dy) =>
            [-0.14, 0.14].map((dz) => (
              <mesh key={`${dy}${dz}`} position={[0, dy, dz]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.025, 0.025, 7.3, 6]} />
                <meshStandardMaterial color={C.truss} roughness={0.35} metalness={0.8} />
              </mesh>
            ))
          )}
        </Piece>

        {/* Screen & sound — LED wall, speaker stacks, monitors */}
        <Piece at={0.52} progress={progress} position={[0, DECK_Y + 1.55, -2.75]}>
          <mesh castShadow>
            <boxGeometry args={[5.2, 2.7, 0.14]} />
            <meshStandardMaterial color="#1a1819" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.075]}>
            <planeGeometry args={[5, 2.5]} />
            <meshStandardMaterial ref={led} color="#221d1e" emissive={C.umber} emissiveIntensity={0} />
          </mesh>
        </Piece>
        {[-3.5, 3.5].map((x, i) => (
          <Piece key={x} at={0.58 + i * 0.04} progress={progress} position={[x, 0, -0.9]}>
            {[0, 1, 2].map((j) => (
              <RoundedBox key={j} args={[0.8, 0.62, 0.7]} radius={0.04} position={[0, 0.32 + j * 0.64, 0]} castShadow>
                <Mat color="#1a1819" roughness={0.7} />
              </RoundedBox>
            ))}
            {[0, 1, 2].map((j) => (
              <mesh key={`c${j}`} position={[0, 0.32 + j * 0.64, 0.36]}>
                <circleGeometry args={[0.2, 24]} />
                <Mat color={C.stone} roughness={0.5} />
              </mesh>
            ))}
          </Piece>
        ))}
        <Piece at={0.67} progress={progress} position={[0, DECK_Y, -0.65]}>
          {[-1.6, 1.6].map((x) => (
            <mesh key={x} position={[x, 0.16, 0]} rotation={[-0.5, 0, 0]} castShadow>
              <boxGeometry args={[0.6, 0.3, 0.4]} />
              <Mat color="#1a1819" />
            </mesh>
          ))}
          <mesh position={[0, 0.55, -0.2]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 1.1, 8]} />
            <meshStandardMaterial color="#1a1819" metalness={0.6} />
          </mesh>
        </Piece>

        {/* Show — moving heads and a warm wash */}
        {[-2.4, -0.8, 0.8, 2.4].map((x, i) => (
          <Beam key={x} at={0.82 + i * 0.02} progress={progress} x={x} phase={i * 1.3} />
        ))}
        <pointLight ref={wash} position={[0, 3.2, 1.4]} color="#ffb774" distance={10} decay={1.6} intensity={0} />
      </group>
    </>
  );
}

export default function StageScene({ progress, finish, className }: { progress: Progress; finish: Finish; className?: string }) {
  return (
    <SceneCanvas className={className} shadows camera={{ position: [11, 7, 12], fov: 36 }} gl={{ antialias: true, alpha: true }}>
      <Stage progress={progress} finish={finish} />
    </SceneCanvas>
  );
}
