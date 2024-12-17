"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"; // למעבר לדף המוצר
import { useCart } from "./CartContext";
import { FaSearch } from "react-icons/fa"; // אייקון חיפוש
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

function SearchComponent() {
  const [query, setQuery] = useState(""); // שדה החיפוש
  const [results, setResults] = useState<Product[]>([]); // תוצאות החיפוש
  const { addToCart } = useCart(); // הוספת מוצר לעגלה
  const router = useRouter(); // למעבר לדף המוצר
  const searchRef = useRef<HTMLDivElement>(null); // רפרנס לאזור החיפוש

  // פונקציה לביצוע קריאה ל-API
  const fetchProducts = async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/products?search=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("לא ניתן למשוך את המוצרים");
      }

      const data = await response.json();
      console.log("Fetched data from API:", data); // בדוק אם `image` קיים באובייקטים

      // בדיקה אם לכל מוצר יש שדה `image` ולוודא שהוא לא `undefined`
      data.forEach((product: Product) => {
        console.log(`Product ID: ${product.id}, Image: ${product.image}`);
      });

      return data.filter((product: Product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  // חיפוש בזמן אמת
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length > 0) {
      const products = await fetchProducts(query);
      setResults(products);
    } else {
      setResults([]); // אם השדה ריק או קצר מדי, לא להציג תוצאות
    }
  };

  // סגירת חלון החיפוש בלחיצה מחוץ
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setResults([]); // סוגר את חלון התוצאות
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-lg mx-auto">
      {/* שדה החיפוש עם אייקון חיפוש */}

      <div className="flex items-center border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <input
          type="text"
          placeholder="חפש מוצר..."
          value={query}
          onChange={handleSearch}
          className="w-full p-2 pr-10 text-lg text-gray-700 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={() => {}}
          className="p-2 bg-[#093028] text-white rounded-r-lg hover:bg-[#0b4339] transition"
        >
          <FaSearch size={18} />
        </button>
      </div>

      {/* הצגת התוצאות */}
      <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-2 z-10">
        {results.length > 0 && (
          <ul className="max-h-60 overflow-y-auto">
            {results.map((product) => (
              <Link
                key={product.id}
                className="flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={
                  () => {
                    setResults([]); // סוגר את חלון התוצאות
                    setQuery(""); // מנקה את שדה החיפוש
                  } // מעבר לדף המוצר
                }
                href={`/products/${product.id}`}
              >
                <div className="p-2 hover:bg-slate-100 flex items-center border-b border-gray-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-auto h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-500">₪{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        )}
        {query.length > 2 && results.length === 0 && (
          <div className="p-4 text-center text-gray-500">לא נמצאו תוצאות</div>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
