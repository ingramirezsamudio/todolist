import db from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const [result] = await db.execute('DELETE FROM tareas WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      return res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
      console.error('Error deleting task:', error);
      return res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
