"use client";

import type { BookingStatus } from "@prisma/client";
import { Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BOOKING_STATUSES } from "@/lib/booking";

type BookingDetailFormProps = {
  bookingId: string;
  initialStatus: BookingStatus;
  initialInternalNotes: string;
};

export function BookingDetailForm({
  bookingId,
  initialStatus,
  initialInternalNotes
}: BookingDetailFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<BookingStatus>(initialStatus);
  const [internalNotes, setInternalNotes] = useState(initialInternalNotes);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const saveChanges = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const response = await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, internalNotes })
    });

    if (!response.ok) {
      setError("Unable to update this booking.");
      setSubmitting(false);
      return;
    }

    setMessage("Booking updated.");
    setSubmitting(false);
    router.refresh();
  };

  const deleteBooking = async () => {
    const confirmed = window.confirm(
      "Delete this booking request? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      setError("Unable to delete this booking.");
      setDeleting(false);
      return;
    }

    router.push("/admin/bookings");
    router.refresh();
  };

  return (
    <section className="rounded-[1.4rem] border border-aurelia-sand/45 bg-white/80 p-6 shadow-soft">
      <h2 className="font-display text-2xl">Admin Management</h2>

      {message ? (
        <div className="mt-5 rounded-2xl border border-aurelia-sage/45 bg-aurelia-sage/10 p-4 text-sm text-aurelia-charcoal">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <form className="mt-6 grid gap-5" onSubmit={saveChanges}>
        <label>
          <span className="field-label">Status</span>
          <select
            className="field-input"
            value={status}
            onChange={(event) => setStatus(event.target.value as BookingStatus)}
          >
            {BOOKING_STATUSES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="field-label">Internal notes</span>
          <textarea
            className="field-input min-h-56 resize-y"
            value={internalNotes}
            onChange={(event) => setInternalNotes(event.target.value)}
            placeholder="Private admin notes for follow-up, logistics, and event requirements"
          />
        </label>

        <button type="submit" className="gold-button" disabled={submitting}>
          <Save className="h-4 w-4" aria-hidden="true" />
          {submitting ? "Saving" : "Save Changes"}
        </button>
      </form>

      <div className="mt-8 border-t border-aurelia-sand/40 pt-6">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-red-800 transition hover:bg-red-100 disabled:opacity-60"
          onClick={deleteBooking}
          disabled={deleting}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          {deleting ? "Deleting" : "Delete Booking"}
        </button>
      </div>
    </section>
  );
}
