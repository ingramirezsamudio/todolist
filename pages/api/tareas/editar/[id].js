import db from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { titulo, descripcion, estado } = req.body;

    try {
      // Actualizar la tarea en la base de datos
      const [result] = await db.query(
        'UPDATE tareas SET titulo = ?, descripcion = ?, estado = ? WHERE id = ?',
        [titulo, descripcion, estado, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }

      return res.status(200).json({ message: 'Tarea actualizada con éxito' });
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      return res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
