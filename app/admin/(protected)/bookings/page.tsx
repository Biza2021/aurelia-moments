import { BookingsTable } from "@/components/admin/BookingsTable";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bookings | Aurelia Moments"
};

export default async function AdminBookingsPage() {
  const bookings = await prisma.bookingRequest.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aurelia-gold">
          Requests
        </p>
        <h1 className="font-display text-4xl">Booking Requests</h1>
        <p className="max-w-2xl text-sm leading-7 text-aurelia-charcoal/70">
          Review inquiries, open details, and keep every event request moving.
        </p>
      </div>

      <BookingsTable bookings={bookings} />
    </div>
  );
}
