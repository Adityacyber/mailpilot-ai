import { signIn } from "@/auth";

export default function Home() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button>Sign in with Google</button>
    </form>
  );
}
