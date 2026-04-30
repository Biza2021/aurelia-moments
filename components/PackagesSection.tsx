"use client";

import { ArrowRight } from "lucide-react";
import type { Messages } from "@/lib/i18n";

export function PackagesSection({ messages }: { messages: Messages }) {
  const requestQuote = (packageName: string) => {
    window.dispatchEvent(
      new CustomEvent("aurelia:select-package", {
        detail: { packageName }
      })
    );
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="packages"
      className="scroll-mt-20 bg-aurelia-cream/60 py-16 md:py-24"
    >
      <div className="aurelia-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{messages.packages.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">
            {messages.packages.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {messages.packages.items.map((item) => (
            <article
              key={item.name}
              className="soft-card flex min-h-64 flex-col p-6 transition hover:-translate-y-1 hover:shadow-aurelia"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-aurelia-gold">
                {messages.packages.quoteOnly}
              </p>
              <h3 className="mt-4 font-display text-2xl">{item.name}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-aurelia-charcoal/70">
                {item.description}
              </p>
              <button
                type="button"
                className="outline-button mt-8 w-full border-aurelia-gold/45 bg-white/55"
                onClick={() => requestQuote(item.value)}
              >
                {messages.packages.requestQuote}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
