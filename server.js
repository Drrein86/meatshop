const mysql = require("mysql2/promise");
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3001;

const corsOptions = {
  origin: [
    'http://localhost:3000', // פיתוח
    'https://kezez-place.com' // פרודקשן
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ודא ש-OPTIONS כלול
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
};

app.use(cors(corsOptions)); // אפשר גישה באמצעות CORS לכל הבקשות
app.options("*", cors(corsOptions)); // טיפול בבקשות OPTIONS


// חשיפת תיקיית upload כסטטית
app.use("/upload", express.static(path.join(__dirname, "public/upload"), { maxAge: "1d" }));

// קישור למסד נתונים
const dbUrl = process.env.DATABASE_URL;

let db;  // יצירת משתנה גלובלי לחיבור

// חיבור למסד נתונים
async function connectToDatabase() {
  try {
    db = await mysql.createConnection(process.env.DATABASE_URL);  // יצירת חיבור למסד
    console.log("Connected to MySQL database");
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);  // עצירת השרת אם החיבור נכשל
  }
}

// הגדרת Multer לשמירת תמונות בתיקייה
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload"); // תקייה לשמירת התמונות
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix); // שם קובץ ייחודי
  },
});
const upload = multer({ storage: storage });

// הגדרת middleware לקריאת נתונים ב-JSON
app.use(bodyParser.json());

// חיבור למסד נתונים
connectToDatabase().then(() => {
  // העלאת השרת רק לאחר חיבור למסד
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on https://localhost:${port}`);
  });
});

// פעולה להוספת מוצר
app.post("/api/db", upload.single("image"), async (req, res) => {
  console.log("Request body:", req.body);
  console.log("File received:", req.file);

  const { name, description, price, stock, category, discount } = req.body;
  const image = req.file ? `${process.env.BASE_URL}/api/db/${req.file.filename}` : null;

  if (!name || !price || stock === undefined) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const query =
    "INSERT INTO Products (name, description, price, image, stock, discount, category) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    name,
    description || "",
    price,
    image,
    stock,
    discount || 0.00,
    category || "",
  ];

  try {
    const [result] = await db.execute(query, values);
    res.status(200).json({ message: "Product added successfully", productId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err });
  }
});

// עריכת מוצר
app.put("/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url, discount } = req.body;

  const query = "UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ?, discount = ? WHERE id = ?";
  const values = [name, description, price, category, image_url || "", discount || 0.00, id];

  try {
    await db.execute(query, values);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

// מחיקת מוצר
app.delete("/admin/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const query = "DELETE FROM Products WHERE id = ?";
  try {
    await db.execute(query, [id]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err });
  }
});

// הצגת כל המוצרים
app.get("/api/db", async (req, res) => {
  const query = "SELECT * FROM Products";
  try {
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err });
  }
});

// הצגת מוצר לפי מזהה
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const query = "SELECT * FROM Products WHERE id = ?";
  
  try {
    const [results] = await db.execute(query, [productId]);
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err });
  }
});

// יצירת הזמנה חדשה
app.post("/api/orders", async (req, res) => {
  const { user_id, cart, total_price } = req.body;

  if (!user_id || !cart || cart.length === 0) {
    return res.status(400).json({ message: "User ID and cart are required" });
  }

  const query = "INSERT INTO Orders (user_id, total_price) VALUES (?, ?)";
  try {
    const [result] = await db.execute(query, [user_id, total_price || 0]);
    const orderId = result.insertId;

    const itemsQuery =
      "INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES ?";
    const itemsValues = cart.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    await db.query(itemsQuery, [itemsValues]);
    res.status(200).json({ message: "Order placed successfully", orderId });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err });
  }
});

console.log("Database URL:", process.env.DATABASE_URL);
console.log("BASE URL:", process.env.BASE_URL);
console.log("Node Environment:", process.env.NODE_ENV);
