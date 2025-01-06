"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../components/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const params = useParams();

  const id = params?.id;

  useEffect(() => {
    if (id && typeof id === "string") {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `https://kezez-place.com/api/products/${id}`
          );
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (!id || typeof id !== "string") {
    return (
      <div className="text-center text-lg text-gray-500">
        מזהה המוצר חסר או לא תקין
      </div>
    );
  }

  if (!product)
    return <div className="text-center text-lg text-gray-500">טעינה...</div>;

  return (
    <div dir="rtl" className="max-w-screen-lg mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
        <div className="flex flex-col justify-between">
          <h2 className="text-3xl font-bold text-[#093028]">{product.name}</h2>
          <p className="text-lg text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl font-semibold text-[#093028] mt-4">
            ₪{product.price}
          </p>

          <div className="mt-6">
            <label htmlFor="quantity" className="block text-lg font-medium">
              כמות:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#093028] focus:border-[#093028]"
            />
          </div>

          <button
            onClick={() => addToCart(product.id, quantity)}
            className="mt-6 px-6 py-2 bg-[#093028] text-white font-semibold rounded-lg hover:bg-[#0b4339] transition duration-300"
          >
            הוסף לעגלה
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
