import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Ee-2024!",
  database: process.env.DB_NAME || "my_shop",
};

// יצירת בריכת חיבורים
const pool = mysql.createPool(dbConfig);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // טיפול ב-CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end(); // סיום בקשות OPTIONS ללא שגיאות
    return;
  }

  if (req.method === "GET") {
    try {
      // שאילתת SELECT לטבלה products
      const [rows] = await pool.execute("SELECT * FROM products");

      // שליחת הנתונים ללקוח
      res.status(200).json(rows);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch products", details: error.message });
    }
  } else {
    // שיטות HTTP שאינן נתמכות
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
