import { CheckCircle2, Heart, Sparkles, Tag } from "lucide-react";
import type { Messages } from "@/lib/i18n";

const stepIcons = [Heart, Sparkles, Tag, CheckCircle2];

export function ExperienceSteps({ messages }: { messages: Messages }) {
  return (
    <section
      id="experience"
      className="scroll-mt-20 bg-aurelia-cream/70 py-16 md:py-24"
    >
      <div className="aurelia-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{messages.experience.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">
            {messages.experience.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {messages.experience.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <article key={step.title} className="soft-card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-aurelia-gold/30 bg-aurelia-ivory text-aurelia-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-aurelia-charcoal/70">
                  {step.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
