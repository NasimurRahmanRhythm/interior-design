import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section data-theme="dark" className="flex min-h-svh flex-col items-start justify-center bg-ink px-[var(--margin)] text-bone">
      <p className="t-label opacity-60">404</p>
      <h1 className="t-lrg mt-4">
        Page <span className="font-serif italic">not found</span>
      </h1>
      <div className="mt-10">
        <Button href="/" big>
          Back to home
        </Button>
      </div>
    </section>
  );
}
