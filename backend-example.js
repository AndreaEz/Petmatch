/**
 * EJEMPLO DE BACKEND PARA CHAT CON IA
 * 
 * Este es un ejemplo de servidor Node.js con Express que maneja las peticiones
 * del chat con IA de forma segura.
 * 
 * INSTRUCCIONES:
 * 1. Instala Node.js desde https://nodejs.org/
 * 2. En la carpeta del proyecto, ejecuta: npm install express cors dotenv
 * 3. Crea un archivo .env con tu API key: OPENAI_API_KEY=tu_api_key_aqui
 * 4. Ejecuta: node backend-example.js
 * 5. El servidor estará en http://localhost:3000
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ===========================================
// OPCIÓN 1: OpenAI API (ChatGPT)
// ===========================================
async function callOpenAI(message) {
    const OpenAI = require('openai');
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // o "gpt-4" para mejor calidad (más caro)
            messages: [
                {
                    role: "system",
                    content: "Eres un asistente experto en cuidado de mascotas. Proporciona consejos útiles, prácticos y seguros sobre alimentación, salud, entrenamiento, adopción y cuidado general de mascotas. Sé amigable, profesional y específico en tus respuestas."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error con OpenAI:', error);
        throw error;
    }
}

// ===========================================
// OPCIÓN 2: Google Gemini API (GRATIS)
// ===========================================
async function callGemini(message) {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY no está configurada en el archivo .env');
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // Prompt mejorado para el asistente de mascotas
        const systemPrompt = `Eres un asistente experto en cuidado de mascotas. Proporciona consejos útiles, prácticos y seguros sobre alimentación, salud, entrenamiento, adopción y cuidado general de mascotas. Sé amigable, profesional y específico en tus respuestas. Responde en español.`;
        
        const prompt = `${systemPrompt}\n\nPregunta del usuario: ${message}\n\nResponde de manera clara y útil:`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error con Gemini:', error);
        throw error;
    }
}

// ===========================================
// ENDPOINT PRINCIPAL
// ===========================================
app.post('/api/chat', async (req, res) => {
    try {
        const { message, apiType } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensaje requerido' });
        }

        let response;

        switch (apiType) {
            case 'openai':
                if (!process.env.OPENAI_API_KEY) {
                    return res.status(500).json({ error: 'OpenAI API key no configurada' });
                }
                response = await callOpenAI(message);
                break;

            case 'gemini':
                if (!process.env.GEMINI_API_KEY) {
                    return res.status(500).json({ error: 'Gemini API key no configurada' });
                }
                response = await callGemini(message);
                break;

            default:
                return res.status(400).json({ error: 'Tipo de API no válido' });
        }

        res.json({ response });
    } catch (error) {
        console.error('Error en /api/chat:', error);
        res.status(500).json({ 
            error: 'Error al procesar la solicitud',
            message: error.message 
        });
    }
});

// Endpoint de salud
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📝 Endpoint de chat: http://localhost:${PORT}/api/chat`);
    console.log(`💡 Asegúrate de tener tu API key en el archivo .env`);
});

