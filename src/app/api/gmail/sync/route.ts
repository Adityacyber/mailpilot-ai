import { auth } from "@/auth";
import { getGoogleAccount } from "@/lib/account";
import { getGmailClient } from "@/lib/gmail";

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

  return Response.json(messages.data);
}
