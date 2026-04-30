import type { BookingStatus } from "@prisma/client";

const statusStyles: Record<BookingStatus, string> = {
  NEW: "border-aurelia-gold/40 bg-aurelia-gold/10 text-aurelia-gold",
  CONTACTED: "border-blue-200 bg-blue-50 text-blue-800",
  CONFIRMED: "border-aurelia-sage/45 bg-aurelia-sage/15 text-aurelia-charcoal",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-800",
  CANCELLED: "border-red-200 bg-red-50 text-red-800"
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
