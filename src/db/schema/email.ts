import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";

export const emails = pgTable("emails", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  gmailId: text("gmail_id").notNull().unique(),
  threadId: text("thread_id").notNull(),
  subject: text("subject"),
  sender: text("sender"),
  recipients: jsonb("recipients"),
  snippet: text("snippet"),
  bodyHtml: text("body_html"),
  bodyText: text("body_text"),
  labels: jsonb("labels"),
  isRead: boolean("is_read").default(false),
  isStarred: boolean("is_starred").default(false),
  receivedAt: timestamp("received_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
