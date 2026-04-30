import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingDetailForm } from "@/components/admin/BookingDetailForm";
import { BookingStatusBadge } from "@/components/admin/BookingStatusBadge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type BookingDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-QA", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(value);
}

export default async function BookingDetailPage({
  params
}: BookingDetailPageProps) {
  const { id } = await params;
  const booking = await prisma.bookingRequest.findUnique({
    where: { id }
  });

  if (!booking) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/bookings"
        className="text-xs font-semibold uppercase tracking-[0.18em] text-aurelia-gold transition hover:text-aurelia-ink"
      >
        Back to bookings
      </Link>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aurelia-gold">
            Booking Detail
          </p>
          <h1 className="mt-2 font-display text-4xl">{booking.fullName}</h1>
          <p className="mt-2 text-sm text-aurelia-charcoal/70">
            Submitted {formatDate(booking.createdAt)}
          </p>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[1.4rem] border border-aurelia-sand/45 bg-white/80 p-6 shadow-soft">
          <h2 className="font-display text-2xl">Client Information</h2>
          <dl className="mt-6 grid gap-4 text-sm">
            <div>
              <dt className="field-label">Phone number</dt>
              <dd className="mt-1 text-aurelia-ink">{booking.phoneNumber}</dd>
            </div>
            <div>
              <dt className="field-label">Event date</dt>
              <dd className="mt-1 text-aurelia-ink">
                {formatDate(booking.eventDate)}
              </dd>
            </div>
            <div>
              <dt className="field-label">Event location</dt>
              <dd className="mt-1 text-aurelia-ink">
                {booking.eventLocation}
              </dd>
            </div>
            <div>
              <dt className="field-label">Event type</dt>
              <dd className="mt-1 text-aurelia-ink">{booking.eventType}</dd>
            </div>
            <div>
              <dt className="field-label">Estimated guests</dt>
              <dd className="mt-1 text-aurelia-ink">
                {booking.estimatedGuests ?? "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="field-label">Preferred package</dt>
              <dd className="mt-1 text-aurelia-ink">
                {booking.preferredPackage}
              </dd>
            </div>
            <div>
              <dt className="field-label">Additional notes</dt>
              <dd className="mt-1 whitespace-pre-wrap leading-7 text-aurelia-ink">
                {booking.additionalNotes || "None"}
              </dd>
            </div>
          </dl>
        </section>

        <BookingDetailForm
          bookingId={booking.id}
          initialStatus={booking.status}
          initialInternalNotes={booking.internalNotes ?? ""}
        />
      </div>
    </div>
  );
}
