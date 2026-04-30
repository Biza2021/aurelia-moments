import Link from "next/link";
import { ClipboardList, LayoutDashboard, LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";

type AdminLayoutProps = {
  adminEmail: string;
  children: React.ReactNode;
};

const links = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    icon: ClipboardList
  }
];

export function AdminLayout({ adminEmail, children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-aurelia-ivory">
      <header className="border-b border-aurelia-sand/40 bg-aurelia-ivory/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.28em] text-aurelia-ink">
              Aurelia Moments
            </p>
            <p className="mt-1 text-xs text-aurelia-charcoal/60">
              Signed in as {adminEmail}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full border border-aurelia-sand/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-aurelia-charcoal transition hover:border-aurelia-gold hover:text-aurelia-gold"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                </Link>
              );
            })}
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-aurelia-sand/60 bg-aurelia-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-aurelia-charcoal"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">{children}</main>
    </div>
  );
}
