"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { finishes } from "@/lib/data";
import type { SceneKind } from "@/lib/pages";

const RoomScene = dynamic(() => import("./RoomScene"), { ssr: false });
const StallScene = dynamic(() => import("./StallScene"), { ssr: false });
const StageScene = dynamic(() => import("./StageScene"), { ssr: false });
const BrandScene = dynamic(() => import("./BrandScene"), { ssr: false });

// The build scenes shown finished (no scroll): the stage with its show lights on,
// the stall and room in daylight. Drag to turn them.
const BUILT: Record<Exclude<SceneKind, "brand">, number> = { stage: 0.97, stall: 0.8, room: 0.8 };

export default function DivisionScene({ kind, className }: { kind: SceneKind; className?: string }) {
  const progress = useRef(kind === "brand" ? 1 : BUILT[kind]);
  if (kind === "stage") return <StageScene progress={progress} className={className} />;
  if (kind === "stall") return <StallScene progress={progress} className={className} />;
  if (kind === "room") return <RoomScene progress={progress} finish={finishes[0]} className={className} />;
  return <BrandScene className={className} />;
}
