# 🚀 Instrucciones para Configurar Chat con IA Real

## Opción 1: OpenAI (ChatGPT) - RECOMENDADA

### Paso 1: Obtener API Key
1. Ve a https://platform.openai.com/
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys" en el menú
4. Haz clic en "Create new secret key"
5. Copia la clave (empieza con `sk-`)
6. Agrega créditos a tu cuenta (mínimo $5)

### Paso 2: Configurar Backend
```bash
# 1. Instala Node.js desde https://nodejs.org/

# 2. En la carpeta del proyecto, instala las dependencias
npm install

# 3. Instala el SDK de OpenAI
npm install openai

# 4. Crea el archivo .env
cp .env.example .env

# 5. Edita .env y agrega tu API key
# OPENAI_API_KEY=sk-tu_api_key_aqui

# 6. Inicia el servidor
npm start
```

### Paso 3: Configurar Frontend
1. Abre `script.js`
2. Busca `const AI_CONFIG = {`
3. Cambia:
   ```javascript
   const AI_CONFIG = {
       enabled: true,
       apiType: 'openai',
       apiUrl: 'http://localhost:3000/api/chat', // Cambia si usas otro puerto
       useBackend: true
   };
   ```

---

## Opción 2: Google Gemini (GRATIS) ⭐

### Paso 1: Obtener API Key (GRATIS)
1. Ve a https://makersuite.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia la clave generada

### Paso 2: Configurar Backend
```bash
# 1. Instala Node.js desde https://nodejs.org/

# 2. Instala las dependencias
npm install

# 3. Instala el SDK de Gemini
npm install @google/generative-ai

# 4. Crea el archivo .env
cp .env.example .env

# 5. Edita .env y agrega tu API key de Gemini
# GEMINI_API_KEY=tu_api_key_aqui

# 6. Inicia el servidor
npm start
```

### Paso 3: Configurar Frontend
1. Abre `script.js`
2. Busca `const AI_CONFIG = {`
3. Cambia:
   ```javascript
   const AI_CONFIG = {
       enabled: true,
       apiType: 'gemini',
       apiUrl: 'http://localhost:3000/api/chat',
       useBackend: true
   };
   ```

---

## ⚠️ IMPORTANTE: Para Producción

### Si vas a subir tu app a internet:

1. **NO subas el archivo `.env`** a GitHub o repositorios públicos
2. Usa variables de entorno del hosting:
   - **Vercel**: Configura en Settings > Environment Variables
   - **Netlify**: Configura en Site settings > Environment variables
   - **Heroku**: Usa `heroku config:set OPENAI_API_KEY=tu_key`

3. Cambia la URL en `script.js`:
   ```javascript
   apiUrl: 'https://tu-backend.vercel.app/api/chat'
   ```

### Desplegar Backend en Vercel (GRATIS)

1. Crea un archivo `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend-example.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/chat",
      "dest": "backend-example.js"
    }
  ]
}
```

2. Sube el código a GitHub
3. Conecta con Vercel
4. Agrega las variables de entorno en Vercel
5. ¡Listo! Tu backend estará en producción

---

## Costos Estimados

### OpenAI (GPT-3.5-turbo)
- ~$0.002 por 1K tokens
- Una conversación típica: ~$0.01-0.05
- Con $5 puedes tener ~500-1000 conversaciones

### Google Gemini
- **GRATIS** hasta 60 solicitudes por minuto
- Perfecto para proyectos pequeños/medianos

---

## Solución de Problemas

### Error: "CORS policy"
- Asegúrate de que el backend tenga `cors()` habilitado
- Verifica que la URL en `script.js` sea correcta

### Error: "API key not found"
- Verifica que el archivo `.env` exista
- Verifica que la variable se llame exactamente igual
- Reinicia el servidor después de cambiar `.env`

### Error: "Network error"
- Verifica que el servidor esté corriendo
- Verifica que la URL sea correcta
- Verifica el firewall/antivirus

---

## ¿Necesitas Ayuda?

Si tienes problemas, verifica:
1. ✅ Node.js instalado (`node --version`)
2. ✅ Dependencias instaladas (`npm install`)
3. ✅ Archivo `.env` creado y con la API key
4. ✅ Servidor corriendo (`npm start`)
5. ✅ URL correcta en `script.js`

