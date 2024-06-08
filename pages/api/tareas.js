import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist'
});

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const query = 'SELECT * FROM tareas';
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las tareas' });
    } else {
      res.status(200).json(results);
    }
  });
}
