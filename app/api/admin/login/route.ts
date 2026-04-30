import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { adminLoginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please enter a valid email and password." },
      { status: 400 }
    );
  }

  const email = parsed.data.email.toLowerCase();
  const admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 }
    );
  }

  const passwordMatches = await bcrypt.compare(
    parsed.data.password,
    admin.passwordHash
  );

  if (!passwordMatches) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 }
    );
  }

  await setAuthCookie(admin.id);

  return NextResponse.json({ message: "Signed in." });
}
