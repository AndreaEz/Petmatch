// API endpoint para el chat con Gemini
// Esta función se ejecuta como serverless function en Vercel

module.exports = async (req, res) => {
  // Configurar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir métodos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'El mensaje no puede estar vacío' });
    }

    // Obtener la API key de Gemini desde las variables de entorno
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY no está configurada');
      return res.status(500).json({ 
        error: 'Error de configuración del servidor. Por favor, contacta al administrador.' 
      });
    }

    // Construir el historial de conversación para el contexto
    const historyForAPI = conversationHistory.slice(-10).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Construir el prompt con contexto sobre PetMatch
    const systemPrompt = `Eres un asistente virtual amigable y profesional para PetMatch, una plataforma de adopción de mascotas. 
Tu objetivo es ayudar a los usuarios con:
- Información sobre adopción de mascotas
- Guía sobre el proceso de adopción
- Respuestas sobre cuidado de mascotas
- Ayuda general con la plataforma

Sé amigable, empático y profesional. Responde en español. Si no sabes algo, admítelo honestamente.`;

    // Preparar el contenido para la API de Gemini
    const contents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      ...historyForAPI,
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    // Llamar a la API de Gemini
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error de Gemini API:', errorData);
      return res.status(response.status).json({ 
        error: 'Error al comunicarse con el servicio de IA. Por favor, intenta de nuevo.' 
      });
    }

    const data = await response.json();

    // Extraer la respuesta de Gemini
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const reply = data.candidates[0].content.parts[0].text;
      
      return res.status(200).json({ 
        reply: reply,
        success: true
      });
    } else {
      console.error('Respuesta inesperada de Gemini:', data);
      return res.status(500).json({ 
        error: 'No se pudo obtener una respuesta válida del servicio de IA.' 
      });
    }

  } catch (error) {
    console.error('Error en el handler del chat:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor. Por favor, intenta de nuevo más tarde.' 
    });
  }
};

