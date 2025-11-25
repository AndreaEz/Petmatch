# 🔧 Solución al Error: "Error al conectar con la IA"

## ❌ El problema:
Estás viendo el mensaje: **"Lo siento, hubo un error al conectar con la IA"**

## ✅ La solución:

### **El servidor backend NO está corriendo**

El chat con IA necesita que el servidor backend esté activo para funcionar.

## 📋 Pasos para solucionarlo:

### **Opción 1: Usar el archivo .bat (MÁS FÁCIL)**

1. **Haz doble clic en:** `INICIAR_SERVIDOR.bat`
2. **Espera** a ver este mensaje:
   ```
   🚀 Servidor ejecutándose en http://localhost:3000
   ```
3. **NO CIERRES** esa ventana
4. **Refresca** tu página web (F5)
5. **Prueba** el chat de nuevo

### **Opción 2: Usar la terminal**

1. **Abre una terminal** en esta carpeta
2. **Escribe:** `node backend-example.js`
3. **Presiona Enter**
4. **Espera** a ver: `🚀 Servidor ejecutándose...`
5. **NO CIERRES** esa terminal
6. **Refresca** tu página web (F5)
7. **Prueba** el chat de nuevo

## ✅ Verificación:

Después de iniciar el servidor, deberías ver en la terminal:
```
🚀 Servidor ejecutándose en http://localhost:3000
📝 Endpoint de chat: http://localhost:3000/api/chat
💡 Asegúrate de tener tu API key en el archivo .env
```

## ⚠️ Importante:

- **El servidor debe estar corriendo** mientras uses el chat
- **Si cierras la ventana/terminal**, el servidor se detiene
- **Cada vez que quieras usar el chat**, necesitas iniciar el servidor primero

## 🐛 Si sigue sin funcionar:

1. Verifica que veas el mensaje del servidor en la terminal
2. Abre la consola del navegador (F12) y revisa si hay errores
3. Verifica que el archivo `.env` existe y tiene tu API key
4. Asegúrate de que no hay otro programa usando el puerto 3000

---

**Una vez que el servidor esté corriendo, el chat funcionará perfectamente! 🎉**

