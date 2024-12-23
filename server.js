const express = require("express");
require('dotenv').config();

const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3001;

// הגדרת CORS עם מקור ספציפי - "http://localhost:3000"
const corsOptions = {
  origin: 'http://localhost:3000', // רק מקורות מהכתובת הזו יוכלו לגשת
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors()); // הגדרת ה-CORS לפני כל שימוש אחר ב-app


// קישור למסד נתונים
const dbUrl = process.env.DATABASE_URL;

const db = dbUrl
  ? mysql.createConnection(dbUrl) // אם יש DATABASE_URL
  : mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Ee-2024!",
      database: "my_shop",
    });
// חיבור למסד נתונים
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});
// טוען את ההגדרות מהסביבה
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});







// העלאת תמונה ל-Cloudinary
app.post("/upload", (req, res) => {
  const { image } = req.body; // קבלת התמונה מבקשה (Base64 או URL ישיר)
  
  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }
// הגדרת middleware לקריאת נתונים ב-JSON
app.use(bodyParser.json());

  // העלאת התמונה ל-Cloudinary
  cloudinary.uploader.upload(image, (error, result) => {
    if (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({ message: "Error uploading to Cloudinary" });
    }

    console.log("Uploaded image URL:", result.secure_url);
    res.status(200).json({ imageUrl: result.secure_url });
  });
});






const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
if (!cloudName) {
  console.error("Cloudinary Cloud Name is not set");
} else {
  console.log(`Cloudinary Cloud Name: ${cloudName}`);
}




app.post("/admin/products", (req, res) => {
  const { image, name, description, price, stock, category, discount } = req.body;

  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }

  // העלאת התמונה ל-Cloudinary
  cloudinary.uploader.upload(image, (error, result) => {
    if (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({ message: "Error uploading to Cloudinary" });
    }

    const imageUrl = result.secure_url;
    console.log("Uploaded image URL:", imageUrl);

    if (!name || !price || stock === undefined) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // הגדרת השאילתה
    const query = "INSERT INTO Products (name, description, price, image, stock, discount, category) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      name,
      description || "",
      price,
      imageUrl,
      stock,
      discount || 0.00,  // אם לא סופקה הנחה, ישתמש בברירת מחדל 0.00
      category || "",  // אם לא סופקה קטגוריה, תשאיר null או ערך ברירת מחדל
    ];

    // שליחת השאילתה למסד הנתונים
    db.query(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to add product", error: err });
      }
      res.status(200).json({ message: "Product added successfully", productId: result.insertId });
    });
  });
});


 



// עריכת מוצר
app.put("/admin/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url, discount } = req.body;

  const query = "UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ?, discount = ? WHERE id = ?";
  const values = [name, description, price, category, image_url || "", discount || 0.00, id];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to update product" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  });
});

// מחיקת מוצר
app.delete("/admin/products/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const query = "DELETE FROM Products WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete product", error: err });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  });
});

// הצגת כל המוצרים
app.get("/products", (req, res) => {
  const query = "SELECT * FROM Products";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch products", error: err });
    }
    res.status(200).json(results);
  });
});

// הצגת מוצר לפי מזהה
app.get("/products/:id", (req, res) => {
  const productId = req.params.id; // מקבל את מזהה המוצר מתוך הכתובת
  const query = "SELECT * FROM Products WHERE id = ?"; // חיפוש המוצר לפי מזהה
  
  db.query(query, [productId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch product", error: err });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]); // מחזירים את המוצר הספציפי
    } else {
      res.status(404).json({ message: "Product not found" }); // אם לא נמצא
    }
  });
});




// יצירת הזמנה חדשה
app.post("/api/orders", (req, res) => {
  const { user_id, cart, total_price } = req.body;

  if (!user_id || !cart || cart.length === 0) {
    return res.status(400).json({ message: "User ID and cart are required" });
  }

  const query = "INSERT INTO Orders (user_id, total_price) VALUES (?, ?)";
  db.query(query, [user_id, total_price || 0], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create order", error: err });
    }

    const orderId = result.insertId;
    const itemsQuery =
      "INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES ?";
    const itemsValues = cart.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    db.query(itemsQuery, [itemsValues], (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to add order items", error: err });
      }

      res.status(200).json({ message: "Order placed successfully", orderId });
    });
  });
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});