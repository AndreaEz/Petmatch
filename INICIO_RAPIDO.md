# 🚀 Inicio Rápido - Chat con IA Configurado

## ✅ Todo está listo y configurado

Tu chat con IA usando **Google Gemini** está completamente configurado y listo para usar.

## 📋 Para iniciar el servidor:

```bash
# Inicia el servidor backend
node backend-example.js
```

El servidor estará disponible en: **http://localhost:3000**

## 🎯 Cómo usar:

1. **Abre `index.html` en tu navegador**
2. **Haz clic en el botón flotante de IA** (esquina inferior derecha)
3. **Escribe tu pregunta** sobre cuidado de mascotas
4. **¡Disfruta de las respuestas de la IA!**

## ⚙️ Configuración actual:

- ✅ **API**: Google Gemini (GRATIS)
- ✅ **Backend**: Configurado y funcionando
- ✅ **Frontend**: Habilitado en `script.js`
- ✅ **API Key**: Configurada en `.env`

## 🔧 Si necesitas reiniciar el servidor:

1. Detén el servidor actual (Ctrl+C en la terminal)
2. Ejecuta: `node backend-example.js`
3. Asegúrate de que veas el mensaje: `🚀 Servidor ejecutándose en http://localhost:3000`

## 📝 Notas importantes:

- El servidor debe estar corriendo para que el chat funcione
- Si cierras la terminal, el servidor se detendrá
- Para producción, necesitarás desplegar el backend en un servicio como Vercel o Heroku

## 🐛 Solución de problemas:

**Error: "Cannot find module"**
- Ejecuta: `npm install`

**Error: "Port 3000 already in use"**
- Cambia el puerto en `.env` a otro número (ej: 3001)
- Actualiza `apiUrl` en `script.js` con el nuevo puerto

**El chat no responde**
- Verifica que el servidor esté corriendo
- Abre la consola del navegador (F12) para ver errores
- Verifica que la URL en `script.js` sea correcta

---

¡Todo listo! 🎉

