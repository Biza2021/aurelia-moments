import { z } from "zod";
import { BOOKING_STATUSES, EVENT_TYPES, PACKAGE_OPTIONS } from "@/lib/booking";

const cleanString = z.string().trim();
const requiredString = cleanString.min(1, "This field is required.");

const eventDateSchema = requiredString
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid event date.")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T12:00:00.000Z`)), {
    message: "Please choose a valid event date."
  })
  .refine(
    (value) => {
      const selected = new Date(`${value}T12:00:00.000Z`);
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return selected >= today;
    },
    { message: "Please choose a future event date." }
  );

const phoneNumberSchema = requiredString
  .min(7, "Please enter a valid phone number.")
  .max(40)
  .regex(/^[+()\-\s0-9]+$/, "Please enter a valid phone number.");

const estimatedGuestsSchema = z
  .union([z.string(), z.number(), z.null(), z.undefined()])
  .transform((value) => {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }

    const parsed =
      typeof value === "number" ? value : Number.parseInt(value, 10);

    return Number.isFinite(parsed) ? parsed : Number.NaN;
  })
  .refine(
    (value) => value === undefined || (Number.isInteger(value) && value > 0),
    "Estimated guests must be a positive number."
  );

export const publicBookingSchema = z.object({
  fullName: requiredString.max(120),
  phoneNumber: phoneNumberSchema,
  eventDate: eventDateSchema,
  eventLocation: requiredString.max(180),
  eventType: z.enum(EVENT_TYPES),
  estimatedGuests: estimatedGuestsSchema,
  preferredPackage: z.enum(PACKAGE_OPTIONS),
  additionalNotes: cleanString.max(1200).optional().or(z.literal(""))
});

export const adminLoginSchema = z.object({
  email: requiredString.email("Enter a valid email address.").max(180),
  password: requiredString.max(200)
});

export const adminBookingUpdateSchema = z.object({
  status: z.enum(BOOKING_STATUSES),
  internalNotes: cleanString.max(2000).optional().or(z.literal(""))
});
