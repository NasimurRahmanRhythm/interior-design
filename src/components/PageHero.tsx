import RevealText from "./RevealText";
import SplitTitle from "./SplitTitle";

type Props = { title: string; accent?: string; label: string; text: string };

export default function PageHero({ title, accent, label, text }: Props) {
  return (
    <section data-theme="dark" className="bg-ink pb-16 pt-40 text-bone lg:pb-24 lg:pt-56">
      <div className="grid-w items-end gap-y-10">
        <h1 className="col-span-6 flex flex-col lg:col-span-9">
          <SplitTitle text={title} className="t-lrg" when="ready" />
          {accent && <SplitTitle text={accent} className="t-lrg self-end text-umber lg:mr-[6vw]" when="ready" delay={0.12} />}
        </h1>
        <div className="col-span-6 lg:col-span-3 lg:col-start-10">
          <p className="t-label mb-4 opacity-50">{label}</p>
          <RevealText className="text-sm opacity-80">{text}</RevealText>
        </div>
      </div>
    </section>
  );
}
