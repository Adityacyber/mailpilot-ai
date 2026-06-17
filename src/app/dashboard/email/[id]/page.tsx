import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { EmailService } from "@/services/email.services";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmailPage({ params }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const { id } = await params;

  const email = await EmailService.getEmailById(id, session.user.id);

  if (!email) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{email.subject}</h1>
      <p>{email.sender}</p>
      <p>{email.receivedAt?.toString()}</p>

      <div className="mt-6">{email.bodyText}</div>
    </div>
  );
}
