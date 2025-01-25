"use client";

import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productCategory, setProductCategory] = useState(""); // קטגוריה
  const [productDiscount, setProductDiscount] = useState(0); // הנחה
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", String(productPrice));
    formData.append("stock", String(productStock));
    formData.append("category", productCategory);
    formData.append("discount", String(productDiscount));

    try {
      let imageUrl = "";

      // אם יש תמונה, שלח אותה לשרת
      if (productImage) {
        formData.append("image", productImage); // הוספת התמונה ל-FormData

        // שליחת תמונה לשרת
        const uploadResponse = await axios.post(
          "https://kezez-place.com/api/db",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // הגדרת Content-Type כ-multipart/form-data
            },
          }
        );

        // אם התמונה הועלתה בהצלחה, שמור את ה-URL שלה
        if (uploadResponse.status === 200 && uploadResponse.data.imageUrl) {
          imageUrl = uploadResponse.data.imageUrl; // URL של התמונה מהשרת
          console.log("Image URL:", imageUrl);
        } else {
          throw new Error("Image upload failed");
        }
      }

      // שליחת הנתונים לשרת לאחר ההעלאה
      const productData = new FormData();
      productData.append("name", productName);
      productData.append("description", productDescription);
      productData.append("price", String(productPrice));
      productData.append("stock", String(productStock));
      productData.append("category", productCategory);
      productData.append("discount", String(productDiscount));
      if (productImage) {
        productData.append("image", productImage); // הוספת URL של התמונה (לא את התמונה עצמה)
      }
      console.log("Form Data being sent:", formData); // הוספת הדפסת תוכן ה-formData

      const response = await axios.post(
        "https://kezez-place.com/api/db",

        {
          headers: {
            "Content-Type": "multipart/form-data", // גם פה, המידע מועבר ב-multipart
          },
        }
      );

      if (response.status === 200) {
        alert("המוצר נוסף בהצלחה!");
        // איפוס השדות לאחר הוספה מוצלחת
        setProductName("");
        setProductDescription("");
        setProductPrice(0);
        setProductStock(0);
        setProductCategory("");
        setProductDiscount(0);
        setProductImage(null);
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(
        "שגיאה לא ידועה: " +
          (error instanceof Error ? error.message : "לא ניתן לקרוא את השגיאה")
      );
    }
  };

  return (
    <div dir="rtl" className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">ניהול מוצרים</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="שם המוצר *"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="תיאור המוצר"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div>
          <label className="block font-semibold mb-1">מחיר המוצר (ש"ח) *</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">כמות במלאי *</label>
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">קטגוריה</label>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">בחר קטגוריה</option> {/* ערך ברירת מחדל */}
            <option value="בקר">בקר</option>
            <option value="עוף">טלה</option>
            <option value="הודו">עופות</option>
            <option value="הודו">אווז</option>
            <option value="הודו">על האש</option>
            <option value="הודו">בישול</option>
            <option value="הודו">טחונים</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">הנחה</label>
          <input
            type="number"
            value={productDiscount}
            onChange={(e) => setProductDiscount(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">תמונת המוצר</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded"
            name="image"
          />
        </div>
        {productImage && (
          <img
            src={URL.createObjectURL(productImage)}
            alt="Product"
            className="w-52 h-72 mx-auto mt-3"
          />
        )}
        <button
          name="submit"
          onClick={handleAddProduct}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition"
        >
          הוסף מוצר
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
