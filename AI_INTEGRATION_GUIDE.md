# Guía de Integración de IA Real para el Chat

## Opciones de APIs de IA Disponibles

### 1. **OpenAI API (ChatGPT)** - RECOMENDADA ⭐
- **Costo**: ~$0.002 por 1K tokens (muy económico)
- **Ventajas**: 
  - Excelente calidad de respuestas
  - Fácil de integrar
  - Muy popular y bien documentada
- **Cómo obtenerla**: 
  1. Ve a https://platform.openai.com/
  2. Crea una cuenta
  3. Ve a "API Keys" y genera una nueva clave
  4. Agrega créditos a tu cuenta (mínimo $5)

### 2. **Google Gemini API** - GRATIS (con límites)
- **Costo**: Gratis hasta 60 solicitudes por minuto
- **Ventajas**: 
  - Completamente gratis para uso básico
  - Buena calidad
- **Cómo obtenerla**: 
  1. Ve a https://makersuite.google.com/app/apikey
  2. Crea una cuenta de Google
  3. Genera una API key gratuita

### 3. **Anthropic Claude API**
- **Costo**: Similar a OpenAI
- **Ventajas**: 
  - Muy buena calidad
  - Buenas respuestas largas
- **Cómo obtenerla**: 
  1. Ve a https://console.anthropic.com/
  2. Crea una cuenta
  3. Genera una API key

## ⚠️ IMPORTANTE: Seguridad de API Keys

**NUNCA** expongas tu API key directamente en el código JavaScript del frontend. Esto es un riesgo de seguridad porque cualquiera puede verla en el código fuente.

**Solución**: Necesitas crear un backend (servidor) que:
1. Guarde tu API key de forma segura
2. Reciba las preguntas del frontend
3. Haga la llamada a la API de IA
4. Devuelva la respuesta al frontend

## Opciones de Implementación

### Opción 1: Backend Simple (Node.js + Express) - RECOMENDADA
Crear un servidor simple que maneje las peticiones.

### Opción 2: Serverless Functions (Vercel/Netlify)
Usar funciones serverless para manejar las peticiones sin servidor completo.

### Opción 3: Proxy/CORS (Solo para desarrollo)
Para desarrollo local, puedes usar un proxy, pero NO para producción.

## Implementación Recomendada

Te voy a preparar el código para que puedas usar cualquiera de estas opciones fácilmente.

