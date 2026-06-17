import { db } from "@/db";
import { emails } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";

export class EmailService {
  static async getInbox(userId: string) {
    return await db
      .select()
      .from(emails)
      .where(eq(emails.userId, userId))
      .orderBy(desc(emails.receivedAt))
      .limit(100);
  }

  static async getEmailById(emailId: string, userId: string) {
    const result = await db
      .select()
      .from(emails)
      .where(and(eq(emails.id, emailId), eq(emails.userId, userId)))
      .limit(1);

    return result[0] ?? null;
  }
}
