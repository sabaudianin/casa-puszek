import {
  pgTable,
  text,
  integer,
  timestamp,
  date,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const bookings = pgTable("bookings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestPhone: text("guest_phone").notNull(),
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  numberOfGuests: integer("number_of_guests").notNull(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  status: bookingStatusEnum("status").default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pricingRules = pgTable("pricing_rules", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  pricePerNight: numeric("price_per_night", {
    precision: 10,
    scale: 2,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blockedDates = pgTable("blocked_dates", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const defaultPricing = pgTable("default_pricing", {
  id: text("id").primaryKey().default("default"),
  pricePerNight: numeric("price_per_night", {
    precision: 10,
    scale: 2,
  }).notNull(),
});
