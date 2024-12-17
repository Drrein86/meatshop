"use client";
import React, { useState } from "react";
import { useCart } from "./CartContext"; // גישה לסטטוס העגלה

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
}

const CartPopup = () => {
  const { cart, removeFromCart } = useCart(); // גישה לעגלה
  const [products, setProducts] = React.useState<Product[]>([]); // שמירת המוצרים
  const [isOpen, setIsOpen] = useState<boolean>(true); // מצב הפופאפ (פתוח/סגור)

  React.useEffect(() => {
    // נניח שיש לך API שיכול להביא את המוצרים על פי ID
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  // חיפוש המוצרים בעגלה לפי ID
  const cartProducts = cart
    .map((cartItem) => {
      const product = products.find(
        (product) => product.id === cartItem.productId
      );
      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter(Boolean); // פילטר להוריד ערכים null

  // חישוב הסה"כ של המחיר
  const totalPrice = cartProducts.reduce((total, product) => {
    if (product) {
      return total + product.price * product.quantity;
    }
    return total;
  }, 0);

  // פונקציה לסגירת הפופאפ
  const closePopup = () => {
    setIsOpen(false);
  };
  // אם הפופאפ סגור, לא מציגים אותו
  if (!isOpen) return null;
  return (
    <div
      dir="rtl"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">העגלה שלך</h2>
        <ul>
          {cartProducts.length === 0 ? (
            <p>העגלה ריקה</p>
          ) : (
            cartProducts.map(
              (product) =>
                // מכיוון שיכולה להיות null אחרי הפילטר, נשים בדיקה לפניה
                product && (
                  <li
                    key={product.id}
                    className="flex items-center mb-4 border-b pb-4"
                  >
                    {/* תמונה קטנה של המוצר עם מסגרת עגולה */}
                    <img
                      src={product.image || "/6.png"} // תמונה ברירת מחדל
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product.category}
                      </p>
                      <p className="text-lg font-semibold">{product.price} ₪</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">כמות: {product.quantity}</span>
                    </div>
                    {/* כפתור "הסר" */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="ml-4 bg-red-500 text-white py-2 px-4 rounded-full"
                    >
                      הסר
                    </button>
                  </li>
                )
            )
          )}
        </ul>

        {/* הצגת סה"כ */}
        <div className="mt-4 flex justify-between items-center">
          <h3 className="font-bold text-lg">סה"כ: {totalPrice} ₪</h3>
        </div>

        {/* כפתור לתשלום */}
        <div className="mt-4">
          <button
            onClick={() => console.log("Proceed to checkout")} // הוסף לוגיקה לתשלום
            className="bg-green-500 text-white py-2 px-4 rounded-full w-full"
          >
            המשך לתשלום
          </button>
        </div>

        {/* כפתור לסגירת הפופאפ */}
        <button
          onClick={closePopup} // סגירת הפופאפ
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full w-full"
        >
          סגור
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
