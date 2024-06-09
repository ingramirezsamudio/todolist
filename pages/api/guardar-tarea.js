import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { titulo, descripcion } = req.body;

  try {
    const [results] = await db.query('INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)', [titulo, descripcion]);
    res.status(200).json({ message: 'Tarea guardada exitosamente', id: results.insertId });
  } catch (error) {
    console.error('Error al guardar la tarea:', error);
    res.status(500).json({ message: 'Error al guardar la tarea' });
  }
}
