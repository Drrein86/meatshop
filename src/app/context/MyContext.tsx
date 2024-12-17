"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// הגדרת סוג הקונטקסט בצורה שתתאים לערכים שלנו
interface MyContextType {
  basename: string;
  setBasename: Dispatch<SetStateAction<string>>;
}

// יצירת הקונטקסט עם ערך ברירת מחדל של אובייקט ריק
const MyContext = createContext<MyContextType | null>(null);

// רכיב המפני את הקונטקסט
export function MyProvider({ children }: { children: React.ReactNode }) {
  const [basename, setBasename] = useState<string>("my-site"); // הערכים שלנו

  return (
    <MyContext.Provider value={{ basename, setBasename }}>
      {children}
    </MyContext.Provider>
  );
}

// פוקנציה לנגישות נוחה לערכים מתוך הקונטקסט
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
}
