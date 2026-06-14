import { auth } from "@/auth";
import { getGoogleAccount } from "@/lib/account";
import { getGmailClient } from "@/lib/gmail";
import { getHeader } from "@/lib/gmail-parser";
import { saveEmail } from "@/lib/gmail-sync";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await getGoogleAccount(session.user.id);

  if (!account?.access_token) {
    return Response.json(
      { error: "No Google account linked" },
      { status: 400 },
    );
  }

  const gmail = getGmailClient({
    accessToken: account.access_token,
    refreshToken: account.refresh_token!,
  });

  const messages = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10,
  });

  const emails = await Promise.all(
    (messages.data.messages ?? []).map(async (message) => {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: message.id!,
        format: "full",
      });

      const headers = email.data.payload?.headers ?? [];

      //@ts-ignore
      const subject = getHeader(headers, "Subject");
      //@ts-ignore
      const from = getHeader(headers, "From");
      //@ts-ignore
      const recipient = getHeader(headers, "To");
      //@ts-ignore
      const receivedAt = getHeader(headers, "Date");

      await saveEmail({
        //@ts-ignore
        userId: session.user.id,
        gmailId: email.data.id!,
        threadId: email.data.threadId!,
        snippet: email.data.snippet ?? "",
        subject,
        sender: from,
        recipients: recipient,
        receivedAt,
      });

      return {
        gmailId: email.data.id,
        threadId: email.data.threadId,
        snippet: email.data.snippet,
        subject,
        from,
        recipient,
        receivedAt,
      };
    }),
  );

  return Response.json(emails);
}
