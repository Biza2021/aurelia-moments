import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-aurelia-ivory px-5 py-12 text-aurelia-ink">
      <section className="max-w-md rounded-[1.5rem] bg-white/80 p-8 text-center shadow-soft">
        <p className="eyebrow">Aurelia Moments</p>
        <h1 className="mt-4 font-display text-4xl">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-aurelia-charcoal/70">
          The page you are looking for is not available.
        </p>
        <Link href="/en" className="gold-button mt-7">
          Return Home
        </Link>
      </section>
    </main>
  );
}
