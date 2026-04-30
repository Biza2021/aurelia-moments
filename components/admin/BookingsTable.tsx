import type { BookingRequest } from "@prisma/client";
import Link from "next/link";
import { Eye } from "lucide-react";
import { BookingStatusBadge } from "@/components/admin/BookingStatusBadge";

type BookingsTableProps = {
  bookings: BookingRequest[];
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-QA", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(value);
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="mt-8 rounded-[1.4rem] border border-aurelia-sand/45 bg-white/76 p-8 text-center shadow-soft">
        <h2 className="font-display text-2xl">No booking requests yet</h2>
        <p className="mt-2 text-sm text-aurelia-charcoal/70">
          New inquiries will appear here once guests submit the booking form.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div className="grid gap-4 md:hidden">
        {bookings.map((booking) => (
          <article
            key={booking.id}
            className="rounded-[1.3rem] border border-aurelia-sand/45 bg-white/80 p-5 shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl">{booking.fullName}</h2>
                <p className="mt-1 text-sm text-aurelia-charcoal/70">
                  {booking.phoneNumber}
                </p>
              </div>
              <BookingStatusBadge status={booking.status} />
            </div>
            <div className="mt-5 grid gap-2 text-sm text-aurelia-charcoal/70">
              <p>{formatDate(booking.eventDate)}</p>
              <p>{booking.eventType}</p>
              <p>{booking.preferredPackage}</p>
              <p>Created {formatDate(booking.createdAt)}</p>
            </div>
            <Link
              href={`/admin/bookings/${booking.id}`}
              className="gold-button mt-5 w-full py-2.5"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              View Details
            </Link>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-[1.35rem] border border-aurelia-sand/45 bg-white/80 shadow-soft md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-aurelia-cream/70 text-xs uppercase tracking-[0.14em] text-aurelia-charcoal/65">
            <tr>
              <th className="px-5 py-4 font-semibold">Client</th>
              <th className="px-5 py-4 font-semibold">Phone</th>
              <th className="px-5 py-4 font-semibold">Event Date</th>
              <th className="px-5 py-4 font-semibold">Event Type</th>
              <th className="px-5 py-4 font-semibold">Package</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Created</th>
              <th className="px-5 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-aurelia-sand/35">
            {bookings.map((booking) => (
              <tr key={booking.id} className="align-top">
                <td className="px-5 py-4 font-medium">{booking.fullName}</td>
                <td className="px-5 py-4 text-aurelia-charcoal/70">
                  {booking.phoneNumber}
                </td>
                <td className="px-5 py-4 text-aurelia-charcoal/70">
                  {formatDate(booking.eventDate)}
                </td>
                <td className="px-5 py-4 text-aurelia-charcoal/70">
                  {booking.eventType}
                </td>
                <td className="px-5 py-4 text-aurelia-charcoal/70">
                  {booking.preferredPackage}
                </td>
                <td className="px-5 py-4">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-5 py-4 text-aurelia-charcoal/70">
                  {formatDate(booking.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-aurelia-gold/45 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-aurelia-gold transition hover:bg-aurelia-gold hover:text-white"
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
