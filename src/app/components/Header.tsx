"use client";

import HamburgerMenu from "./HamburgerMenu";
import { GiMeatCleaver } from "react-icons/gi";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook למעקב אחרי הנתיב
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import CartPopup from "./CartPopup";
import SearchComponent from "./SearchComponent";
import { FaUser, FaShoppingCart, FaCog } from "react-icons/fa"; // ייבוא אייקונים מ-react-icons

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
  console.log("HamburgerMenu rendered");

  return (
    <header dir="rtl" className="sticky z-50 top-0">
      <div className="bg-[#093028] h-7 flex items-center justify-start p-1 text-white">
        <a href="tel:+1234567890" className="flex items-center  gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 4.5C2.25 3.25736 3.25736 2.25 4.5 2.25H6.75C7.94036 2.25 8.89565 3.1571 8.99788 4.33086L9.375 8.66203C9.47588 9.82741 8.79168 10.918 7.65986 11.2406L6.16504 11.6901C6.08112 11.7164 6.0375 11.7977 6.05938 11.8802C6.99648 15.4987 8.5013 18.0035 11.1198 18.9406C11.2023 18.9625 11.2836 18.9189 11.3099 18.835L11.7594 17.3401C12.082 16.2083 13.1726 15.5241 14.338 15.625L18.6691 16.0021C19.8429 16.1043 20.75 17.0596 20.75 18.25V20.5C20.75 21.7426 19.7426 22.75 18.5 22.75H18C10.5 22.75 3.75 16 3.75 8.5V8C3.75 6.75736 4.75736 5.75 6 5.75H6.25C7.05964 5.75 7.75 6.44036 7.75 7.25V7.5C7.75 7.72386 7.77386 7.94772 7.82031 8.16504C7.89464 8.4726 7.92716 8.78676 7.91902 9.10156C7.90242 9.75674 7.37076 10.25 6.72609 10.25H6.5C6.27614 10.25 6.05228 10.2239 5.82961 10.1703C5.70181 10.1423 5.58219 10.0917 5.47852 10.0187C5.35574 9.93136 5.26297 9.80908 5.20703 9.66634C5.15108 9.52359 5.13351 9.36598 5.15625 9.21094C5.16811 9.1289 5.16811 9.03931 5.15625 8.95727C5.13351 8.80223 5.15108 8.64462 5.20703 8.50187C5.26297 8.35912 5.35574 8.23684 5.47852 8.14952C5.58219 8.07651 5.70181 8.02589 5.82961 7.9979C6.05228 7.94428 6.27614 7.91815 6.5 7.91815H6.75C7.44036 7.91815 8 7.35879 8 6.66843L7.66843 2.99788C7.57812 2.22311 6.87357 1.75 6.14063 1.75H4.5C3.50736 1.75 2.25 2.50736 2.25 4.5Z"
            />
          </svg>
          <span>להזמנות: 050-456-7890</span>
        </a>
      </div>
      <div className="bg-white flex text-[#093028]">
        {/* תפריט נפתח לנייד */}
        <HamburgerMenu />
        <div className="container mx-auto flex flex-wrap items-center justify-between p-2">
          {/* לוגו */}
          <div className="flex items-center gap-2">
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
              className="bg-[#cc9621] text-white font-semibold p-2 rounded-lg hover:bg-[#b6841d] transition flex items-center gap-2"
            >
              <FaCog className="w-5 h-5" /> {/* אייקון גלגל שיניים */}
            </Link>
          )}

          {/* חיפוש */}
          <div className="hidden lg:flex w-full mt-4 lg:mt-0 lg:w-auto lg:ml-4">
            <SearchComponent />
          </div>

          {/* אייקונים */}
          <div className="flex items-center gap-6">
            {/* כניסה עם אייקון של משתמש */}
            <a
              href="/login"
              className="flex items-center gap-2 text-[#093028] text-sm font-medium hover:underline"
            >
              <FaUser className="w-5 h-5" />
              <span>התחבר</span>
            </a>

            {/* כפתור לעגלת קניות */}
            <div className="relative">
              <button
                className="text-[#093028] relative flex items-center justify-center"
                onClick={openCart}
              >
                <FaShoppingCart className="w-6 h-6" />
              </button>

              {/* עיגול אדום מעל האייקון עם כמות המוצרים */}
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {getCartCount()}
                </span>
              )}
            </div>

            {/* הצגת פופאפ עגלה */}
            {isCartOpen && <CartPopup />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
