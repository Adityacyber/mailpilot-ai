import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const threads = pgTable("threads", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  subject: text("subject"),
  participants: text("participants"),
  messageCount: integer("message_count"),
  hasUnread: text("has_unread"),
  lastMessageAt: timestamp("last_message_at"),
  summary: text("summary"),
});
