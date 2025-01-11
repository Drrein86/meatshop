import mysql from 'mysql2';

const connection = mysql.createConnection({
  uri: process.env.DATABASE_URL // שמור את ה-URI שלך במשתנה סביבה
});

connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

export default function handler(req, res) {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(results);
    }
  });
}
