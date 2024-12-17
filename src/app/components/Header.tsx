"use client";

import { FaShoppingCart } from "react-icons/fa";
import HamburgerMenu from "./HamburgerMenu";
import { GiMeatCleaver } from "react-icons/gi";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook למעקב אחרי הנתיב
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import CartPopup from "./CartPopup";
import SearchComponent from "./SearchComponent";

function Header() {
  const [isAdmin, setIsAdmin] = useState(true); // כאן יש לבדוק אם המשתמש מנהל, ערך דיפולטי כ"מנהל"
  const { getCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false); // סטטוס פתיחה של העגלה
  const pathname = usePathname(); // קבלת הנתיב הנוכחי

  // סגירת העגלה בכל פעם שהנתיב משתנה
  useEffect(() => {
    if (isCartOpen) {
      setIsCartOpen(false); // סוגר את העגלה רק אם היא פתוחה
    }
  }, [pathname]); // מופעל בכל שינוי בנתיב

  // פונקציה לפתיחה/סגירה של העגלה
  const openCart = () => {
    setIsCartOpen((prev) => !prev); // משנה את הסטטוס למצב ההפוך
  };

  return (
    <header dir="rtl">
      <div className="bg-[#093028] h-5"></div>
      <div className="bg-white text-[#093028]">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4">
          {/* לוגו */}
          <div className="flex items-center p-2 gap-2">
            <GiMeatCleaver size={25} />
            <span className="font-black text-lg">המקום של קצץ</span>
          </div>

          {/* תפריט */}
          <nav className="hidden md:flex font-semibold gap-8 mx-auto font-varela">
            <Link
              href="/"
              className={
                pathname === "/" ? "text-[#cc9621]" : "hover:text-[#cc9621]"
              }
            >
              דף הבית
            </Link>
            <Link
              href="/products"
              className={
                pathname === "/products"
                  ? "text-[#cc9621]"
                  : "hover:text-[#cc9621]"
              }
            >
              הזמנת משלוחים
            </Link>
            <Link
              href="/about"
              className={
                pathname === "/about"
                  ? "text-[#cc9621]"
                  : "hover:text-[#cc9621]"
              }
            >
              אודות
            </Link>
            <Link
              href="/contact"
              className={
                pathname === "/contact"
                  ? "text-[#cc9621]"
                  : "hover:text-[#cc9621]"
              }
            >
              צור קשר
            </Link>
          </nav>

          {/* כפתור מנהל */}
          {isAdmin && (
            <Link
              href="/admin"
              className="bg-[#cc9621] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#b6841d] transition"
            >
              ניהול מוצרים
            </Link>
          )}

          {/* חיפוש */}
          <div className="hidden lg:flex w-full mt-4 lg:mt-0 lg:w-auto lg:ml-4">
            <SearchComponent />
          </div>

          {/* אייקונים */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm hover:underline">
              כניסה
            </Link>
            {/* כפתור לעגלת קניות */}
            <button
              className="bg-blue-500 py-2 px-4 rounded-full"
              onClick={openCart} // פתיחה/סגירה ידנית
            >
              עגלה ({getCartCount()})
            </button>

            {/* הצגת פופאפ עגלה */}
            {isCartOpen && <CartPopup />}
          </div>

          {/* תפריט נפתח לנייד */}
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
