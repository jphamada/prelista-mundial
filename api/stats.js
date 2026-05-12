import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    // Obtener todos los votos (Solo la columna jugadores por privacidad)
    const { data: selecciones, error } = await supabase
      .from('selecciones')
      .select('jugadores');

    if (error) throw error;

    const totalVotos = selecciones ? selecciones.length : 0;
    const conteoJugadores = {};

    // Procesar cada selección
    if (selecciones) {
      selecciones.forEach(sel => {
        if (sel.jugadores) {
          sel.jugadores.forEach(id => {
            conteoJugadores[id] = (conteoJugadores[id] || 0) + 1;
          });
        }
      });
    }

    // Convertir a porcentajes
    const stats = Object.keys(conteoJugadores).map(id => ({
      id: parseInt(id),
      count: conteoJugadores[id],
      percentage: totalVotos > 0 ? Math.round((conteoJugadores[id] / totalVotos) * 100) : 0
    }));

    // RE-HABILITAMOS EL CACHÉ (1 hora) como pediste para optimizar
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    return res.status(200).json({
      totalVotos,
      stats
    });
  } catch (error) {
    console.error('Error en Stats:', error);
    return res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
}
