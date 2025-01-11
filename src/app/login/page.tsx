import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("google")}>התחבר עם גוגל</button>
      ) : (
        <div>
          <p>שלום, {session.user?.name}</p>
          <button onClick={() => signOut()}>התנתק</button>
        </div>
      )}
    </div>
  );
}
