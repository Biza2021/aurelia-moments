import { DashboardStats } from "@/components/admin/DashboardStats";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Aurelia Moments"
};

export default async function AdminDashboardPage() {
  const [total, newCount, contacted, confirmed, completed, cancelled] =
    await Promise.all([
      prisma.bookingRequest.count(),
      prisma.bookingRequest.count({ where: { status: "NEW" } }),
      prisma.bookingRequest.count({ where: { status: "CONTACTED" } }),
      prisma.bookingRequest.count({ where: { status: "CONFIRMED" } }),
      prisma.bookingRequest.count({ where: { status: "COMPLETED" } }),
      prisma.bookingRequest.count({ where: { status: "CANCELLED" } })
    ]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aurelia-gold">
          Overview
        </p>
        <h1 className="font-display text-4xl">Admin Dashboard</h1>
        <p className="max-w-2xl text-sm leading-7 text-aurelia-charcoal/70">
          A quick view of Aurelia Moments booking activity and service status.
        </p>
      </div>

      <DashboardStats
        stats={[
          { label: "Total bookings", value: total },
          { label: "New bookings", value: newCount },
          { label: "Contacted", value: contacted },
          { label: "Confirmed", value: confirmed },
          { label: "Completed", value: completed },
          { label: "Cancelled", value: cancelled }
        ]}
      />
    </div>
  );
}
