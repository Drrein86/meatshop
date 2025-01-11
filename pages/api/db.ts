import mysql from 'mysql2/promise';
import type { NextApiRequest, NextApiResponse } from 'next';

// יצירת Pool לניהול החיבורים למסד הנתונים
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL || '', // URI מתוך משתנה הסביבה
  waitForConnections: true,
  connectionLimit: 10, // הגדרת כמות חיבורים מקסימלית
  queueLimit: 0,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // בדיקה אם מדובר בשיטת GET
    if (req.method === 'GET') {
      // שאילתת SELECT למסד הנתונים
      const [rows] = await pool.query('SELECT * FROM products');
      res.status(200).json(rows); // החזרת התוצאה בפורמט JSON
    } else {
      // שיטה שאינה GET
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    // טיפול בשגיאות
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
}
