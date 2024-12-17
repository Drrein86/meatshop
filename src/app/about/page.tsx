"use client";
import { useState } from "react";
import { motion } from "framer-motion"; // מותקן ב-npm install framer-motion

const AboutUsPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // כאן תוכל לשלוח את הנתונים לשרת או לעבד אותם כרצונך
    setSubmitted(true);
  };

  return (
    <div dir="rtl" className="bg-[#F4F7F6]">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        {/* כותרת */}
        <motion.h1
          className="text-5xl font-bold text-[#093028] text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          קצת עלינו – המקום של קצץ
        </motion.h1>

        {/* תיאור הקצביה */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <motion.p
              className="text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              קצבית{" "}
              <span className="font-bold text-[#093028]"> המקום של קצץ</span>{" "}
              הוקמה מתוך תשוקה למקצוע ולהעניק לכל לקוח חוויה ייחודית ומרגשת.
              אנחנו בקצביה מתמחים בסטייקים מיושנים ובשרים איכותיים המיוצרים
              בצורה מוקפדת ועם הרבה אהבה למקצוע.
            </motion.p>
            <motion.p
              className="text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              המוצרים שלנו נבחרים בקפידה ומעובדים בצורה מקצועית כך שלכל פריט יש
              את האיכות והטריות שמרכיבות את הסטנדרטים שלנו. כל החיתוכים מתבצעים
              בעבודת יד ובליווי צוות מיומן שדואג לכל פרט.
            </motion.p>
            <motion.p
              className="text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              ב-"המקום של קצץ" אנחנו לא רק מוכרים בשר – אנחנו נותנים שירות
              מעולה, ייעוץ מקצועי ובחירה אישית. כל אחד יכול למצוא את המוצר
              שמתאים לו ביותר, וליהנות ממבצעי איכות ושירות בכל ביקור.
            </motion.p>
          </div>
          <div>
            <motion.img
              src="/7.png"
              alt="קצביה"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </div>

        {/* טופס יצירת קשר */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-[#093028] text-center mb-6">
            נשמח לשמוע ממכם!
          </h2>

          {submitted ? (
            <div className="text-center text-green-500">
              <p>תודה על ההודעה! ניצור איתך קשר בהקדם.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-[#093028]"
                >
                  שם מלא
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-[#093028]"
                >
                  אימייל
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-lg font-semibold text-[#093028]"
                >
                  הודעה
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#093028] text-white font-semibold rounded-lg hover:bg-[#0b4339] transition duration-300"
              >
                שלח הודעה
              </button>
            </form>
          )}
        </motion.div>

        {/* תמונות וקטעי מידע נוספים */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <img
              src="6.png"
              alt="סטייקים מיושנים"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
            <h3 className="text-2xl font-semibold text-[#093028]">
              סטייקים מיושנים
            </h3>
            <p className="text-gray-700">
              הסטייקים המיושנים שלנו הם התשובה לכל חובב בשר שמחפש את המושלם. כל
              בשר מיושן בתנאים אופטימליים כדי להוציא את הטעמים המיוחדים ביותר.
            </p>
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <img
              src="5.png"
              alt="תפריט מותאם אישית"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
            <h3 className="text-2xl font-semibold text-[#093028]">
              תפריט מותאם אישית
            </h3>
            <p className="text-gray-700">
              אנחנו מציעים תפריט מותאם אישית שמאפשר לכם לבחור את סוגי הבשר
              והחיתוכים המושלמים לכל אירוע – מכאן תתחיל החוויה!
            </p>
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <img
              src="7.png"
              alt="חנות הקצביה"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
            <h3 className="text-2xl font-semibold text-[#093028]">
              חנות קצביה
            </h3>
            <p className="text-gray-700">
              בקצביה שלנו, כל מוצר מקבל את היחס הראוי לו. אנו מקפידים על תחזוקה
              ושירות אישי כדי שתהיו מרוצים כל פעם מחדש.
            </p>
          </motion.div>
        </div>

        {/* קריאה לפעולה */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <h2 className="text-3xl font-bold text-[#093028]">
            בואו לבקר אותנו!
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            נשמח לראותכם בקצביה ולהציע לכם את מיטב הבשרים שלנו. אל תפספסו את
            ההזדמנות להכיר אותנו מקרוב ולהתנסות בטעמים הייחודיים שלנו.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block px-8 py-3 bg-[#093028] text-white font-semibold rounded-lg hover:bg-[#0b4339] transition duration-300"
          >
            צור קשר
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;
