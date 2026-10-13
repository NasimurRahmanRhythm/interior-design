"use client";

import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("../three/ModelViewer"), { ssr: false });

export default function ProjectModel({ url, title }: { url: string; title: string }) {
  return (
    <section data-theme="dark" className="bg-ink pb-10 pt-20 text-bone lg:pt-28">
      <div className="grid-w items-end gap-y-4">
        <h2 className="t-h1 col-span-6 lg:col-span-8">
          In <span className="italic">3D</span>
        </h2>
        <p className="t-label col-span-6 opacity-60 lg:col-span-4 lg:justify-self-end">Drag to turn the model</p>
      </div>
      <ModelViewer url={url} className="mt-8 h-[70svh] w-full cursor-grab touch-pan-y active:cursor-grabbing" />
      <p className="sr-only">3D model of {title}</p>
    </section>
  );
}
