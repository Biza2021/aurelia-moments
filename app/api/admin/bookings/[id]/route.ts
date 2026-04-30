import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { adminBookingUpdateSchema } from "@/lib/validations";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  const admin = await getCurrentAdmin();
  const { id } = await params;

  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = adminBookingUpdateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please review the booking update." },
      { status: 400 }
    );
  }

  const booking = await prisma.bookingRequest.update({
    where: { id },
    data: {
      status: parsed.data.status,
      internalNotes: parsed.data.internalNotes || null
    }
  });

  return NextResponse.json({ booking });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const admin = await getCurrentAdmin();
  const { id } = await params;

  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  await prisma.bookingRequest.delete({
    where: { id }
  });

  return NextResponse.json({ message: "Booking deleted." });
}
