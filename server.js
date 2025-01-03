const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3001;

// הגדרת CORS עם מקור ספציפי - "http://localhost:3000"
const corsOptions = {
  origin: 'https://localhost:3000', // רק מקורות מהכתובת הזו יוכלו לגשת
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors()); // הגדרת ה-CORS לפני כל שימוש אחר ב-app
// חשיפת תיקיית upload כסטטית
app.use('/upload', express.static(path.join(__dirname, 'public/upload')));

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






// מסלול להעלאת תמונה
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const filePath = path.join('public/upload', req.file.filename);

  const imageUrl =`https://localhost:${port}/upload/${req.file.filename}`;
  console.log("image uploaded to:",imageUrl);
  res.status(200).json({ imageUrl });

});

// העלאת מוצר חדש
app.post("/admin/products", upload.single("image"), (req, res) => {
  console.log("Request body:", req.body); // הדפסה של גוף הבקשה

  console.log("File received:", req.file);  // הדפסת מידע על הקובץ שהתקבל
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const { name, description, price, stock, category, discount } = req.body;
  const image = req.file ? `https://localhost:${port}/upload/${req.file.filename}` : null;

  console.log("Image URL:", image); // הדפסה לקונסול של כתובת התמונה


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
    discount || 0.00,  // אם לא סופקה הנחה, ישתמש בברירת מחדל 0.00
    category || "",  // אם לא סופקה קטגוריה, תשאיר null או ערך ברירת מחדל
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to add product", error: err });
    }
    res.status(200).json({ message: "Product added successfully", productId: result.insertId });
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
  console.log(`Server is running on https://localhost:${port}`);
});