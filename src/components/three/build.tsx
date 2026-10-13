"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Shared parts for the scroll-built scenes (room, stall, stage).

export type Progress = RefObject<number>;
export type Vec3 = [number, number, number];

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** 0→1 as scroll progress passes this piece's slot. */
export const reveal = (progress: Progress, at: number) => easeOut(clamp01(((progress.current ?? 0) - at) / 0.12));

// A piece of the scene that drops into place once scroll progress reaches `at`.
export function Piece({
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

// Standard material whose colour eases toward `color` when it changes.
export function Mat({
  color,
  roughness = 0.85,
  metalness = 0,
  emissive,
  emissiveIntensity,
}: {
  color: string;
  roughness?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const target = useRef(new THREE.Color(color));

  useEffect(() => {
    target.current.set(color);
  }, [color]);

  useFrame((_, delta) => {
    mat.current?.color.lerp(target.current, 1 - Math.exp(-delta * 5));
  });

  return (
    <meshStandardMaterial
      ref={mat}
      color={color}
      roughness={roughness}
      metalness={metalness}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
    />
  );
}

/**
 * Drag on the canvas to turn the camera around `target`, starting from `home`.
 * Vertical touch drags still scroll the page. Narrow screens get a wider lens.
 */
export function useOrbitCamera(home: Vec3, target: Vec3) {
  const { camera, size, gl } = useThree();
  const orbit = useRef({ yaw: 0, pitch: 0, toYaw: 0, toPitch: 0 });
  const center = useRef(new THREE.Vector3(...target));
  const base = useRef(new THREE.Spherical().setFromVector3(new THREE.Vector3(...home).sub(center.current)));

  useEffect(() => {
    const el = gl.domElement;
    let drag: { id: number; x: number; y: number } | null = null;
    el.style.cursor = "grab";
    el.style.touchAction = "pan-y";

    const down = (e: PointerEvent) => {
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const o = orbit.current;
      o.toYaw -= (e.clientX - drag.x) * 0.008;
      o.toPitch = THREE.MathUtils.clamp(o.toPitch + (e.clientY - drag.y) * 0.005, -0.5, 0.7);
      drag.x = e.clientX;
      drag.y = e.clientY;
    };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      drag = null;
      el.style.cursor = "grab";
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = size.width / size.height < 1 ? 50 : 36;
    cam.updateProjectionMatrix();
  }, [camera, size]);

  useFrame((_, delta) => {
    const o = orbit.current;
    o.yaw = THREE.MathUtils.damp(o.yaw, o.toYaw, 6, delta);
    o.pitch = THREE.MathUtils.damp(o.pitch, o.toPitch, 6, delta);
    const b = base.current;
    const phi = THREE.MathUtils.clamp(b.phi - o.pitch, 0.2, 1.5);
    camera.position.setFromSphericalCoords(b.radius, phi, b.theta + o.yaw).add(center.current);
    camera.lookAt(center.current);
  });
}

/** Sun + ambient light that dim over the last stretch of the scroll. */
export function DayLight({ progress, shadowSize = 6 }: { progress: Progress; shadowSize?: number }) {
  const sun = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const night = clamp01(((progress.current ?? 0) - 0.82) / 0.16);
    if (sun.current) sun.current.intensity = 2.6 * (1 - night * 0.9);
    if (ambient.current) ambient.current.intensity = 0.7 * (1 - night * 0.75);
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
        shadow-camera-left={-shadowSize}
        shadow-camera-right={shadowSize}
        shadow-camera-top={shadowSize}
        shadow-camera-bottom={-shadowSize}
        shadow-bias={-0.0004}
      />
    </>
  );
}
