# 🔧 Solución al Error 404 en /api/chat

El error 404 indica que Vercel no está detectando la función serverless. Sigue estos pasos:

## ✅ Paso 1: Verificar Configuración del Proyecto en Vercel

1. Ve a tu proyecto en **Vercel Dashboard**
2. Haz clic en **Settings** → **General**
3. Verifica estas configuraciones:

### Framework Preset
- Debe estar en **"Other"** o **"None"**
- NO debe estar en "HTML" o "Static Site"

### Build & Development Settings
- **Build Command:** Déjalo VACÍO
- **Output Directory:** Déjalo VACÍO  
- **Install Command:** Déjalo VACÍO
- **Root Directory:** Déjalo VACÍO (o "./" si está configurado)

## ✅ Paso 2: Verificar que la Función se Despliegue

1. Ve a la pestaña **"Functions"** en tu proyecto de Vercel
2. Deberías ver `/api/chat` listada
3. Si NO aparece, el problema es que Vercel no está detectando la carpeta `api/`

## ✅ Paso 3: Verificar el Último Deployment

1. Ve a **Deployments**
2. Haz clic en el último deployment
3. Revisa los **Build Logs**
4. Busca errores relacionados con funciones serverless

## ✅ Paso 4: Si la Función NO Aparece en Functions

### Opción A: Forzar Re-detección
1. Ve a **Settings** → **General**
2. Cambia el **Framework Preset** a "Other"
3. Guarda los cambios
4. Ve a **Deployments** → **Redeploy** el último deployment

### Opción B: Verificar Estructura de Archivos
Asegúrate de que la estructura sea:
```
Petmatch/
├── api/
│   └── chat.js  ← Debe existir
├── index.html
├── script.js
├── package.json  ← Debe existir
└── ...
```

## ✅ Paso 5: Verificar Variables de Entorno

1. Ve a **Settings** → **Environment Variables**
2. Verifica que `GEMINI_API_KEY` esté configurada
3. Debe estar en **Production**, **Preview** y **Development**

## 🔍 Verificación Final

Después de hacer los cambios:
1. Espera 2-3 minutos para que Vercel despliegue
2. Ve a **Functions** y verifica que `/api/chat` aparezca
3. Prueba el chat nuevamente

## 📝 Si Nada Funciona

Si después de todos estos pasos sigue dando 404, puede ser que:
- Vercel esté tratando el proyecto como sitio estático puro
- Necesites cambiar el tipo de proyecto en Vercel
- Haya un problema con la configuración del repositorio

En ese caso, comparte:
- Una captura de la pestaña **Functions** (si está vacía o muestra algo)
- Una captura de **Settings** → **General**
- Los logs del último deployment

