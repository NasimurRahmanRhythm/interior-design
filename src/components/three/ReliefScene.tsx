"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Slowly drifting contour lines, like a topographic relief map.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec3 uColor;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 p = vec2(vUv.x * uAspect, vUv.y) * 2.2;
    float h = noise(p + uTime * 0.03) + 0.5 * noise(p * 2.1 - uTime * 0.02);
    float bands = h * 9.0;
    float d = abs(fract(bands) - 0.5);
    float line = 1.0 - smoothstep(0.0, fwidth(bands) * 1.4, d);
    float vignette = smoothstep(1.1, 0.25, distance(vUv, vec2(0.5)));
    gl_FragColor = vec4(uColor, line * 0.32 * vignette);
  }
`;

function Relief() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uAspect: { value: 1 }, uColor: { value: new THREE.Color("#9faf9b") } }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uAspect.value = state.size.width / state.size.height;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={material} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent depthTest={false} />
    </mesh>
  );
}

export default function ReliefScene({ className }: { className?: string }) {
  return (
    <SceneCanvas className={className} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
      <Relief />
    </SceneCanvas>
  );
}
