"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const LoginPage = () => {
  const { data: session } = useSession();
  useEffect(() => {
    // אפשר להוסיף כאן לוגיקה שקשורה לטעינה של סשן
    console.log(session);
  }, [session]);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        {!session ? (
          <>
            <h1 className="text-3xl font-bold mb-6">התחבר עם גוגל</h1>
            <button
              onClick={() => signIn("google")}
              className="bg-blue-500 text-white px-6 py-3 rounded-full"
            >
              התחבר עם גוגל
            </button>
          </>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">שלום, {session.user?.name}</h2>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-6 py-3 rounded-full"
            >
              התנתק
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
