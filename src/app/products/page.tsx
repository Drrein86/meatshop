"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
}

const OrderPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedCategory, setSelectedCategory] =
    useState<string>("כל המוצרים");

  useEffect(() => {
    fetch("http://kezez-place.com/api/db", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  // קיבוץ מוצרים לפי קטגוריה
  const groupedProducts = categories.reduce((acc, category) => {
    if (category === "כל המוצרים") return acc;
    acc[category] = products.filter((product) => product.category === category);
    return acc;
  }, {} as Record<string, Product[]>);

  // שינוי כמות
  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };
  const handleScroll = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    handleScroll(category === "כל המוצרים" ? "all-products" : category);
  };

  return (
    <div dir="rtl" className="container mx-auto px-4 py-8">
      {/* כותרת הדף */}
      <div className="sticky top-[80px]  z-50 bg-white">
        <h1 className="  text-3xl font-bold mb-8 text-center">הזמנת משלוחים</h1>

        {/* תפריט הקטגוריות */}

        <div className="rounded-full bg-slate-200 overflow-x-auto whitespace-nowrap ">
          {categories.map((category) => (
            <button
              key={category}
              className={`inline-block px-4 py-2 border rounded-full text-gray-800 ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-black hover:text-white"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* מוצרים לפי קטגוריה */}
      <div id="all-products">
        {categories
          .filter((category) => category !== "כל המוצרים")
          .map((category) => (
            <div key={category} id={category} className="mb-12 mt-8">
              {/* כותרת קטגוריה */}
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedProducts[category]?.length > 0 ? (
                  groupedProducts[category].map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg shadow-md overflow-hidden bg-white"
                    >
                      <Image
                        src={product.image || "/upload/6.png"}
                        alt={product.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.description}
                      </p>
                      <p className="text-lg font-semibold text-green-600">
                        {product.price} ₪
                      </p>
                      <div className="mt-4">
                        <label htmlFor="quantity" className="block">
                          כמות:
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          value={quantities[product.id] || 1}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              Number(e.target.value)
                            )
                          }
                          className="w-16 p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <button
                        onClick={() =>
                          addToCart(product.id, quantities[product.id] || 1)
                        }
                        className="mt-4 bg-black text-white py-2 px-4 rounded-full w-full"
                      >
                        הוסף לעגלה
                      </button>
                    </div>
                  ))
                ) : (
                  <p>אין מוצרים זמינים בקטגוריה זו</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderPage;
