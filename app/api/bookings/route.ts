import { NextResponse } from "next/server";
import { isLocale, getMessages, type Locale } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { publicBookingSchema } from "@/lib/validations";

function parseDateOnly(value: string) {
  return new Date(`${value}T12:00:00.000Z`);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const locale: Locale =
    payload && isLocale(payload.locale) ? payload.locale : "en";
  const messages = getMessages(locale);
  const parsed = publicBookingSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: messages.booking.error,
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    await prisma.bookingRequest.create({
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        eventDate: parseDateOnly(data.eventDate),
        eventLocation: data.eventLocation,
        eventType: data.eventType,
        estimatedGuests: data.estimatedGuests,
        preferredPackage: data.preferredPackage,
        additionalNotes: data.additionalNotes || null,
        status: "NEW"
      }
    });
  } catch (error) {
    console.error("Booking request failed", error);
    return NextResponse.json(
      { message: messages.booking.genericError },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: messages.booking.success
  });
}
