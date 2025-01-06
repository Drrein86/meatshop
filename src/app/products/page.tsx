"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import Link from "next/link";
import Image from "next/image";

// הגדרת טיפוס למוצר
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null; // תמונה עשויה להיות ריקה
}

const OrderPage = () => {
  const [products, setProducts] = useState<Product[]>([]); // שימוש בטיפוס מוצר
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [quantities, setQuantities] = useState<Record<number, number>>({}); // שמירת הכמויות בנפרד לכל מוצר

  const [categories, setCategories] = useState<string[]>([
    "כל המוצרים",
    "בקר",
    "טלה",
    "עופות",
    "אווז",
    "על האש",
    "בישול",
    "טחונים",
  ]);
  const { cart, addToCart } = useCart(); // גישה לפונקציות העגלה

  useEffect(() => {
    fetch("https://kezez-place.com/api/products", {
      method: "GET", // שיטה GET (לקרוא נתונים)
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response); // כדי לראות את התגובה
        return response.json();
      })
      .then((data) => {
        console.log(data); // הדפס את המוצרים לבדיקה
        setProducts(data);
      })
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  // סינון מוצרים לפי קטגוריה
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // עדכון כמות מוצר ספציפי
  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  return (
    <div dir="rtl" className="container ">
      {/* כותרת הדף */}
      <h1 className="text-3xl font-bold mb-8">הזמנת משלוחים</h1>

      {/* סינון לפי קטגוריה */}
      <div className="mb-8 flex gap-4">
        <div className="flex flex-col space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 border rounded ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() =>
                setSelectedCategory(
                  category === "כל המוצרים" ? "all" : category
                )
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* הצגת המוצרים */}
        <div className="w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                className="border p-4 rounded shadow-md hover:shadow-lg"
                href={`/products/${product.id}`}
              >
                {/* תמונה של המוצר */}

                <Image
                  src={product.image || "/upload/6.png"} // תמונה ברירת מחדל אם אין תמונה
                  alt={product.name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {product.description}
                </p>
                <p className="text-lg font-semibold">{product.price} ₪</p>
                <div className="mt-4">
                  <label htmlFor="quantity" className="block">
                    כמות:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantities[product.id] || 1} // מצגת הכמות עבור המוצר הספציפי
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(product.id, Number(e.target.value))
                    }
                    className="w-16 p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  onClick={() =>
                    addToCart(product.id, quantities[product.id] || 1)
                  }
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full w-full"
                >
                  הוסף לעגלה
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
