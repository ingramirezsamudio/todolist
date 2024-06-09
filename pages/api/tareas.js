import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

 try {
    const { estado } = req.query; // Obtener el estado de los parámetros de consulta
    let query = 'SELECT * FROM tareas';
    const params = [];

    if (estado && estado !== 'todo') {
      query += ' WHERE estado = ?';
      params.push(estado);
    }

    const [results] = await db.query(query, params);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
}
