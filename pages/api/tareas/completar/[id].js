import db from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const [result] = await db.execute('UPDATE tareas SET estado = ? WHERE id = ?', ['completada', id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      return res.status(200).json({ message: 'Tarea completada exitosamente' });
    } catch (error) {
      console.error('Error completing task:', error);
      return res.status(500).json({ error: 'Error al completar la tarea' });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
