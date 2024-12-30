"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialsCarousel = () => {
  const reviews = [
    {
      name: "יונתן לוי",
      feedback: "שירות מדהים ואיכות בשר שלא מוצאים בשום מקום!",
    },
    {
      name: "נועה כהן",
      feedback: "משלוח מהיר והבשר הכי טעים שאכלנו! תודה רבה!",
    },
    {
      name: "אלעד פרידמן",
      feedback: "איכות ללא פשרות ושירות יוצא מן הכלל! ממליץ בחום.",
    },
    {
      name: "שירה גל",
      feedback: "מגוון מוצרים מדהים, תמיד נהנים להזמין מהם!",
    },
    {
      name: "דני יוסף",
      feedback: "פשוט מצוין. הקצביה הכי טובה שנתקלתי בה!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto py-12">
      <h2 className="text-center text-white text-4xl font-bold mb-10">
        מה הלקוחות שלנו אומרים
      </h2>
      <div className="relative flex items-center">
        {/* כפתור שמאלה */}
        <button
          onClick={handlePrev}
          className="absolute left-0 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* כרטיס */}
        <div className="w-full flex justify-center items-center overflow-hidden">
          <div
            className="w-full min-w-[300px] max-w-[300px] bg-white opacity-85 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-500"
            style={{ transform: `translateX(0)` }}
          >
            <div className="flex mb-4">
              {Array(5)
                .fill(0)
                .map((_, starIndex) => (
                  <FaStar key={starIndex} className="text-yellow-500" />
                ))}
            </div>
            <p className="text-gray-700 italic mb-4">
              "{reviews[currentIndex].feedback}"
            </p>
            <h4 className="text-gray-900 font-semibold">
              {reviews[currentIndex].name}
            </h4>
          </div>
        </div>

        {/* כפתור ימינה */}
        <button
          onClick={handleNext}
          className="absolute right-0 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
