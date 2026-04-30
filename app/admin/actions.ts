"use server";

import { clearAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logoutAdmin() {
  await clearAuthCookie();
  redirect("/admin/login");
}
