export const EVENT_TYPES = [
  "Private Gathering",
  "Wedding",
  "Engagement",
  "Family Celebration",
  "Corporate Women's Event",
  "Other"
] as const;

export const PACKAGE_OPTIONS = [
  "Private Gathering",
  "Wedding Experience",
  "Signature Luxury Setup",
  "Not sure yet"
] as const;

export const BOOKING_STATUSES = [
  "NEW",
  "CONTACTED",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED"
] as const;

export type BookingStatusValue = (typeof BOOKING_STATUSES)[number];
