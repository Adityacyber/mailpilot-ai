import { db } from "@/db";
import { emails } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function saveEmail(email: {
  userId: string;
  gmailId: string;
  threadId: string;
  snippet: string;
  subject?: string;
  sender?: string;
  recipients?: string;
  receivedAt?: string;
}) {
  const existing = await db
    .select()
    .from(emails)
    .where(eq(emails.gmailId, email.gmailId))
    .limit(1);

  if (existing.length > 0) return;

  await db.insert(emails).values({
    userId: email.userId,
    gmailId: email.gmailId,
    threadId: email.threadId,
    snippet: email.snippet,
    subject: email.subject,
    sender: email.sender,
    recipients: email.recipients,
    receivedAt: email.receivedAt ? new Date(email.receivedAt) : null,
  });
}
