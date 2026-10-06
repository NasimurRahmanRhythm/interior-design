import Image from "next/image";
import Parallax from "../Parallax";
import RevealText from "../RevealText";
import SplitTitle from "../SplitTitle";

export default function Connection() {
  return (
    <>
      <section data-theme="dark" className="relative flex min-h-svh items-center justify-center overflow-hidden bg-ink text-bone">
        <Parallax amount={10} className="absolute -inset-y-[12%] inset-x-0">
          <Image src="/images/misc/connection.jpg" alt="A grey living room with a round table" fill sizes="100vw" className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-ink/55" />

        <div className="relative flex flex-col items-center px-[var(--margin)] py-40">
          <Parallax amount={-60}>
            <span className="t-h1 mb-2 block self-start italic">The</span>
          </Parallax>
          <SplitTitle text="Connection" className="t-lrg text-[min(var(--large),17vw)]!" />
          <span className="mt-8 flex flex-col self-end text-sm leading-tight">
            <span>Object Shown</span>
            <span className="ml-[1.5em]">at Point</span>
            <span>of Origin.</span>
          </span>
        </div>
      </section>

      <section data-theme="light" className="bg-bone py-28 text-ink lg:py-44">
        <div className="grid-w gap-y-14">
          <RevealText className="t-h3 col-span-6 lg:col-span-6 lg:col-start-2">
            Rooms and objects are not separate. Each object originates within a specific room, shaped by its
            conditions, materials, and use.
          </RevealText>
          <Parallax amount={18} className="col-span-3 col-start-4 lg:col-span-2 lg:col-start-10 lg:row-span-2">
            <div className="fit aspect-[3/4]">
              <Image src="/images/objects/3.jpg" alt="Three stoneware vessels" fill sizes="(min-width:1024px) 17vw, 50vw" className="object-cover" />
            </div>
          </Parallax>
          <RevealText className="t-h3 col-span-6 lg:col-span-6 lg:col-start-4">
            Once removed, the object continues independently, carrying its point of origin without representing it
            directly.
          </RevealText>
        </div>
      </section>
    </>
  );
}
