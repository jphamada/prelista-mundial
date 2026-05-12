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
    // Obtener todos los votos
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

    // Cache desactivado para debug
    // res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    return res.status(200).json({
      totalVotos,
      stats,
      debug: { rows: selecciones ? selecciones.length : 0 }
    });
  } catch (error) {
    console.error('Error en Stats:', error);
    return res.status(500).json({ error: 'Error al obtener estadísticas', details: error.message });
  }
}
