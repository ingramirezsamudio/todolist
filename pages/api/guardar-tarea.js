import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { titulo, descripcion } = req.body;

  const query = 'INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)';
  connection.query(query, [titulo, descripcion], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al guardar la tarea' });
    } else {
      res.status(200).json({ message: 'Tarea guardada exitosamente' });
    }
  });
}
