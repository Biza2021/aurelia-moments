"use client";

import Image from "next/image";
import { Calendar, CheckCircle2, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { EVENT_TYPES, PACKAGE_OPTIONS } from "@/lib/booking";
import type { Locale, Messages } from "@/lib/i18n";

type BookingFormState = {
  fullName: string;
  phoneNumber: string;
  eventDate: string;
  eventLocation: string;
  eventType: (typeof EVENT_TYPES)[number] | "";
  estimatedGuests: string;
  preferredPackage: (typeof PACKAGE_OPTIONS)[number] | "";
  additionalNotes: string;
};

const initialForm: BookingFormState = {
  fullName: "",
  phoneNumber: "",
  eventDate: "",
  eventLocation: "",
  eventType: "",
  estimatedGuests: "",
  preferredPackage: "",
  additionalNotes: ""
};

export function BookingForm({
  locale,
  messages
}: {
  locale: Locale;
  messages: Messages;
}) {
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const isArabic = locale === "ar";
  const t = messages.booking;

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ packageName?: string }>;
      const packageName = customEvent.detail?.packageName;

      if (PACKAGE_OPTIONS.includes(packageName as (typeof PACKAGE_OPTIONS)[number])) {
        setForm((current) => ({
          ...current,
          preferredPackage: packageName as (typeof PACKAGE_OPTIONS)[number]
        }));
      }
    };

    window.addEventListener("aurelia:select-package", handler);
    return () => window.removeEventListener("aurelia:select-package", handler);
  }, []);

  const updateField = <TField extends keyof BookingFormState>(
    field: TField,
    value: BookingFormState[TField]
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        locale,
        eventType: form.eventType,
        preferredPackage: form.preferredPackage
      })
    });

    const data = (await response.json().catch(() => ({}))) as {
      message?: string;
    };

    if (!response.ok) {
      setError(data.message ?? t.error);
      setSubmitting(false);
      return;
    }

    setMessage(data.message ?? t.success);
    setForm(initialForm);
    setSubmitting(false);
  };

  return (
    <section id="booking" className="scroll-mt-20 bg-aurelia-ivory py-16 md:py-24">
      <div className="aurelia-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] shadow-aurelia sm:aspect-[3/4] lg:aspect-auto lg:min-h-[430px]">
          <Image
            src="/images/aurelia/booking-section-abaya-rack.png"
            alt="Aurelia Moments booking visual with abaya rack"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-full w-full object-cover"
            style={{ objectPosition: "61% center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div
            className={`absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6 ${
              isArabic ? "text-right" : ""
            }`}
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-aurelia-cream">
              {t.imageEyebrow}
            </p>
            <p className="mt-3 max-w-md font-display text-2xl leading-tight sm:text-3xl">
              {t.imageText}
            </p>
          </div>
        </div>

        <div className="soft-card p-6 md:p-8">
          <div
            className={`text-center ${
              isArabic ? "md:text-right" : "md:text-left"
            }`}
          >
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-aurelia-charcoal/70">
              {t.subtitle}
            </p>
          </div>

          {message ? (
            <div
              className="mt-6 rounded-2xl border border-aurelia-sage/45 bg-aurelia-sage/10 p-4 text-sm leading-7 text-aurelia-charcoal"
              role="status"
            >
              <div className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-none text-aurelia-gold"
                  aria-hidden="true"
                />
                <span>{message}</span>
              </div>
            </div>
          ) : null}

          {error ? (
            <div
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              role="alert"
            >
              {error}
            </div>
          ) : null}

          <form className="mt-7 grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
            <label>
              <span className="field-label">{t.labels.fullName}</span>
              <input
                className="field-input"
                required
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                autoComplete="name"
              />
            </label>

            <label>
              <span className="field-label">{t.labels.phoneNumber}</span>
              <input
                className="field-input"
                required
                value={form.phoneNumber}
                onChange={(event) =>
                  updateField("phoneNumber", event.target.value)
                }
                autoComplete="tel"
                placeholder={t.placeholders.phoneNumber}
              />
            </label>

            <label>
              <span className="field-label">{t.labels.eventDate}</span>
              <div className="relative">
                <input
                  className="field-input pr-11"
                  required
                  type="date"
                  min={minDate}
                  value={form.eventDate}
                  onChange={(event) =>
                    updateField("eventDate", event.target.value)
                  }
                />
                <Calendar
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 translate-y-[-20%] text-aurelia-gold"
                  aria-hidden="true"
                />
              </div>
            </label>

            <label>
              <span className="field-label">{t.labels.eventLocation}</span>
              <input
                className="field-input"
                required
                value={form.eventLocation}
                onChange={(event) =>
                  updateField("eventLocation", event.target.value)
                }
                placeholder={t.placeholders.eventLocation}
              />
            </label>

            <label>
              <span className="field-label">{t.labels.eventType}</span>
              <select
                className="field-input"
                required
                value={form.eventType}
                onChange={(event) =>
                  updateField(
                    "eventType",
                    event.target.value as BookingFormState["eventType"]
                  )
                }
              >
                <option value="">{t.select.eventType}</option>
                {EVENT_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {t.eventTypes[option]}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="field-label">
                {t.labels.estimatedGuests}
              </span>
              <input
                className="field-input"
                type="number"
                min="1"
                inputMode="numeric"
                value={form.estimatedGuests}
                onChange={(event) =>
                  updateField("estimatedGuests", event.target.value)
                }
                placeholder={t.placeholders.estimatedGuests}
              />
            </label>

            <label className="md:col-span-2">
              <span className="field-label">{t.labels.preferredPackage}</span>
              <select
                className="field-input"
                required
                value={form.preferredPackage}
                onChange={(event) =>
                  updateField(
                    "preferredPackage",
                    event.target
                      .value as BookingFormState["preferredPackage"]
                  )
                }
              >
                <option value="">{t.select.preferredPackage}</option>
                {PACKAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {t.packages[option]}
                  </option>
                ))}
              </select>
            </label>

            <label className="md:col-span-2">
              <span className="field-label">{t.labels.additionalNotes}</span>
              <textarea
                className="field-input min-h-32 resize-y"
                value={form.additionalNotes}
                onChange={(event) =>
                  updateField("additionalNotes", event.target.value)
                }
                placeholder={t.placeholders.additionalNotes}
              />
            </label>

            <button
              type="submit"
              className="gold-button md:col-span-2"
              disabled={submitting}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {submitting ? t.submitting : t.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
