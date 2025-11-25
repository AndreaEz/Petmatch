@echo off
echo ========================================
echo   INICIANDO SERVIDOR DE CHAT CON IA
echo ========================================
echo.
echo Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
)
echo.
echo Iniciando servidor backend...
echo.
echo IMPORTANTE: Manten esta ventana abierta mientras uses el chat
echo Para detener el servidor, presiona Ctrl+C
echo.
node backend-example.js
pause

