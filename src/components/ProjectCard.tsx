import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = { project: Project; sizes?: string; className?: string; tall?: boolean };

export default function ProjectCard({ project, sizes = "(min-width:1024px) 30vw, 90vw", className = "", tall }: Props) {
  const cover = project.images[0];
  return (
    <Link href={`/projects/${project.slug}`} className={`group block ${className}`}>
      <div className={`fit bg-stone ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        <Image
          src={cover.src}
          alt={`${project.title}${project.client ? `, ${project.client}` : ""}`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-1000 ease-cubic group-hover:scale-105"
        />
      </div>
      <p className="t-label mt-4 opacity-55">
        {project.category}
        {project.year ? ` · ${project.year}` : ""}
      </p>
      <p className="t-h5 mt-1">{project.title}</p>
      {project.client && <p className="mt-1 text-sm opacity-60">{project.client}</p>}
    </Link>
  );
}
