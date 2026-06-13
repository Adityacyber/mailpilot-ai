import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

export const calendarEvents = pgTable("calendar_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title"),
  startAt: timestamp("start_at"),
  endAt: timestamp("end_at"),
  attendees: jsonb("attendees"),
  description: text("description"),
  meetLink: text("meet_link"),
  status: text("status"),
});
