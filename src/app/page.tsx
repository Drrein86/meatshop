"use client";

import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa"; // עגלת קניות
import { FiMenu } from "react-icons/fi"; // תפריט נפתח
import { GiMeatCleaver } from "react-icons/gi";
import HamburgerMenu from "./components/HamburgerMenu"; // ייבוא קומפוננטת ההמבורגר
import { useState, useEffect } from "react";
import TestimonialsCarousel from "./components/TestimonialsCarousel";

const Home = () => {
  const images = ["/1.png", "/2.png", "/3.png"]; // רשימת התמונות
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // התחלפות כל 3 שניות

    return () => clearInterval(interval); // ניקוי האינטרוול בזמן הסרת הקומפוננטה
  }, []);
  return (
    <div dir="rtl" className="bg-white text-gray-800 font-sans">
      {/* סרגל עליון */}

      <section className="relative bg-cover bg-center h-[500px] transition-all duration-1000 ease-in-out">
        <HamburgerMenu />
        {/* תמונות מתחלפות */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ))}

        {/* שכבת טקסט */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="text-center text-white px-4 md:px-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              המקום של קצץ
            </h1>
            <p className="text-sm md:text-xl mb-6">רשת קצביות בוטיק מובילות</p>
            <a
              href="/order"
              className="bg-[#cc9621] text-white px-4 py-2 md:px-6 md:py-3 rounded hover:bg-[#fdaf33] text-sm md:text-base"
            >
              התחילו הזמנה עכשיו
            </a>
          </div>
        </div>
      </section>

      {/* יתרונות */}
      <section className="container mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            image: "/1.png",
            title: "בשר מובחר",
            description: "רק נתחים שנבחרו בקפידה ממשקים ישראליים.",
            icon: "🥩", // ניתן להחליף בסמל אחר או אייקון
          },
          {
            image: "/2.png",
            title: "משלוחים מהירים",
            description: "המשלוח מגיע עד דלת הבית תוך 24 שעות.",
            icon: "🚚",
          },
          {
            image: "/3.png",
            title: "שירות אישי",
            description: "שירות לקוחות זמין ותמיכה בכל הזמנה.",
            icon: "👨‍🍳",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform transition relative group bg-white"
          >
            {/* תמונה */}
            <div className="w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            {/* סמל */}
            <div className="text-4xl my-4 text-[#cc9621] group-hover:text-[#ff6f00] transition duration-300">
              {item.icon}
            </div>

            {/* טקסט */}
            <div className="p-4 md:p-6 text-center">
              <h3 className="text-lg md:text-2xl font-bold mb-4 group-hover:text-[#cc9621] transition duration-300">
                {item.title}
              </h3>
              <p className="text-sm md:text-base mb-4">{item.description}</p>
              <button className="px-4 py-2 md:px-6 md:py-3 rounded bg-[#cc9621] text-white hover:bg-[#ff6f00] transition duration-300 text-sm md:text-base">
                קרא עוד
              </button>
            </div>
          </div>
        ))}
      </section>
      {/* תמונת רקע עם שקיפות וגלילה */}
      <section
        className="relative bg-cover bg-center h-[500px] bg-opacity-100"
        style={{
          backgroundImage: `url("1.png")`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[#093028] bg-opacity-75 flex items-center justify-center">
          <div className="text-center flex flex-col gap-5 text-white px-4">
            {/* תיקון פריסה רספונסיבית */}
            <div className="flex flex-col justify-center items-center p-2 gap-3">
              <GiMeatCleaver size={25} className="text-[#cc9621]" />
              <span className="text-[#cc9621] text-xl font-semibold">
                המקום של קצץ
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 sm:gap-10">
              {/* שינוי פריסה למכשירים קטנים */}
              {[
                { number: "1", description: "סניפים" },
                { number: "3", description: "קצבים" },
                { number: "82", description: "מוצרים" },
                { number: "10", description: "עובדים" },
                { number: "2100", description: "לקוחות" },
              ].map((stat, index) => (
                <div key={index} className="text-white">
                  <div className="flex flex-col items-center justify-center rounded-full w-24 h-24 md:w-32 md:h-32 bg-white bg-opacity-30 text-[#cc9621] text-lg md:text-xl font-semibold">
                    {stat.number}
                    <p className="text-white text-sm md:text-base">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* כרטיסי שירותים*/}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-10">
            למה לבחור בנו?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/4.png",
                title: "איכות ללא פשרות",

                description:
                  "אנחנו מתחייבים לספק לכם את הבשר הטרי והאיכותי ביותר, ישירות מהמגדלים הטובים בארץ. הנתח שלנו עובר בדיקות קפדניות כדי לוודא שהוא עומד בסטנדרטים הגבוהים ביותר.",
              },
              {
                image: "/5.png",
                title: "משלוחים מהירים",

                description:
                  "משלוחים לכל הארץ תוך שמירה על טריות ואיכות הבשר. אנחנו מבטיחים שהמוצרים יגיעו עד לפתח הבית שלכם בזמן קצר, כשהם אטומים בקפידה.",
              },
              {
                image: "/6.png",
                title: "הסיפור שלנו",

                description:
                  "עם שנים של ניסיון, אנחנו מביאים מסורת של איכות, טריות ומקצועיות עד אליכם. לכל נתח סיפור, ואנחנו גאים לחלוק אותו אתכם דרך הטעמים המשובחים שלנו.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden p-6 text-center hover:shadow-2xl transform transition hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* תמונת רקע עם שקיפות וגלילה */}
      <section
        className="relative bg-cover bg-center h-[500px] bg-opacity-100"
        style={{
          backgroundImage: `url("1.png")`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[#093028] bg-opacity-75 flex items-center justify-center">
          <div className="text-center flex gap-5 flex-col text-white">
            <div className="flex flex-col justify-center items-center  p-2 gap-3 ">
              <GiMeatCleaver
                size={25}
                className="text-
              [#cc9621]"
              />
              <span className=" text-[#cc9621] text-xl font-semibold">
                {" "}
                המקום של קצץ
              </span>
            </div>{" "}
            <TestimonialsCarousel />
          </div>
        </div>
      </section>
      {/* גלריה*/}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-8">גלריה</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img
              src="/1.png"
              alt="בשר איכותי"
              className="rounded-lg shadow-md"
            />
            <img src="/2.png" alt="מגש בשר" className="rounded-lg shadow-md" />
            <img src="/3.png" alt="נתח בשר" className="rounded-lg shadow-md" />
            <img src="/4.png" alt="אירוע" className="rounded-lg shadow-md" />
            <img src="/5.png" alt="גריל" className="rounded-lg shadow-md" />
            <img
              src="/6.png"
              alt="מטבח בוטיק"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* צור קשר */}
      <section id="contact" className="bg-white py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-8">צור קשר</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">נשמח לשמוע מכם!</h3>
              <p className="text-gray-600 mb-4">
                בין אם יש לכם שאלות על המוצרים שלנו, בקשה מיוחדת או הצעה לשיפור
                – אנחנו כאן בשבילכם.
              </p>
              <p className="text-gray-600">
                <strong>כתובת:</strong> רחוב הדוגמה 123, תל אביב
                <br />
                <strong>טלפון:</strong> 03-1234567
                <br />
                <strong>אימייל:</strong> info@example.com
              </p>
            </div>
            <form className="bg-gray-100 shadow-lg rounded-lg p-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  שם מלא
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="הזן את שמך"
                  className="w-full border-gray-300 rounded-lg shadow-sm p-3"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  אימייל
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="w-full border-gray-300 rounded-lg shadow-sm p-3"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  הודעה
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="מה תרצו לשאול או להגיד לנו?"
                  className="w-full border-gray-300 rounded-lg shadow-sm p-3"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#093028] text-white font-semibold py-3 rounded-lg hover:bg-[#0b4339] transition"
              >
                שלח הודעה
              </button>
            </form>
          </div>
        </div>
      </section>
      <a
        href="https://wa.me/972501234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition"
        aria-label="WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.2 4.8a10 10 0 11-16.4 11.2L2 22l6.3-1.8A10 10 0 0120.2 4.8z"
          />
        </svg>
      </a>
    </div>
  );
};

export default Home;
