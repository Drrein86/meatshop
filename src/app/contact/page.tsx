"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // תהליך של שליחת הפנייה (אפשר לחבר ל-API שלך)
    setTimeout(() => {
      alert("הפנייה נשלחה בהצלחה");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div dir="rtl" className="container mx-auto p-6">
      {/* כותרת הדף */}
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        צור קשר עם המקום של קצץ
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* פרטי קשר */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-2xl font-semibold">פרטי מקום</h2>
          <p>כתובת: רחוב 1, דימונה</p>
          <p>
            טלפון:{" "}
            <a href="tel:+08888888888" className="text-[#093028]">
              08-9999181
            </a>
          </p>
          <p>
            מייל:{" "}
            <a
              href="mailto:contact@meshek-bashor.co.il"
              className="text-[#093028]"
            >
              contact@kezezplace.co.il
            </a>
          </p>

          {/* כפתור למפה אינטראקטיבית */}
          <iframe
            src="https://www.google.com/maps/embed/v1/place?q=רחוב+האורן+1,+ראשון+לציון&key=YOUR_GOOGLE_MAPS_API_KEY"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>

          <div className="flex space-x-4">
            {/* כפתורים לאפליקציות */}
            <a
              href="https://play.google.com/store/apps/details?id=com.example.app"
              target="_blank"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              <i className="fab fa-android"></i> Google Play
            </a>
            <a
              href="https://apps.apple.com/app/id123456789"
              target="_blank"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              <i className="fab fa-apple"></i> App Store
            </a>
          </div>
        </motion.div>

        {/* מפה לייב */}
        <motion.div
          className="w-full h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <iframe
            src="https://www.google.com/maps/embed/v1/place?q=רחוב+האורן+1,+ראשון+לציון&key=YOUR_GOOGLE_MAPS_API_KEY"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>

      {/* טופס יצירת קשר */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">שלח לנו פנייה</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="שם"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="דואר"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="טלפון"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="הודעה"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded"
            required
          ></textarea>

          <button
            type="submit"
            className="px-6 py-3 bg-[#093028] text-white rounded hover:bg-[#0b4339] transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "שולח..." : "שלח פנייה"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;
