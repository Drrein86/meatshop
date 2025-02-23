import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function MyComponent() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined" && status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return <div>Welcome, {session?.user?.name}!</div>;
}
