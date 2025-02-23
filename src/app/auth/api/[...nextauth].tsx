import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function MyComponent() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      // בדיקה אם המשתמש כבר מנסה להיכנס כדי למנוע לולאה אינסופית
      if (window.location.pathname !== "/api/auth/signin") {
        signIn();
      }
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return <div>Welcome, {session?.user?.name}!</div>;
}
