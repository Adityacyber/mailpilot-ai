import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { EmailService } from "@/services/email.services";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const emails = await EmailService.getInbox(session.user.id);

  return (
    <div>
      <h1>Inbox</h1>

      {emails.map((email) => (
        <Link key={email.id} href={`/dashboard/email/${email.id}`}>
          <div className="mb-4">
            <h3>{email.subject}</h3>
            <p>{email.sender}</p>
            <p>{email.snippet}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
