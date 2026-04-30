import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata = {
  title: "Admin Login | Aurelia Moments",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-aurelia-ivory px-5 py-12">
      <section className="w-full max-w-md rounded-[1.6rem] border border-white/70 bg-white/80 p-7 shadow-aurelia">
        <p className="text-center font-display text-sm uppercase tracking-[0.32em] text-aurelia-gold">
          Aurelia Moments
        </p>
        <h1 className="mt-5 text-center font-display text-4xl">
          Admin Login
        </h1>
        <p className="mt-3 text-center text-sm leading-7 text-aurelia-charcoal/70">
          Secure access for booking requests and event coordination.
        </p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
