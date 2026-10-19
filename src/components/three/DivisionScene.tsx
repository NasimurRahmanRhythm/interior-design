"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import type { Finish, SceneKind } from "@/lib/db/types";

const RoomScene = dynamic(() => import("./RoomScene"), { ssr: false });
const StallScene = dynamic(() => import("./StallScene"), { ssr: false });
const StageScene = dynamic(() => import("./StageScene"), { ssr: false });
const BrandScene = dynamic(() => import("./BrandScene"), { ssr: false });

// The build scenes shown finished (no scroll): the stage with its show lights on,
// the stall and room in daylight. Drag to turn them.
const BUILT: Record<Exclude<SceneKind, "brand">, number> = { stage: 0.97, stall: 0.8, room: 0.8 };

type Props = { kind: SceneKind; finish: Finish; className?: string };

export default function DivisionScene({ kind, finish, className }: Props) {
  const progress = useRef(kind === "brand" ? 1 : BUILT[kind]);
  if (kind === "stage") return <StageScene progress={progress} finish={finish} className={className} />;
  if (kind === "stall") return <StallScene progress={progress} finish={finish} className={className} />;
  if (kind === "room") return <RoomScene progress={progress} finish={finish} className={className} />;
  return <BrandScene className={className} />;
}
