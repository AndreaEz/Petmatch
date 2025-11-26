# 🤖 Configuración del Chat con IA (Gemini)

Esta guía te ayudará a configurar el chat con IA que utiliza la API de Google Gemini.

## 📋 Requisitos Previos

1. Una cuenta de Google (para acceder a Google AI Studio)
2. Un proyecto desplegado en Vercel (o ejecutándose localmente con soporte para serverless functions)

## 🔑 Paso 1: Obtener la API Key de Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Get API Key"** o **"Create API Key"**
4. Selecciona un proyecto existente o crea uno nuevo
5. Copia la API key que se genera (guárdala de forma segura, no la compartas públicamente)

## 🚀 Paso 2: Configurar en Vercel

### Opción A: Desde el Dashboard de Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en **Settings**
3. En el menú lateral, selecciona **Environment Variables**
4. Haz clic en **Add New**
5. Completa los campos:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Pega tu API key de Gemini
   - **Environment:** Selecciona todas las opciones (Production, Preview, Development)
6. Haz clic en **Save**
7. **IMPORTANTE:** Ve a la pestaña **Deployments** y haz clic en los tres puntos (⋯) del último deployment
8. Selecciona **Redeploy** para aplicar los cambios

### Opción B: Desde la CLI de Vercel

```bash
# Instala Vercel CLI si no lo tienes
npm i -g vercel

# Inicia sesión
vercel login

# Agrega la variable de entorno
vercel env add GEMINI_API_KEY

# Cuando te pregunte, pega tu API key
# Selecciona todos los ambientes (Production, Preview, Development)

# Redespliega
vercel --prod
```

## 🧪 Paso 3: Probar el Chat

1. Una vez que hayas configurado la API key y redesplegado, abre tu aplicación
2. Haz clic en el botón flotante del chat IA (ícono de robot en la esquina inferior derecha)
3. Escribe un mensaje de prueba, por ejemplo: "Hola, ¿cómo funciona la adopción?"
4. Deberías recibir una respuesta del asistente IA

## 🔧 Solución de Problemas

### El chat no responde / Error de conexión

1. **Verifica que la API key esté configurada:**
   - Ve a Vercel Dashboard > Settings > Environment Variables
   - Confirma que `GEMINI_API_KEY` existe y tiene un valor

2. **Verifica que hayas redesplegado:**
   - Las variables de entorno solo se aplican en nuevos deployments
   - Ve a Deployments y crea un nuevo deployment

3. **Verifica los logs de Vercel:**
   - Ve a tu proyecto en Vercel
   - Haz clic en **Functions** en el menú lateral
   - Revisa los logs de `/api/chat` para ver errores específicos

4. **Verifica la consola del navegador:**
   - Abre las herramientas de desarrollador (F12)
   - Ve a la pestaña **Console**
   - Busca errores relacionados con la llamada a la API

### Error: "GEMINI_API_KEY no está configurada"

- Asegúrate de que la variable de entorno esté configurada en Vercel
- Verifica que hayas redesplegado después de agregar la variable
- Confirma que el nombre de la variable sea exactamente `GEMINI_API_KEY` (sin espacios, mayúsculas correctas)

### Error: "Error al comunicarse con el servicio de IA"

- Verifica que tu API key de Gemini sea válida
- Confirma que tengas créditos/quota disponible en Google AI Studio
- Revisa los logs de Vercel para ver el error específico de la API de Gemini

## 📝 Notas Importantes

- **Seguridad:** Nunca expongas tu API key públicamente. No la incluyas en el código fuente ni en commits de Git.
- **Límites:** La API de Gemini tiene límites de uso. Revisa la documentación de Google para conocer los límites de tu plan.
- **Costo:** Aunque Gemini tiene un tier gratuito, revisa los precios si esperas mucho tráfico.

## 🎯 Desarrollo Local (Opcional)

Si quieres probar el chat localmente antes de desplegar:

1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta `vercel dev` en la raíz del proyecto
3. Esto iniciará un servidor local que simula el entorno de Vercel
4. Las variables de entorno se pueden configurar en un archivo `.env.local` (no lo subas a Git)

## 📚 Recursos Adicionales

- [Documentación de Gemini API](https://ai.google.dev/docs)
- [Documentación de Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Google AI Studio](https://makersuite.google.com/)

---

¿Necesitas ayuda? Abre un issue en el repositorio con los detalles del error que estás experimentando.

