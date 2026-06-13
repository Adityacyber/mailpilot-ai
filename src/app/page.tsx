import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    // <form
    //   action={async () => {
    //     "use server";
    //     await signIn("google");
    //   }}
    // >
    //   <button>Sign in with Google</button>
    // </form>

    <pre>{JSON.stringify(session, null, 2)}</pre>
  );
}
