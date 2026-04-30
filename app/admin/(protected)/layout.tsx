import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default async function ProtectedAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return <AdminLayout adminEmail={admin.email}>{children}</AdminLayout>;
}
