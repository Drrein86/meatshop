"use client";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

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

  const [currentReviews, setCurrentReviews] = useState(reviews);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviews((prevReviews) => {
        const updatedReviews = [...prevReviews];
        const removedReview = updatedReviews.pop();
        if (removedReview) {
          updatedReviews.unshift(removedReview);
        }
        return updatedReviews;
      });
    }, 2000); // מעבר כל 2 שניות

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden  py-12">
      <h2 className="text-center text-white text-4xl font-bold mb-10">
        מה הלקוחות שלנו אומרים
      </h2>
      <div className="flex justify-center items-center">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(0)` }}
        >
          {currentReviews.map((review, index) => (
            <div
              key={index}
              className="w-full min-w-[300px] max-w-[300px] bg-white opacity-85 rounded-lg shadow-lg p-6 mx-4 flex flex-col items-center text-center"
            >
              <div className="flex mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => (
                    <FaStar key={starIndex} className="text-yellow-500" />
                  ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{review.feedback}"</p>
              <h4 className="text-gray-900 font-semibold">{review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
