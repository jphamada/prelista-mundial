import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, jugadores } = req.body;

  // Validar variables de entorno
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error('Faltan variables de entorno en Vercel');
    return res.status(500).json({ error: 'Configuración del servidor incompleta (faltan env vars)' });
  }

  // Validar datos básicos
  if (!email || !jugadores || !Array.isArray(jugadores)) {
    return res.status(400).json({ error: 'Datos incompletos o formato incorrecto' });
  }

  // Inicializar Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    const { error } = await supabase
      .from('selecciones')
      .insert([{ email, jugadores }]);

    if (error) {
      // Manejar error de email duplicado (voto único)
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Este correo ya ha registrado su voto.' });
      }
      throw error;
    }

    return res.status(200).json({ message: '¡Voto registrado con éxito!' });
  } catch (error) {
    console.error('Error en Supabase:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
