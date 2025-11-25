/**
 * PETMATCH - SCRIPT PRINCIPAL
 * 
 * Este archivo contiene toda la lógica de funcionamiento de la aplicación PetMatch.
 * Las funciones están comentadas en español para facilitar futuras modificaciones.
 * 
 * IMPORTANTE: Los datos de perfiles, refugios y configuraciones están en data.js
 */

console.log('Script.js iniciando...');

// Verificar que no hay conflictos de variables
if (typeof window.APP_CONFIG !== 'undefined') {
    console.warn('APP_CONFIG ya existe en window, esto puede causar conflictos');
}

// ===========================================
// VARIABLES GLOBALES
// ===========================================

// Variables para almacenar datos (se inicializan en DOMContentLoaded)
var profilesData = [];
var appConfig = {};

// Índice de la tarjeta actual que se está mostrando
let currentCardIndex = 0;

// Array que almacena todos los matches del usuario
let matches = [];

// Array que almacena todos los likes del usuario
let likes = [];

// Perfil con el que se está chateando actualmente
let currentChat = null;

// Objeto que almacena todos los mensajes por perfil
let messages = {};

// ===========================================
// CONFIGURACIÓN DE API DE IA
// ===========================================
const AI_CONFIG = {
    enabled: true, // ✅ Activado - Usando Google Gemini
    apiType: 'gemini', // Google Gemini API
    apiUrl: 'http://localhost:3000/api/chat', // URL del backend local
    useBackend: true // Siempre true para seguridad
};

// ===========================================
// FUNCIONES DE NAVEGACIÓN (DISPONIBLES INMEDIATAMENTE)
// ===========================================

// Definir las funciones inmediatamente y asignarlas al objeto window

/**
 * Muestra el chat con IA
 */
function showAiChat() {
    console.log('Abriendo chat con IA...');
    try {
        const aiChatSection = document.getElementById('aiChatSection');
        if (aiChatSection) {
            aiChatSection.classList.remove('d-none');
            // Scroll al final del chat
            setTimeout(() => {
                const container = document.getElementById('aiChatContainer');
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            }, 100);
            console.log('Chat con IA mostrado');
        }
    } catch (error) {
        console.error('Error en showAiChat:', error);
    }
}

/**
 * Oculta el chat con IA
 */
function hideAiChat() {
    const aiChatSection = document.getElementById('aiChatSection');
    if (aiChatSection) {
        aiChatSection.classList.add('d-none');
    }
}

/**
 * Muestra la sección de cuidado de mascotas
 */
function showPetCareSection() {
    console.log('Navegando a sección de cuidado de mascotas...');
    try {
        // Ocultar todas las secciones
        const sections = ['welcomeScreen', 'likesSection', 'matchesSection', 'messagesSection', 'donationSection', 'adoptionSection', 'publishSection', 'favoritesPage'];
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('d-none');
            }
        });
        
        // Mostrar sección de cuidado
        const petCareSection = document.getElementById('petCareSection');
        if (petCareSection) {
            petCareSection.classList.remove('d-none');
            console.log('Sección de cuidado mostrada');
        } else {
            console.error('Elemento petCareSection no encontrado');
        }
    } catch (error) {
        console.error('Error en showPetCareSection:', error);
    }
}

/**
 * Muestra la sección de donaciones
 */
function showDonationSection() {
    console.log('Navegando a sección de donaciones...');
    try {
        // Ocultar todas las secciones
        const sections = ['welcomeScreen', 'swipeContainer', 'likesSection', 'matchesSection', 'messagesSection', 'petCareSection', 'adoptionSection', 'publishSection', 'favoritesPage'];
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('d-none');
            }
        });
        
        // Mostrar sección de donaciones
        const donationSection = document.getElementById('donationSection');
        if (donationSection) {
            donationSection.classList.remove('d-none');
            console.log('Sección de donaciones mostrada');
        } else {
            console.error('Elemento donationSection no encontrado');
        }
    } catch (error) {
        console.error('Error en showDonationSection:', error);
    }
}

/**
 * Muestra la pantalla de bienvenida
 */
function showWelcomeScreen() {
    console.log('Navegando a pantalla de bienvenida...');
    try {
        // Ocultar todas las secciones
        const sections = ['likesSection', 'matchesSection', 'messagesSection', 'petCareSection', 'donationSection', 'adoptionSection', 'publishSection'];
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('d-none');
            }
        });
        
        // Mostrar pantalla de bienvenida
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.classList.remove('d-none');
            console.log('Pantalla de bienvenida mostrada');
        } else {
            console.error('Elemento welcomeScreen no encontrado');
        }
    } catch (error) {
        console.error('Error en showWelcomeScreen:', error);
    }
}

/**
 * Muestra la sección de adopción (Netflix style)
 */
function showAdoptionSection() {
    console.log('Navegando a sección de adopción...');
    try {
        // Ocultar todas las secciones
        const sections = ['welcomeScreen', 'likesSection', 'matchesSection', 'messagesSection', 'petCareSection', 'donationSection', 'publishSection'];
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('d-none');
            }
        });
        
        // Mostrar sección de adopción
        const adoptionSection = document.getElementById('adoptionSection');
        if (adoptionSection) {
            adoptionSection.classList.remove('d-none');
            console.log('Sección de adopción mostrada');
            // Cargar mascotas en estilo Netflix
            loadPetsGrid();
            // Cargar test de compatibilidad
            loadCompatibilityTest();
            
            // Mostrar test automáticamente si es la primera vez
            if (isFirstTimeUser()) {
                setTimeout(() => {
                    showCompatibilityTestModal();
                }, 500); // Pequeño delay para que se cargue la sección
            }
        } else {
            console.error('Elemento adoptionSection no encontrado');
        }
    } catch (error) {
        console.error('Error en showAdoptionSection:', error);
    }
}

/**
 * Muestra la sección de publicación
 */
function showPublishSection() {
    console.log('Navegando a sección de publicación...');
    try {
        // Ocultar todas las secciones
        const sections = ['welcomeScreen', 'swipeContainer', 'likesSection', 'matchesSection', 'messagesSection', 'petCareSection', 'donationSection', 'adoptionSection'];
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('d-none');
            }
        });
        
        // Mostrar sección de publicación
        const publishSection = document.getElementById('publishSection');
        if (publishSection) {
            publishSection.classList.remove('d-none');
            console.log('Sección de publicación mostrada');
        } else {
            console.error('Elemento publishSection no encontrado');
        }
    } catch (error) {
        console.error('Error en showPublishSection:', error);
    }
}

// Asignar las funciones al objeto window inmediatamente después de definirlas
window.showPetCareSection = showPetCareSection;
window.showDonationSection = showDonationSection;
window.showWelcomeScreen = showWelcomeScreen;
window.showAdoptionSection = showAdoptionSection;
window.showPublishSection = showPublishSection;
window.showAiChat = showAiChat;
window.hideAiChat = hideAiChat;

console.log('Funciones de navegación cargadas y disponibles globalmente');

// ===========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ===========================================

/**
 * Inicializa la aplicación cuando el DOM está completamente cargado
 * Configura los event listeners, crea las tarjetas de perfiles y actualiza contadores
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando PetMatch...');
    
    // Esperar un poco para asegurar que data.js se haya cargado
    setTimeout(function() {
        // Verificar que los datos estén disponibles
        if (typeof window.PetMatchData === 'undefined') {
            console.error('Error: PetMatchData no está disponible. Verifica que data.js se haya cargado correctamente.');
            return;
        }
        
        console.log('PetMatchData cargado correctamente:', window.PetMatchData);
        
        // Obtener datos del archivo data.js de manera segura
        if (window.PetMatchData.profiles) {
            profilesData = window.PetMatchData.profiles;
        }
        if (window.PetMatchData.APP_CONFIG) {
            appConfig = window.PetMatchData.APP_CONFIG;
        }
        
        console.log('Perfiles cargados:', profilesData.length);
        console.log('Configuración:', appConfig);
        
        // Inicializar la aplicación
        console.log('Inicializando aplicación...');
        initializeApp();
        console.log('Configurando event listeners...');
        setupEventListeners();
        console.log('Actualizando contadores...');
        updateCounters();
        console.log('Aplicación inicializada correctamente');
    }, 100); // Esperar 100ms para que data.js se cargue
});

/**
 * Inicializa la aplicación cargando datos guardados del localStorage
 * Restaura matches, likes y mensajes de sesiones anteriores
 */
function initializeApp() {
    // Cargar datos guardados del localStorage
    const savedMatches = localStorage.getItem('tinderMatches');
    const savedLikes = localStorage.getItem('tinderLikes');
    const savedMessages = localStorage.getItem('tinderMessages');
    const savedPublishedPets = localStorage.getItem('publishedPets');
    
    // Restaurar matches si existen
    if (savedMatches) {
        matches = JSON.parse(savedMatches);
    }
    
    // Restaurar likes si existen
    if (savedLikes) {
        likes = JSON.parse(savedLikes);
    }
    
    // Restaurar mensajes si existen
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
    }
    
    // Restaurar mascotas publicadas si existen
    if (savedPublishedPets) {
        const publishedPets = JSON.parse(savedPublishedPets);
        // Añadir mascotas publicadas a la base de datos
        publishedPets.forEach(pet => {
            if (!profilesData.find(p => p.id === pet.id)) {
                profilesData.push(pet);
            }
        });
    }
}

/**
 * Configura todos los event listeners de la aplicación
 * Asocia eventos de botones con sus respectivas funciones
 */
function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    // Chat con IA - Botón flotante
    const aiChatFloatBtn = document.getElementById('aiChatFloatBtn');
    if (aiChatFloatBtn) {
        aiChatFloatBtn.addEventListener('click', showAiChat);
    }
    
    // Chat con IA - Botón cerrar
    const closeAiChatBtn = document.getElementById('closeAiChatBtn');
    if (closeAiChatBtn) {
        closeAiChatBtn.addEventListener('click', hideAiChat);
    }
    
    // Chat con IA - Enviar mensaje
    const sendAiMessageBtn = document.getElementById('sendAiMessageBtn');
    const aiChatInput = document.getElementById('aiChatInput');
    if (sendAiMessageBtn) {
        sendAiMessageBtn.addEventListener('click', sendAiMessage);
    }
    if (aiChatInput) {
        aiChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAiMessage();
            }
        });
    }
    
    // Hacer las funciones adicionales disponibles globalmente para onclick
    window.showLikesSection = showLikesSection;
    window.showMatchesSection = showMatchesSection;
    window.showProfile = showProfile;
    window.showAdoptionForm = showAdoptionForm;
    window.submitAdoptionForm = submitAdoptionForm;
    window.removeLike = removeLike;
    window.sendMessageToLike = sendMessageToLike;
    window.showDeleteConfirmation = showDeleteConfirmation;
    window.clearAllLikes = clearAllLikes;
    window.sendMessage = sendMessage;
    window.showDetailedProfile = showDetailedProfile;
    window.showPetInfoModal = showPetInfoModal;
    window.donateToShelter = donateToShelter;
    
    console.log('Funciones adicionales asignadas globalmente');
    console.log('showAdoptionForm disponible:', typeof window.showAdoptionForm);
    
    console.log('Funciones globales configuradas');
    
    // Botones del menú principal (welcome screen)
    const careBtn = document.getElementById('careBtn');
    const donationBtn = document.getElementById('donationBtn');
    
    if (careBtn) {
        careBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón Cuidado clickeado');
            showPetCareSection();
        });
        console.log('Event listener de Cuidado configurado');
    } else {
        console.error('Botón careBtn no encontrado');
    }
    
    if (donationBtn) {
        donationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón Donación clickeado');
            showDonationSection();
        });
        console.log('Event listener de Donación configurado');
    } else {
        console.error('Botón donationBtn no encontrado');
    }
    
    // Botones de navegación entre secciones
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('click', showWelcomeScreen);
    }
    
    // Si el corazón es un enlace a favorites.html, no sobreescribir navegación SPA
    const likesBtn = document.getElementById('likesBtn');
    if (likesBtn && (!likesBtn.getAttribute('href') || likesBtn.getAttribute('href') === '#')) {
        likesBtn.addEventListener('click', showLikesSection);
    }
    
    const matchesBtn = document.getElementById('matchesBtn');
    if (matchesBtn) {
        matchesBtn.addEventListener('click', showMatchesSection);
    }
    
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', showProfile);
    }
    
    // Botones de volver - verificar existencia antes de agregar listeners
    const backToWelcomeFromMatchesBtn = document.getElementById('backToWelcomeFromMatchesBtn');
    if (backToWelcomeFromMatchesBtn) {
        backToWelcomeFromMatchesBtn.addEventListener('click', showWelcomeScreen);
    }
    
    const backToWelcomeFromLikesBtn = document.getElementById('backToWelcomeFromLikesBtn');
    if (backToWelcomeFromLikesBtn) {
        backToWelcomeFromLikesBtn.addEventListener('click', showWelcomeScreen);
    }
    
    const backToMatchesBtn = document.getElementById('backToMatchesBtn');
    if (backToMatchesBtn) {
        backToMatchesBtn.addEventListener('click', showMatchesSection);
    }
    
    const backToWelcomeBtn = document.getElementById('backToWelcomeBtn');
    if (backToWelcomeBtn) {
        backToWelcomeBtn.addEventListener('click', showWelcomeScreen);
    }
    
    const backToWelcomeFromDonationBtn = document.getElementById('backToWelcomeFromDonationBtn');
    if (backToWelcomeFromDonationBtn) {
        backToWelcomeFromDonationBtn.addEventListener('click', showWelcomeScreen);
    }
    
    const backToWelcomeFromSwipeBtn = document.getElementById('backToWelcomeFromSwipeBtn');
    if (backToWelcomeFromSwipeBtn) {
        backToWelcomeFromSwipeBtn.addEventListener('click', showWelcomeScreen);
    }
    
    // Event listeners para botones del modal de información
    const likeFromInfoBtn = document.getElementById('likeFromInfoBtn');
    if (likeFromInfoBtn) {
        likeFromInfoBtn.addEventListener('click', function() {
            if (currentAdoptionPet) {
                likePet(currentAdoptionPet.id);
                const modal = bootstrap.Modal.getInstance(document.getElementById('petInfoModal'));
                if (modal) modal.hide();
            }
        });
    }
    
    const chatFromInfoBtn = document.getElementById('chatFromInfoBtn');
    if (chatFromInfoBtn) {
        chatFromInfoBtn.addEventListener('click', function() {
            if (currentAdoptionPet) {
                startChat(currentAdoptionPet.id);
                const modal = bootstrap.Modal.getInstance(document.getElementById('petInfoModal'));
                if (modal) modal.hide();
            }
        });
    }
    
    // Botones de adopción y modales de perfil
    const adoptFromProfileBtn = document.getElementById('adoptFromProfileBtn');
    const adoptFromInfoBtn = document.getElementById('adoptFromInfoBtn');
    const adoptFromChatBtn = document.getElementById('adoptFromChatBtn');
    const submitAdoptionBtn = document.getElementById('submitAdoptionBtn');
    
    // Botón eliminado del DOM para evitar duplicado; no configurar listener
    
    if (adoptFromInfoBtn) {
        adoptFromInfoBtn.addEventListener('click', showAdoptionForm);
        console.log('Event listener adoptFromInfoBtn configurado');
    } else {
        console.error('Botón adoptFromInfoBtn no encontrado');
    }
    
    if (adoptFromChatBtn) {
        adoptFromChatBtn.addEventListener('click', function() {
            console.log('Botón adoptFromChatBtn clickeado');
            showAdoptionForm();
        });
        console.log('Event listener adoptFromChatBtn configurado');
    } else {
        console.error('Botón adoptFromChatBtn no encontrado');
    }
    
    if (submitAdoptionBtn) {
        submitAdoptionBtn.addEventListener('click', submitAdoptionForm);
        console.log('Event listener submitAdoptionBtn configurado');
    } else {
        console.error('Botón submitAdoptionBtn no encontrado');
    }
    
    // Gestión de likes (eliminar individual y todos)
    const clearLikesBtn = document.getElementById('clearLikesBtn');
    if (clearLikesBtn) {
        clearLikesBtn.addEventListener('click', showDeleteConfirmation);
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', clearAllLikes);
    }
    
    // Funcionalidad de mensajes
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }
    
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Modal de match - botón para enviar mensaje inmediatamente
    const sendMessageNowBtn = document.getElementById('sendMessageNowBtn');
    if (sendMessageNowBtn) {
        sendMessageNowBtn.addEventListener('click', function() {
            const modal = bootstrap.Modal.getInstance(document.getElementById('matchModal'));
            if (modal) modal.hide();
            showMessagesSection(currentChat);
        });
    }
    
    // Formulario de publicación
    const publishForm = document.getElementById('publishPetForm');
    if (publishForm) {
        publishForm.addEventListener('submit', handlePublishForm);
    }
    
    // Botón de aplicar resultados del test
    const applyTestResultsBtn = document.getElementById('applyTestResultsBtn');
    if (applyTestResultsBtn) {
        applyTestResultsBtn.addEventListener('click', applyTestResults);
    }
    
    // Botón de saltar test
    const skipTestBtn = document.getElementById('skipTestBtn');
    if (skipTestBtn) {
        skipTestBtn.addEventListener('click', function() {
            // Marcar que el usuario ya ha visto el test
            markTestAsSeen();
            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('compatibilityTestModal'));
            modal.hide();
            showToast('Test saltado. Puedes realizarlo más tarde desde el botón "Realizar Test de Compatibilidad"', 'info');
        });
    }
    
    // Botones de navegación adicionales (ya verificados arriba, pero los mantenemos aquí por claridad)
    const backToWelcomeFromAdoptionBtn = document.getElementById('backToWelcomeFromAdoptionBtn');
    if (backToWelcomeFromAdoptionBtn) {
        backToWelcomeFromAdoptionBtn.addEventListener('click', showWelcomeScreen);
    }
    
    const backToWelcomeFromPublishBtn = document.getElementById('backToWelcomeFromPublishBtn');
    if (backToWelcomeFromPublishBtn) {
        backToWelcomeFromPublishBtn.addEventListener('click', showWelcomeScreen);
    }
}

/**
 * Envía un mensaje al chat con IA
 */
function sendAiMessage() {
    const aiChatInput = document.getElementById('aiChatInput');
    const text = aiChatInput.value.trim();
    
    if (!text) return;
    
    // Agregar mensaje del usuario al chat
    const aiChatContainer = document.getElementById('aiChatContainer');
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerHTML = `
        <div class="user-message-content">
            <p>${text}</p>
        </div>
    `;
    aiChatContainer.appendChild(userMessage);
    
    // Limpiar input
    aiChatInput.value = '';
    
    // Scroll al final
    aiChatContainer.scrollTop = aiChatContainer.scrollHeight;
    
    // Mostrar indicador de carga
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'ai-message loading';
    loadingMessage.id = 'aiLoadingMessage';
    loadingMessage.innerHTML = `
        <div class="ai-avatar-small">
            <i class="fas fa-robot"></i>
        </div>
        <div class="ai-message-content">
            <p><i class="fas fa-spinner fa-spin"></i> Pensando...</p>
        </div>
    `;
    aiChatContainer.appendChild(loadingMessage);
    aiChatContainer.scrollTop = aiChatContainer.scrollHeight;
    
    // Llamar a la API de IA
    if (AI_CONFIG.enabled && AI_CONFIG.apiUrl) {
        callAiApi(text, aiChatContainer, loadingMessage);
    } else {
        // Usar respuestas predefinidas si la API no está configurada
        setTimeout(() => {
            loadingMessage.remove();
            const aiResponse = generateAiResponse(text);
            displayAiResponse(aiResponse, aiChatContainer);
        }, 1000);
    }
}

/**
 * Llama a la API de IA real
 */
async function callAiApi(userQuestion, container, loadingElement) {
    try {
        const response = await fetch(AI_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userQuestion,
                apiType: AI_CONFIG.apiType
            })
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        loadingElement.remove();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        displayAiResponse(data.response || data.message, container);
    } catch (error) {
        console.error('Error llamando a la API de IA:', error);
        loadingElement.remove();
        
        // Determinar el tipo de error
        let errorText = '';
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorText = '⚠️ <strong>El servidor backend no está corriendo.</strong><br><br>Por favor:<br>1. Ejecuta <code>INICIAR_SERVIDOR.bat</code> o<br>2. Abre una terminal y ejecuta: <code>node backend-example.js</code><br><br>Luego refresca esta página (F5).';
        } else {
            errorText = `⚠️ Error al conectar con la IA: ${error.message}<br><br>Aquí tienes una respuesta útil:`;
        }
        
        // Mostrar error
        const errorMessage = document.createElement('div');
        errorMessage.className = 'ai-message error';
        errorMessage.innerHTML = `
            <div class="ai-avatar-small">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="ai-message-content">
                <p>${errorText}</p>
            </div>
        `;
        container.appendChild(errorMessage);
        
        // Solo mostrar respuesta predefinida si no es error de conexión
        if (!error.message.includes('Failed to fetch') && !error.message.includes('NetworkError')) {
            const fallbackResponse = generateAiResponse(userQuestion);
            displayAiResponse(fallbackResponse, container);
        }
        
        container.scrollTop = container.scrollHeight;
    }
}

/**
 * Muestra la respuesta de la IA en el chat
 */
function displayAiResponse(response, container) {
    const aiMessage = document.createElement('div');
    aiMessage.className = 'ai-message';
    aiMessage.innerHTML = `
        <div class="ai-avatar-small">
            <i class="fas fa-robot"></i>
        </div>
        <div class="ai-message-content">
            <p>${response.replace(/\n/g, '<br>')}</p>
        </div>
    `;
    container.appendChild(aiMessage);
    container.scrollTop = container.scrollHeight;
}

/**
 * Genera una respuesta de la IA basada en la pregunta del usuario (fallback)
 */
function generateAiResponse(userQuestion) {
    const question = userQuestion.toLowerCase();
    
    // Respuestas predefinidas basadas en palabras clave
    if (question.includes('aliment') || question.includes('comida') || question.includes('comer')) {
        return 'Para una alimentación saludable de tu mascota, te recomiendo:\n\n• Proporciona comida de calidad apropiada para la edad y tamaño de tu mascota\n• Establece horarios regulares de comida (2-3 veces al día para perros adultos)\n• Evita dar comida humana, especialmente chocolate, cebolla, ajo y uvas que son tóxicos\n• Asegúrate de que siempre tenga agua fresca disponible\n• Consulta con tu veterinario sobre la cantidad adecuada según el peso y actividad\n\n¿Tienes alguna pregunta específica sobre la alimentación?';
    } else if (question.includes('salud') || question.includes('veterinari') || question.includes('vacun')) {
        return 'El cuidado de la salud de tu mascota es fundamental:\n\n• Mantén al día las vacunas según el calendario recomendado por tu veterinario\n• Realiza chequeos regulares (al menos una vez al año)\n• Observa cambios en comportamiento, apetito o actividad\n• Mantén una buena higiene dental\n• Presta atención a parásitos externos e internos\n• Esterilización es recomendada para prevenir enfermedades y controlar población\n\n¿Necesitas ayuda con algún aspecto específico de la salud?';
    } else if (question.includes('entren') || question.includes('comport') || question.includes('educ')) {
        return 'El entrenamiento y educación de tu mascota requiere paciencia y consistencia:\n\n• Usa refuerzo positivo (premios, elogios) en lugar de castigos\n• Sé consistente con las reglas y comandos\n• Las sesiones cortas (10-15 min) son más efectivas que sesiones largas\n• Socializa a tu mascota desde temprana edad\n• Establece rutinas claras para comida, paseos y descanso\n• Considera clases de entrenamiento profesional si es necesario\n\n¿Qué comportamiento específico te gustaría trabajar?';
    } else if (question.includes('adopt') || question.includes('prepar') || question.includes('nuev')) {
        return 'Prepararse para adoptar una mascota es emocionante. Aquí tienes una guía:\n\n• Prepara tu hogar: espacio seguro, juguetes, cama, platos de comida y agua\n• Investiga sobre la raza o tipo de mascota que quieres adoptar\n• Considera el tiempo y recursos que puedes dedicar\n• Visita al veterinario poco después de la adopción para chequeo inicial\n• Ten paciencia durante el período de adaptación (puede tomar semanas)\n• Establece rutinas desde el primer día\n\n¿Tienes alguna duda específica sobre el proceso de adopción?';
    } else if (question.includes('ejercicio') || question.includes('paseo') || question.includes('actividad')) {
        return 'El ejercicio es esencial para el bienestar de tu mascota:\n\n• Perros: Necesitan paseos diarios (al menos 30 min, 2-3 veces al día)\n• Gatos: Proporciona juguetes interactivos y tiempo de juego diario\n• Adapta la intensidad según la edad y condición física\n• Evita ejercicio intenso después de comer\n• En días calurosos, haz ejercicio temprano o tarde\n• Observa señales de cansancio o sobreesfuerzo\n\n¿Qué tipo de mascota tienes o planeas tener?';
    } else {
        return 'Gracias por tu pregunta. Puedo ayudarte con temas relacionados a:\n\n• Alimentación y nutrición\n• Cuidados de salud y veterinaria\n• Entrenamiento y comportamiento\n• Preparación para adopción\n• Ejercicio y actividad física\n• Higiene y cuidado general\n\n¿Sobre cuál de estos temas te gustaría saber más?';
    }
}

function addToLikes(profile, type) {
    const existingLike = likes.find(like => like.id === profile.id);
    
    if (!existingLike) {
        const like = {
            id: profile.id,
            name: profile.name,
            age: profile.age,
            bio: profile.bio,
            image: profile.image,
            type: type,
            likedAt: new Date().toISOString()
        };
        
        likes.push(like);
        saveLikes();
        updateCounters();
    }
}

function checkForMatch(profile) {
    // Always create a match when liking (as requested)
        const match = {
            id: profile.id,
            name: profile.name,
            image: profile.image,
            matchedAt: new Date().toISOString()
        };
        
        matches.push(match);
        saveMatches();
        updateCounters();
        
        // Show match modal
        showMatchModal(profile);
}



function showProfile() {
    const modal = new bootstrap.Modal(document.getElementById('profileModal'));
    modal.show();
}


function showLikesSection() {
    console.log('showLikesSection llamada');
    console.log('Likes actuales:', likes);
    
    // Ocultar todas las secciones
    const sections = ['welcomeScreen', 'swipeContainer', 'likesSection', 'matchesSection', 'messagesSection', 'petCareSection', 'donationSection', 'adoptionSection', 'publishSection', 'favoritesPage'];
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.classList.add('d-none');
        }
    });
    
    // Mostrar página dedicada de favoritos
    const favoritesPage = document.getElementById('favoritesPage');
    if (favoritesPage) {
        favoritesPage.classList.remove('d-none');
        loadFavorites();
        console.log('Página de favoritos mostrada');
    } else {
        console.error('No se encontró la página favoritesPage');
    }
}

function showMatchesSection() {
    console.log('Navegando a sección de matches...');
    try {
        // Ocultar todas las secciones
        const sections = ['welcomeScreen', 'swipeContainer', 'likesSection', 'messagesSection', 'petCareSection', 'donationSection', 'adoptionSection', 'publishSection', 'favoritesPage'];
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('d-none');
            }
        });
        
        // Mostrar sección de matches
        const matchesSection = document.getElementById('matchesSection');
        if (matchesSection) {
            matchesSection.classList.remove('d-none');
            displayMatches();
            console.log('Sección de matches mostrada');
        } else {
            console.error('Elemento matchesSection no encontrado');
        }
    } catch (error) {
        console.error('Error en showMatchesSection:', error);
    }
}

function showMessagesSection(profile) {
    // Ocultar todas las secciones
    const sections = ['welcomeScreen', 'swipeContainer', 'likesSection', 'matchesSection', 'petCareSection', 'donationSection', 'adoptionSection', 'publishSection', 'favoritesPage'];
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.classList.add('d-none');
        }
    });
    
    // Mostrar sección de mensajes
    const messagesSection = document.getElementById('messagesSection');
    if (messagesSection) {
        messagesSection.classList.remove('d-none');
    }
    
    if (profile) {
        currentChat = profile;
        document.getElementById('chatUserName').textContent = profile.name;
        const chatProfileImage = document.getElementById('chatProfileImage');
        chatProfileImage.style.backgroundImage = `url('${profile.image}')`;
        chatProfileImage.style.cursor = 'pointer';
        chatProfileImage.title = 'Click para ver información detallada';
        chatProfileImage.onclick = () => showPetInfoModal(profile.id);
        displayMessages(profile.id);
    }
}

function displayLikes() {
    const likesGrid = document.getElementById('likesGrid');
    likesGrid.innerHTML = '';
    
    if (likes.length === 0) {
        likesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart-broken"></i>
                <h3>No tienes likes aún</h3>
                <p>¡Comienza a dar likes para verlos aquí!</p>
                <button class="btn btn-primary" onclick="showAdoptionSection()">
                    <i class="fas fa-heart"></i> Buscar Mascotas
                </button>
            </div>
        `;
        return;
    }
    
    likes.forEach(like => {
        const likeCard = document.createElement('div');
        likeCard.className = 'like-card fade-in';
        likeCard.innerHTML = `
            <div class="like-image" style="background-image: url('${like.image}')"></div>
            <div class="like-name">${like.name}</div>
            <div class="like-age">${like.age} años</div>
            <div class="like-bio">${like.bio}</div>
            <div class="like-actions">
                <button class="btn-remove-like" onclick="removeLike(${like.id})">
                    <i class="fas fa-times"></i> Eliminar
                </button>
                <button class="btn-send-message" onclick="sendMessageToLike(${like.id})">
                    <i class="fas fa-paper-plane"></i> Mensaje
                </button>
                <button class="adopt-button" onclick="showAdoptionForm(${like.id})">
                    <i class="fas fa-heart"></i> Adoptar
                </button>
            </div>
        `;
        likesGrid.appendChild(likeCard);
    });
}

function removeLike(profileId) {
    // Buscar y eliminar el like
    const likeIndex = likes.findIndex(like => like.id === profileId);
    if (likeIndex !== -1) {
        likes.splice(likeIndex, 1);
        saveLikes();
    }
    
    // Buscar y eliminar el match correspondiente
    const matchIndex = matches.findIndex(match => match.id === profileId);
    if (matchIndex !== -1) {
        matches.splice(matchIndex, 1);
        saveMatches();
    }
    
    // Actualizar contadores y refrescar la vista
    updateCounters();
    displayLikes(); // Refresh the display
}

function sendMessageToLike(profileId) {
    const like = likes.find(l => l.id === profileId);
    if (like) {
        showMessagesSection(like);
    }
}

function showDeleteConfirmation() {
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
}

function clearAllLikes() {
    likes = [];
    saveLikes();
    updateCounters();
    displayLikes();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    modal.hide();
    
    // Show success message
    showToast('Todos los likes han sido eliminados', 'success');
}

function displayMatches() {
    const matchesGrid = document.getElementById('matchesGrid');
    matchesGrid.innerHTML = '';
    
    if (matches.length === 0) {
        matchesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comments"></i>
                <h3>No tienes matches aún</h3>
                <p>¡Da "Me gusta" a mascotas en la sección de adopción para encontrar tu match perfecto!</p>
                <button class="btn btn-primary" onclick="showAdoptionSection()">
                    <i class="fas fa-heart"></i> Buscar Mascotas
                </button>
            </div>
        `;
        return;
    }
    
    matches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.innerHTML = `
            <div class="match-image" style="background-image: url('${match.image}')"></div>
            <div class="match-name">${match.name}</div>
            <div class="match-time">Hace ${getTimeAgo(match.matchedAt)}</div>
        `;
        
        matchCard.addEventListener('click', () => showMessagesSection(match));
        matchesGrid.appendChild(matchCard);
    });
}

function displayMessages(profileId) {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
    
    const profileMessages = messages[profileId] || [];
    
    if (profileMessages.length === 0) {
        // Agregar mensaje automático del animal si no hay mensajes
        const autoMessage = getRandomAutoMessage();
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-with-profile';
        
        const profileIcon = document.createElement('div');
        profileIcon.className = 'message-profile-icon';
        profileIcon.style.backgroundImage = `url('${currentChat.image}')`;
        messageWrapper.appendChild(profileIcon);
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message received';
        messageDiv.textContent = autoMessage;
        
        messageContent.appendChild(messageDiv);
        messageWrapper.appendChild(messageContent);
        messagesContainer.appendChild(messageWrapper);
        
        // Guardar el mensaje automático
        if (!messages[profileId]) {
            messages[profileId] = [];
        }
        messages[profileId].push({
            text: autoMessage,
            sent: false,
            timestamp: new Date().toISOString()
        });
        saveMessages();
        return;
    }
    
    profileMessages.forEach(message => {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-with-profile';
        
        if (!message.sent) {
            const profileIcon = document.createElement('div');
            profileIcon.className = 'message-profile-icon';
            profileIcon.style.backgroundImage = `url('${currentChat.image}')`;
            messageWrapper.appendChild(profileIcon);
        }
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sent ? 'sent' : 'received'}`;
        messageDiv.textContent = message.text;
        
        messageContent.appendChild(messageDiv);
        messageWrapper.appendChild(messageContent);
        messagesContainer.appendChild(messageWrapper);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function updateCounters() {
    // contador de likes
    const likesCounter = document.getElementById("likesCount");
    if (likesCounter) {
        likesCounter.textContent = likes.length;
    }

    // contador de matches
    const matchesCounter = document.getElementById("matchesCount");
    if (matchesCounter) {
        matchesCounter.textContent = matches.length;
    }
}


function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const text = messageInput.value.trim();
    
    if (!text || !currentChat) return;
    
    // Add message to UI
    const messagesContainer = document.getElementById('messagesContainer');
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'message-with-profile';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.textContent = text;
    
    messageContent.appendChild(messageDiv);
    messageWrapper.appendChild(messageContent);
    messagesContainer.appendChild(messageWrapper);
    
    // Save message
    if (!messages[currentChat.id]) {
        messages[currentChat.id] = [];
    }
    
    messages[currentChat.id].push({
        text: text,
        sent: true,
        timestamp: new Date().toISOString()
    });
    
    saveMessages();
    
    // Clear input
    messageInput.value = '';
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Save functions
function saveLikes() {
    localStorage.setItem('tinderLikes', JSON.stringify(likes));
}

function saveMatches() {
    localStorage.setItem('tinderMatches', JSON.stringify(matches));
}

function saveMessages() {
    localStorage.setItem('tinderMessages', JSON.stringify(messages));
}

// Utility functions
function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'unos segundos';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} horas`;
    return `${Math.floor(diffInSeconds / 86400)} días`;
}


function showToast(message, type = 'info') {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Global variable for current adoption pet
let currentAdoptionPet = null;

// Donation functions
function donateToShelter(shelterId, amount) {
    if (amount === 0) {
        // Show custom amount input
        const customAmount = prompt('Ingresa el monto de tu donación:');
        if (customAmount && !isNaN(customAmount) && parseFloat(customAmount) > 0) {
            amount = parseFloat(customAmount);
        } else {
            return;
        }
    }
    
    // Simulate donation process
    showToast(`¡Gracias por tu donación de $${amount}!`, 'success');
    
    // In a real app, this would process the payment
    console.log(`Donation to shelter ${shelterId}: $${amount}`);
}

// Profile and adoption functions
function showDetailedProfile(profileId) {
    const profile = profilesData.find(p => p.id === profileId);
    if (!profile) return;
    
    // Usar las fotos del perfil o generar fotos adicionales si no existen
    const additionalPhotos = profile.images || [
        profile.image,
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
    ];
    
    const content = document.getElementById('detailedProfileContent');
    content.innerHTML = `
        <div class="detailed-profile-content">
            <div class="profile-photos-section">
                <h4><i class="fas fa-images"></i> Fotos de ${profile.name}</h4>
                <div class="profile-photos-grid">
                    <div class="profile-photo main" style="background-image: url('${additionalPhotos[0]}')" onclick="showPhotoModal('${additionalPhotos[0]}')"></div>
                    <div class="profile-photo" style="background-image: url('${additionalPhotos[1]}')" onclick="showPhotoModal('${additionalPhotos[1]}')"></div>
                    <div class="profile-photo" style="background-image: url('${additionalPhotos[2]}')" onclick="showPhotoModal('${additionalPhotos[2]}')"></div>
                    <div class="profile-photo" style="background-image: url('${additionalPhotos[3]}')" onclick="showPhotoModal('${additionalPhotos[3]}')"></div>
                </div>
            </div>
            <div class="profile-details">
                <h3>${profile.name}</h3>
                <div class="detail-item">
                    <span class="detail-label">Edad:</span>
                    <span class="detail-value">${profile.age}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Raza:</span>
                    <span class="detail-value">${profile.details.breed}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tamaño:</span>
                    <span class="detail-value">${profile.details.size}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Género:</span>
                    <span class="detail-value">${profile.details.gender}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Vacunado:</span>
                    <span class="detail-value">${profile.details.vaccinated ? 'Sí' : 'No'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Esterilizado:</span>
                    <span class="detail-value">${profile.details.sterilized ? 'Sí' : 'No'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Personalidad:</span>
                    <span class="detail-value">${profile.details.personality}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Necesidades especiales:</span>
                    <span class="detail-value">${profile.details.specialNeeds}</span>
                </div>
                
                <div class="shelter-info-modal">
                    <h4><i class="fas fa-home"></i> Información del Refugio</h4>
                    <p><strong>${profile.shelter.name}</strong></p>
                    <p>${profile.shelter.description}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${profile.shelter.address}</p>
                    <p><i class="fas fa-phone"></i> ${profile.shelter.phone}</p>
                    <p><a href="${profile.shelter.website}" target="_blank" class="shelter-website">
                        <i class="fas fa-globe"></i> Visitar sitio web
                    </a></p>
                </div>
                
                <div class="profile-actions">
                    <button class="btn btn-success btn-lg" onclick="showAdoptionForm(${profile.id})">
                        <i class="fas fa-heart"></i> Adoptar
                    </button>
                    <button class="btn btn-primary btn-lg" onclick="startChat(${profile.id})">
                        <i class="fas fa-comments"></i> Chat
                    </button>
                    ${profile.shelter ? `
                        <button class="btn btn-outline-danger btn-lg" onclick="likePet(${profile.id})">
                            <i class="fas fa-heart"></i> Me Gusta
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    // Store current profile for adoption
    currentAdoptionPet = profile;
    
    const modal = new bootstrap.Modal(document.getElementById('detailedProfileModal'));
    modal.show();
}

function showAdoptionForm(profileId) {
    console.log('showAdoptionForm llamada con profileId:', profileId);
    console.log('currentAdoptionPet:', currentAdoptionPet);
    console.log('currentChat:', currentChat);
    
    let profile;
    if (profileId) {
        profile = profilesData.find(p => p.id === profileId);
        console.log('Perfil encontrado por ID:', profile);
    } else if (currentAdoptionPet) {
        profile = currentAdoptionPet;
        console.log('Usando currentAdoptionPet:', profile);
    } else if (currentChat) {
        profile = currentChat;
        console.log('Usando currentChat:', profile);
    }
    
    if (!profile) {
        console.error('No se encontró perfil para adopción');
        return;
    }
    
    // Generar formulario de adopción con starter pack
    const formContent = document.getElementById('adoptionFormContent');
    formContent.innerHTML = `
        <div class="adoption-form-content">
            <div class="pet-info-adoption">
                <div class="pet-image-adoption" style="background-image: url('${profile.image}')"></div>
                <div class="pet-details-adoption">
                    <h4>${profile.name}</h4>
                    <p>${profile.details.breed} - ${profile.age}</p>
                    <p class="pet-description-adoption">${profile.bio}</p>
                </div>
            </div>
            
            <div class="starter-pack-section">
                <h5><i class="fas fa-gift"></i> Starter Pack de Adopción</h5>
                <p>¿Te gustaría incluir un paquete de bienvenida para ${profile.name}?</p>
                
                <div class="starter-pack-options">
                    <div class="starter-pack-option">
                        <input type="radio" name="starterPack" value="basic" id="basicPack" checked>
                        <label for="basicPack" class="starter-pack-card">
                            <div class="pack-icon">🎁</div>
                            <h6>Paquete Básico - $50</h6>
                            <ul>
                                <li>Collar personalizado</li>
                                <li>Certificado de adopción</li>
                                <li>Comida para 1 mes</li>
                            </ul>
                        </label>
                    </div>
                    
                    <div class="starter-pack-option">
                        <input type="radio" name="starterPack" value="premium" id="premiumPack">
                        <label for="premiumPack" class="starter-pack-card">
                            <div class="pack-icon">💎</div>
                            <h6>Paquete Premium - $100</h6>
                            <ul>
                                <li>Collar personalizado</li>
                                <li>Certificado de adopción</li>
                                <li>Comida para 2 meses</li>
                                <li>Juguetes variados</li>
                                <li>Cama cómoda</li>
                            </ul>
                        </label>
                    </div>
                    
                    <div class="starter-pack-option">
                        <input type="radio" name="starterPack" value="none" id="noPack">
                        <label for="noPack" class="starter-pack-card">
                            <div class="pack-icon">❌</div>
                            <h6>Sin Paquete</h6>
                            <p>Solo adopción</p>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="adoption-form-fields">
                <h5><i class="fas fa-user"></i> Información Personal</h5>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="adopterName">Nombre Completo *</label>
                            <input type="text" class="form-control" id="adopterName" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="adopterEmail">Email *</label>
                            <input type="email" class="form-control" id="adopterEmail" required>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="adopterPhone">Teléfono *</label>
                            <input type="tel" class="form-control" id="adopterPhone" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="adopterAddress">Dirección *</label>
                            <input type="text" class="form-control" id="adopterAddress" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="adoptionReason">¿Por qué quieres adoptar a ${profile.name}? *</label>
                    <textarea class="form-control" id="adoptionReason" rows="3" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="petExperience">Experiencia con mascotas</label>
                    <textarea class="form-control" id="petExperience" rows="2"></textarea>
                </div>
            </div>
            
            <div class="adoption-form-actions">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" onclick="submitAdoptionForm(${profile.id})">
                    <i class="fas fa-heart"></i> Enviar Solicitud de Adopción
                </button>
            </div>
        </div>
    `;
    
    const adoptionModal = new bootstrap.Modal(document.getElementById('adoptionFormModal'));
    adoptionModal.show();
    
    console.log('Perfil seleccionado para adopción:', profile);
    
    currentAdoptionPet = profile;
}

function submitAdoptionForm() {
    const form = document.getElementById('adoptionForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const formData = {
        petId: currentAdoptionPet.id,
        petName: currentAdoptionPet.name,
        adopterName: document.getElementById('adopterName').value,
        adopterEmail: document.getElementById('adopterEmail').value,
        adopterPhone: document.getElementById('adopterPhone').value,
        adopterAddress: document.getElementById('adopterAddress').value,
        livingSituation: document.getElementById('livingSituation').value,
        experience: document.getElementById('experience').value,
        motivation: document.getElementById('motivation').value,
        includeStarterPack: document.getElementById('includeStarterPack').checked,
        starterPackPrice: document.getElementById('includeStarterPack').checked ? 50 : 0
    };
    
    // Simulate form submission
    showToast('¡Solicitud de adopción enviada exitosamente! Te contactaremos pronto.', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('adoptionModal'));
    modal.hide();
    
    // In a real app, this would send the data to a server
    console.log('Adoption form submitted:', formData);
    
    // Reset form
    form.reset();
    document.getElementById('includeStarterPack').checked = true;
}

// Update match modal to show detailed profile
function showMatchModal(profile) {
    document.getElementById('matchUserName').textContent = profile.name;
    currentChat = profile;
    
    const modal = new bootstrap.Modal(document.getElementById('matchModal'));
    modal.show();
    
    // Add celebration animation
    setTimeout(() => {
        const hearts = document.querySelectorAll('.match-hearts i');
        hearts.forEach((heart, index) => {
            heart.style.animation = `heartbeat 1s ease-in-out infinite`;
            heart.style.animationDelay = `${index * 0.2}s`;
        });
    }, 100);
    
    // Add click handler to match title to show detailed profile
    setTimeout(() => {
        const matchTitle = document.querySelector('.match-title');
        matchTitle.style.cursor = 'pointer';
        matchTitle.title = 'Click para ver perfil detallado';
        matchTitle.onclick = () => {
            modal.hide();
            showDetailedProfile(profile.id);
        };
    }, 100);
}

// New function to show pet info modal
function showPetInfoModal(profileId) {
    const profile = profilesData.find(p => p.id === profileId);
    if (!profile) return;
    
    const content = document.getElementById('petInfoContent');
    content.innerHTML = `
        <div class="pet-info-content">
            <div class="pet-image-large" style="background-image: url('${profile.image}')"></div>
            <div class="pet-details-info">
                <h3>${profile.name}</h3>
                <div class="detail-item-info">
                    <span class="detail-label-info">Edad:</span>
                    <span class="detail-value-info">${profile.age}</span>
                </div>
                <div class="detail-item-info">
                    <span class="detail-label-info">Raza:</span>
                    <span class="detail-value-info">${profile.details.breed}</span>
                </div>
                <div class="detail-item-info">
                    <span class="detail-label-info">Tamaño:</span>
                    <span class="detail-value-info">${profile.details.size}</span>
                </div>
                <div class="detail-item-info">
                    <span class="detail-label-info">Género:</span>
                    <span class="detail-value-info">${profile.details.gender}</span>
                </div>
                <div class="detail-item-info">
                    <span class="detail-label-info">Vacunado:</span>
                    <span class="detail-value-info">${profile.details.vaccinated ? 'Sí' : 'No'}</span>
                </div>
                <div class="detail-item-info">
                    <span class="detail-label-info">Esterilizado:</span>
                    <span class="detail-value-info">${profile.details.sterilized ? 'Sí' : 'No'}</span>
                </div>
                <div class="detail-item-info">
                    <span class="detail-label-info">Personalidad:</span>
                    <span class="detail-value-info">${profile.details.personality}</span>
                </div>
                <div class="detail-item-info">
                    <span class="detail-label-info">Necesidades especiales:</span>
                    <span class="detail-value-info">${profile.details.specialNeeds}</span>
                </div>
                
                <div class="shelter-info-detailed">
                    <h4><i class="fas fa-home"></i> Información del Refugio</h4>
                    <div class="shelter-logo" style="background-image: url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100&h=100&fit=crop')"></div>
                    <p><strong>${profile.shelter.name}</strong></p>
                    <p>${profile.shelter.description}</p>
                    <div class="shelter-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${profile.shelter.address}</span>
                    </div>
                    <div class="shelter-phone">
                        <i class="fas fa-phone"></i>
                        <span>${profile.shelter.phone}</span>
                    </div>
                    <a href="${profile.shelter.website}" target="_blank" class="shelter-website-link">
                        <i class="fas fa-globe"></i> Visitar sitio web del refugio
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Store current profile for adoption
    currentAdoptionPet = profile;
    
    const modal = new bootstrap.Modal(document.getElementById('petInfoModal'));
    modal.show();
}

// ===========================================
// NUEVAS FUNCIONALIDADES - ADOPCIÓN Y PUBLICACIÓN
// ===========================================

/**
 * Carga el grid de mascotas en estilo Netflix
 */
function loadPetsGrid() {
    const petsGrid = document.getElementById('petsGrid');
    if (!petsGrid) return;
    
    petsGrid.innerHTML = '';
    
    profilesData.forEach(profile => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        petCard.innerHTML = `
            <div class="pet-card-image" style="background-image: url('${profile.image}')">
                <div class="pet-card-overlay">
                    <button class="btn btn-light btn-sm" onclick="showPetDetails(${profile.id})">
                        <i class="fas fa-info-circle"></i> Ver Detalles
                    </button>
                </div>
            </div>
            <div class="pet-card-info">
                <div class="pet-card-name">${profile.name}</div>
                <div class="pet-card-breed">${profile.details.breed}</div>
                <div class="pet-card-age">${profile.age}</div>
                <div class="pet-card-description">${profile.bio}</div>
                <div class="pet-card-actions">
                    <button class="pet-card-btn primary" onclick="showPetDetails(${profile.id})">
                        <i class="fas fa-info-circle"></i> Más Detalles
                    </button>
                </div>
            </div>
        `;
        petsGrid.appendChild(petCard);
    });
}

/**
 * Muestra el modal del test de compatibilidad
 */
function showCompatibilityTestModal() {
    const modal = new bootstrap.Modal(document.getElementById('compatibilityTestModal'));
    loadCompatibilityTestModal();
    modal.show();
}

// Variables globales para el test paso a paso
let currentTestStep = 0;
let testQuestions = [];
let testAnswers = {};

/**
 * Carga el test de compatibilidad en el modal
 */
function loadCompatibilityTestModal() {
    const testContainer = document.getElementById('modalTestQuestions');
    if (!testContainer) return;
    
    // Obtener tipos de animales disponibles en la base de datos
    const availableAnimals = getAvailableAnimalTypes();
    
    testQuestions = [
        {
            id: 'animalType',
            question: '¿Qué tipo de animal te gustaría adoptar?',
            options: availableAnimals
        },
        {
            id: 'lifestyle',
            question: '¿Cuál es tu estilo de vida?',
            options: [
                { value: 'active', text: 'Muy activo', description: 'Me gusta hacer ejercicio y salir' },
                { value: 'moderate', text: 'Moderadamente activo', description: 'Me gusta caminar y actividades suaves' },
                { value: 'calm', text: 'Tranquilo', description: 'Prefiero actividades relajadas en casa' }
            ]
        },
        {
            id: 'time',
            question: '¿Cuánto tiempo puedes dedicar a una mascota?',
            options: [
                { value: 'lots', text: 'Mucho tiempo', description: 'Varias horas al día' },
                { value: 'moderate', text: 'Tiempo moderado', description: '1-2 horas al día' },
                { value: 'limited', text: 'Tiempo limitado', description: 'Menos de 1 hora al día' }
            ]
        },
        {
            id: 'space',
            question: '¿Qué tipo de espacio tienes?',
            options: [
                { value: 'house', text: 'Casa con patio', description: 'Espacio amplio para correr' },
                { value: 'apartment', text: 'Apartamento', description: 'Espacio moderado' },
                { value: 'small', text: 'Espacio pequeño', description: 'Apartamento pequeño' }
            ]
        }
    ];
    
    // Inicializar variables
    currentTestStep = 0;
    testAnswers = {};
    
    // Mostrar primera pregunta
    showTestQuestion(0);
    
    // Configurar navegación
    setupTestNavigation();
}

/**
 * Muestra una pregunta específica del test
 */
function showTestQuestion(step) {
    const testContainer = document.getElementById('modalTestQuestions');
    const question = testQuestions[step];
    
    testContainer.innerHTML = `
        <div class="test-question">
            <h4>${question.question}</h4>
            <div class="test-options">
                ${question.options.map(option => `
                    <label class="test-option">
                        <input type="radio" name="${question.id}" value="${option.value}">
                        <div class="option-content">
                            <div class="option-title">${option.text}</div>
                            ${option.description ? `<div class="option-description">${option.description}</div>` : ''}
                        </div>
                    </label>
                `).join('')}
            </div>
            </div>
        `;
    
    // Añadir event listeners para las opciones
    testContainer.querySelectorAll('.test-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remover selección previa del mismo grupo
            const name = this.querySelector('input').name;
            testContainer.querySelectorAll(`input[name="${name}"]`).forEach(input => {
                input.closest('.test-option').classList.remove('selected');
            });
            
            // Seleccionar la opción actual
            this.classList.add('selected');
            this.querySelector('input').checked = true;
            
            // Guardar respuesta
            testAnswers[question.id] = this.querySelector('input').value;
        });
    });
    
    // Restaurar respuesta si existe
    if (testAnswers[question.id]) {
        const selectedInput = testContainer.querySelector(`input[value="${testAnswers[question.id]}"]`);
        if (selectedInput) {
            selectedInput.checked = true;
            selectedInput.closest('.test-option').classList.add('selected');
        }
    }
    
    // Actualizar progreso
    updateTestProgress();
}

/**
 * Configura la navegación del test
 */
function setupTestNavigation() {
    const prevBtn = document.getElementById('prevQuestionBtn');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const applyBtn = document.getElementById('applyTestResultsBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentTestStep > 0) {
                currentTestStep--;
                showTestQuestion(currentTestStep);
                updateNavigationButtons();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentTestStep < testQuestions.length - 1) {
                currentTestStep++;
                showTestQuestion(currentTestStep);
                updateNavigationButtons();
            } else {
                // Última pregunta - aplicar filtros
                applyTestResults();
            }
        });
    }
    
    updateNavigationButtons();
}

/**
 * Actualiza los botones de navegación
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevQuestionBtn');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const applyBtn = document.getElementById('applyTestResultsBtn');
    
    if (prevBtn) {
        prevBtn.style.display = currentTestStep > 0 ? 'block' : 'none';
    }
    
    if (nextBtn) {
        if (currentTestStep === testQuestions.length - 1) {
            nextBtn.innerHTML = 'Finalizar <i class="fas fa-check"></i>';
            nextBtn.className = 'btn btn-success';
        } else {
            nextBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
            nextBtn.className = 'btn btn-light';
        }
    }
}

/**
 * Actualiza la barra de progreso
 */
function updateTestProgress() {
    const currentStepEl = document.getElementById('currentStep');
    const totalStepsEl = document.getElementById('totalSteps');
    const progressFill = document.getElementById('progressFill');
    
    if (currentStepEl) currentStepEl.textContent = currentTestStep + 1;
    if (totalStepsEl) totalStepsEl.textContent = testQuestions.length;
    if (progressFill) {
        const progress = ((currentTestStep + 1) / testQuestions.length) * 100;
        progressFill.style.width = progress + '%';
    }
}

/**
 * Obtiene los tipos de animales disponibles en la base de datos
 */
function getAvailableAnimalTypes() {
    const animalTypes = new Set();
    
    profilesData.forEach(pet => {
        // Extraer tipo de animal de la raza o detalles
        const breed = pet.details.breed.toLowerCase();
        if (breed.includes('perro') || breed.includes('dog') || breed.includes('labrador') || breed.includes('golden') || breed.includes('akita')) {
            animalTypes.add('perro');
        } else if (breed.includes('gato') || breed.includes('cat') || breed.includes('siamés') || breed.includes('persa')) {
            animalTypes.add('gato');
        } else {
            animalTypes.add('otro');
        }
    });
    
    // Convertir a opciones del test
    const options = [];
    if (animalTypes.has('perro')) {
        options.push({ value: 'perro', text: '🐕 Perro', description: 'Compañero leal y activo' });
    }
    if (animalTypes.has('gato')) {
        options.push({ value: 'gato', text: '🐱 Gato', description: 'Independiente y cariñoso' });
    }
    if (animalTypes.has('otro')) {
        options.push({ value: 'otro', text: '🐾 Otro', description: 'Otras mascotas disponibles' });
    }
    
    return options;
}

/**
 * Verifica si es la primera vez que el usuario visita la sección de adopción
 */
function isFirstTimeUser() {
    return !localStorage.getItem('hasSeenAdoptionTest');
}

/**
 * Marca que el usuario ya ha visto el test
 */
function markTestAsSeen() {
    localStorage.setItem('hasSeenAdoptionTest', 'true');
}

/**
 * Carga el test de compatibilidad (versión antigua para compatibilidad)
 */
function loadCompatibilityTest() {
    // Esta función se mantiene para compatibilidad pero ya no se usa
    console.log('loadCompatibilityTest called - using modal version instead');
}

/**
 * Aplica filtros a las mascotas
 */
function applyFilters() {
    const animalType = document.getElementById('animalTypeFilter').value;
    const size = document.getElementById('sizeFilter').value;
    const age = document.getElementById('ageFilter').value;
    
    let filteredPets = [...profilesData];
    
    if (animalType) {
        filteredPets = filteredPets.filter(pet => 
            pet.details.breed.toLowerCase().includes(animalType.toLowerCase())
        );
    }
    
    if (size) {
        filteredPets = filteredPets.filter(pet => 
            pet.details.size.toLowerCase() === size.toLowerCase()
        );
    }
    
    if (age) {
        filteredPets = filteredPets.filter(pet => {
            const petAge = pet.age.toLowerCase();
            if (age === 'cachorro') return petAge.includes('mes') || petAge.includes('año') && parseInt(petAge) < 2;
            if (age === 'joven') return petAge.includes('año') && parseInt(petAge) >= 2 && parseInt(petAge) < 5;
            if (age === 'adulto') return petAge.includes('año') && parseInt(petAge) >= 5;
            return true;
        });
    }
    
    // Actualizar el grid con mascotas filtradas
    updatePetsGrid(filteredPets);
}

/**
 * Limpia los filtros
 */
function clearFilters() {
    document.getElementById('animalTypeFilter').value = '';
    document.getElementById('sizeFilter').value = '';
    document.getElementById('ageFilter').value = '';
    loadPetsGrid();
}

/**
 * Actualiza el grid de mascotas con una lista filtrada
 */
function updatePetsGrid(pets) {
    const petsGrid = document.getElementById('petsGrid');
    if (!petsGrid) return;
    
    petsGrid.innerHTML = '';
    
    if (pets.length === 0) {
        petsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No se encontraron mascotas</h3>
                <p>Intenta ajustar los filtros para ver más resultados</p>
            </div>
        `;
        return;
    }
    
    pets.forEach(profile => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        petCard.innerHTML = `
            <div class="pet-card-image" style="background-image: url('${profile.image}')">
                <div class="pet-card-overlay">
                    <button class="btn btn-light btn-sm" onclick="showPetDetails(${profile.id})">
                        <i class="fas fa-info-circle"></i> Ver Detalles
                    </button>
                </div>
            </div>
            <div class="pet-card-info">
                <div class="pet-card-name">${profile.name}</div>
                <div class="pet-card-breed">${profile.details.breed}</div>
                <div class="pet-card-age">${profile.age}</div>
                <div class="pet-card-description">${profile.bio}</div>
                <div class="pet-card-actions">
                    <button class="pet-card-btn primary" onclick="showPetDetails(${profile.id})">
                        <i class="fas fa-info-circle"></i> Más Detalles
                    </button>
                </div>
            </div>
        `;
        petsGrid.appendChild(petCard);
    });
}

/**
 * Aplica los resultados del test de compatibilidad
 */
function applyTestResults() {
    // Usar las respuestas del test paso a paso
    const answers = testAnswers;
    
    // Verificar que se hayan respondido todas las preguntas
    const requiredQuestions = ['animalType', 'lifestyle', 'time', 'space'];
    const answeredQuestions = Object.keys(answers);
    
    if (answeredQuestions.length < requiredQuestions.length) {
        showToast('Por favor responde todas las preguntas del test', 'error');
        return;
    }
    
    // Marcar que el usuario ya ha visto el test
    markTestAsSeen();
    
    // Calcular compatibilidad basada en respuestas
    let compatiblePets = [...profilesData];
    
    // Filtrar por tipo de animal
    if (answers.animalType) {
        compatiblePets = compatiblePets.filter(pet => {
            const breed = pet.details.breed.toLowerCase();
            if (answers.animalType === 'perro') {
                return breed.includes('perro') || breed.includes('dog') || breed.includes('labrador') || breed.includes('golden') || breed.includes('akita');
            } else if (answers.animalType === 'gato') {
                return breed.includes('gato') || breed.includes('cat') || breed.includes('siamés') || breed.includes('persa');
            } else if (answers.animalType === 'otro') {
                return !breed.includes('perro') && !breed.includes('gato') && !breed.includes('dog') && !breed.includes('cat');
            }
            return true;
        });
    }
    
    // Filtrar basado en estilo de vida
    if (answers.lifestyle === 'active') {
        compatiblePets = compatiblePets.filter(pet => 
            pet.details.personality.toLowerCase().includes('juguetón') || 
            pet.details.personality.toLowerCase().includes('activo')
        );
    } else if (answers.lifestyle === 'calm') {
        compatiblePets = compatiblePets.filter(pet => 
            pet.details.personality.toLowerCase().includes('tranquilo') || 
            pet.details.personality.toLowerCase().includes('calmado')
        );
    }
    
    // Filtrar por espacio
    if (answers.space === 'small') {
        compatiblePets = compatiblePets.filter(pet => 
            pet.details.size.toLowerCase() === 'pequeño'
        );
    } else if (answers.space === 'apartment') {
        compatiblePets = compatiblePets.filter(pet => 
            pet.details.size.toLowerCase() !== 'grande'
        );
    }
    
    // Filtrar por tiempo disponible
    if (answers.time === 'limited') {
        compatiblePets = compatiblePets.filter(pet => 
            pet.details.personality.toLowerCase().includes('tranquilo') ||
            pet.details.personality.toLowerCase().includes('dócil')
        );
    }
    
    // Mostrar resultados
    updatePetsGrid(compatiblePets);
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('compatibilityTestModal'));
    modal.hide();
    
    // Mostrar mensaje de resultados
    showToast(`Se encontraron ${compatiblePets.length} mascotas compatibles con tu perfil`, 'success');
}

/**
 * Muestra sugerencias basadas en el test de compatibilidad (versión antigua)
 */
function showCompatibilityResults() {
    // Esta función se mantiene para compatibilidad
    console.log('showCompatibilityResults called - using modal version instead');
}

/**
 * Da like a una mascota desde el grid
 */
function likePet(profileId) {
    console.log('likePet llamada con ID:', profileId);
    const profile = profilesData.find(p => p.id === profileId);
    if (profile) {
        console.log('Perfil encontrado:', profile.name);
        addToLikes(profile, 'like');
        showToast(`¡Te gusta ${profile.name}!`, 'success');
    } else {
        console.error('No se encontró el perfil con ID:', profileId);
    }
}

/**
 * Muestra detalles de una mascota
 */
function showPetDetails(profileId) {
    showDetailedProfile(profileId);
}

/**
 * Maneja la subida de fotos
 */
function handlePhotoUpload(input, photoNumber) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoItem = document.getElementById(`photo${photoNumber}`);
            photoItem.innerHTML = `
                <img src="${e.target.result}" class="photo-preview" alt="Foto ${photoNumber}">
                <button class="btn btn-sm btn-danger photo-remove" onclick="removePhoto(${photoNumber})" style="position: absolute; top: 5px; right: 5px;">
                    <i class="fas fa-times"></i>
                </button>
            `;
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Remueve una foto
 */
function removePhoto(photoNumber) {
    const photoItem = document.getElementById(`photo${photoNumber}`);
    photoItem.innerHTML = `
        <div class="photo-upload-placeholder">
            <i class="fas fa-camera"></i>
            <span>Foto ${photoNumber}</span>
        </div>
        <input type="file" class="photo-input" accept="image/*" onchange="handlePhotoUpload(this, ${photoNumber})">
    `;
}

/**
 * Apadrina una mascota
 */
function sponsorPet(petId) {
    const petNames = ['Luna', 'Max', 'Mittens'];
    const amounts = [25, 30, 20];
    const petName = petNames[petId - 1] || 'Mascota';
    const amount = amounts[petId - 1] || 25;
    
    showToast(`¡Gracias por apadrinar a ${petName}! Tu contribución de $${amount}/mes les ayudará mucho.`, 'success');
}

/**
 * Maneja el envío del formulario de publicación
 */
function handlePublishForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('petName').value,
        age: document.getElementById('petAge').value,
        breed: document.getElementById('petBreed').value,
        size: document.getElementById('petSize').value,
        gender: document.getElementById('petGender').value,
        type: document.getElementById('petType').value,
        bio: document.getElementById('petBio').value,
        vaccinated: document.getElementById('petVaccinated').checked,
        sterilized: document.getElementById('petSterilized').checked,
        specialNeeds: document.getElementById('petSpecialNeeds').value,
        ownerName: document.getElementById('ownerName').value,
        ownerPhone: document.getElementById('ownerPhone').value,
        ownerEmail: document.getElementById('ownerEmail').value,
        ownerLocation: document.getElementById('ownerLocation').value
    };
    
    // Crear nuevo perfil de mascota
    const newPet = createNewPetProfile(formData);
    
    // Añadir a la base de datos
    addPetToDatabase(newPet);
    
    // Simular publicación
    showToast('¡Mascota publicada exitosamente! Los interesados podrán contactarte.', 'success');
    
    // Limpiar formulario
    document.getElementById('publishPetForm').reset();
    
    console.log('Mascota publicada:', newPet);
}

/**
 * Crea un nuevo perfil de mascota basado en los datos del formulario
 */
function createNewPetProfile(formData) {
    // Generar ID único
    const newId = Math.max(...profilesData.map(p => p.id)) + 1;
    
    // Crear perfil con estructura similar a los existentes
    const newPet = {
        id: newId,
        name: formData.name,
        age: formData.age,
        bio: formData.bio,
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop", // Imagen por defecto
        images: [
            "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
        ],
        interests: generateInterests(formData),
        shelter: {
            id: 999, // ID especial para mascotas publicadas por usuarios
            name: "Publicado por Usuario",
            address: formData.ownerLocation,
            phone: formData.ownerPhone,
            website: "#",
            description: `Mascota publicada por ${formData.ownerName}`
        },
        details: {
            breed: formData.breed,
            size: formData.size,
            gender: formData.gender,
            vaccinated: formData.vaccinated,
            sterilized: formData.sterilized,
            specialNeeds: formData.specialNeeds || "Ninguna",
            personality: generatePersonality(formData)
        }
    };
    
    return newPet;
}

/**
 * Genera intereses basados en los datos del formulario
 */
function generateInterests(formData) {
    const interests = [];
    
    if (formData.vaccinated) interests.push("Vacunado");
    if (formData.sterilized) interests.push("Esterilizado");
    if (formData.size === 'pequeño') interests.push("Pequeño");
    if (formData.size === 'grande') interests.push("Grande");
    if (formData.specialNeeds) interests.push("Necesidades especiales");
    
    return interests;
}

/**
 * Genera personalidad basada en los datos del formulario
 */
function generatePersonality(formData) {
    let personality = [];
    
    if (formData.size === 'pequeño') personality.push("tranquilo");
    if (formData.size === 'grande') personality.push("activo");
    if (formData.vaccinated && formData.sterilized) personality.push("saludable");
    if (formData.specialNeeds) personality.push("especial");
    
    return personality.join(", ") || "cariñoso, amigable";
}

/**
 * Añade una nueva mascota a la base de datos
 */
function addPetToDatabase(newPet) {
    // Añadir a la base de datos local
    profilesData.push(newPet);
    
    // Guardar en localStorage para persistencia
    localStorage.setItem('publishedPets', JSON.stringify(profilesData));
    
    // Actualizar la base de datos global
    if (window.PetMatchData) {
        window.PetMatchData.profiles = profilesData;
    }
    
    console.log('Mascota añadida a la base de datos:', newPet);
}

/**
 * Muestra una foto en modal
 */
function showPhotoModal(imageUrl) {
    // Crear modal dinámico para mostrar foto
    const modalHtml = `
        <div class="modal fade" id="photoModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Foto de la Mascota</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${imageUrl}" class="img-fluid rounded" alt="Foto de la mascota" style="max-height: 500px;">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si existe
    const existingModal = document.getElementById('photoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar nuevo modal al body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('photoModal'));
    modal.show();
    
    // Limpiar modal cuando se cierre
    document.getElementById('photoModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Asignar funciones globales
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;
window.showCompatibilityResults = showCompatibilityResults;
window.showCompatibilityTestModal = showCompatibilityTestModal;
window.applyTestResults = applyTestResults;
window.likePet = likePet;
window.showPetDetails = showPetDetails;
window.handlePhotoUpload = handlePhotoUpload;
window.removePhoto = removePhoto;
window.sponsorPet = sponsorPet;
window.handlePublishForm = handlePublishForm;
window.showPhotoModal = showPhotoModal;
window.startChat = startChat;
window.submitAdoptionForm = submitAdoptionForm;
window.showLikedPets = showLikedPets;
window.sponsorIndividualPet = sponsorIndividualPet;

/**
 * Inicia un chat con una mascota (solo si está en likes desde adopción)
 */
function startChat(profileId) {
    const profile = profilesData.find(p => p.id === profileId);
    if (!profile) {
        showToast('Perfil no encontrado', 'error');
        return;
    }
    
    // Verificar que el perfil esté en likes (solo desde adopción)
    const isLiked = likes.find(like => like.id === profileId);
    if (!isLiked) {
        showToast('Debes darle "Me gusta" a esta mascota desde la sección de adopción para poder chatear', 'info');
        return;
    }
    
    console.log('Iniciando chat con:', profile.name, 'ID:', profileId);
    
    // Guardar el perfil actual para el chat
    currentChat = profile;
    
    // Cerrar todos los modales abiertos
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();
    });
    
    // Mostrar sección de mensajería con el perfil correcto
    showMessagesSection(profile);
    
    showToast(`Iniciando chat con ${profile.name}`, 'success');
}

/**
 * Envía el formulario de adopción
 */
function submitAdoptionForm(profileId) {
    const profile = profilesData.find(p => p.id === profileId);
    if (!profile) return;
    
    // Recopilar datos del formulario
    const formData = {
        petId: profileId,
        petName: profile.name,
        adopterName: document.getElementById('adopterName').value,
        adopterEmail: document.getElementById('adopterEmail').value,
        adopterPhone: document.getElementById('adopterPhone').value,
        adopterAddress: document.getElementById('adopterAddress').value,
        adoptionReason: document.getElementById('adoptionReason').value,
        petExperience: document.getElementById('petExperience').value,
        starterPack: document.querySelector('input[name="starterPack"]:checked').value
    };
    
    // Validar campos requeridos
    if (!formData.adopterName || !formData.adopterEmail || !formData.adopterPhone || !formData.adopterAddress || !formData.adoptionReason) {
        showToast('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    // Simular envío del formulario
    console.log('Formulario de adopción enviado:', formData);
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('adoptionFormModal'));
    if (modal) modal.hide();
    
    showToast(`¡Solicitud de adopción enviada para ${profile.name}! Te contactaremos pronto.`, 'success');
}

/**
 * Muestra la página de mascotas favoritas
 */

/**
 * Carga las mascotas favoritas en la página dedicada
 */
function loadFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (!favoritesGrid) return;
    
    // Obtener mascotas que han recibido me gusta
    const likedPets = profilesData.filter(pet => likes.some(like => like.id === pet.id));
    
    if (likedPets.length === 0) {
        favoritesGrid.innerHTML = `
            <div class="no-favorites">
                <div class="no-favorites-content">
                    <i class="fas fa-heart"></i>
                    <h2>No tienes mascotas favoritas aún</h2>
                    <p>¡Explora las mascotas disponibles y dales me gusta!</p>
                    <button class="btn btn-primary btn-lg" onclick="showAdoptionSection()">
                        <i class="fas fa-heart"></i> Buscar Mascotas
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    favoritesGrid.innerHTML = '';
    
    likedPets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.className = 'favorite-pet-card';
        petCard.innerHTML = `
            <div class="favorite-pet-header">
                <div class="favorite-pet-image" style="background-image: url('${pet.image}')"></div>
                <div class="favorite-pet-intro">
                    <h2>¡Hola! Soy ${pet.name}</h2>
                    <p class="favorite-pet-age">Tengo ${pet.age}</p>
                    <p class="favorite-pet-breed">Soy un ${pet.details.breed}</p>
                    <div class="favorite-pet-personality">
                        <span class="personality-tag">${pet.details.personality}</span>
                    </div>
                </div>
            </div>
            
            <div class="favorite-pet-story">
                <h3><i class="fas fa-heart"></i> Mi Historia</h3>
                <p class="favorite-pet-bio">${pet.bio}</p>
            </div>
            
            <div class="favorite-pet-shelter-photos">
                <h3><i class="fas fa-camera"></i> Fotos mías en el refugio</h3>
                <div class="shelter-photos-grid">
                    ${pet.shelterPhotos ? pet.shelterPhotos.map(photo => `
                        <div class="shelter-photo" style="background-image: url('${photo}')" onclick="showPhotoModal('${photo}')"></div>
                    `).join('') : ''}
                </div>
            </div>
            
            <div class="favorite-pet-social-videos">
                <h3><i class="fas fa-video"></i> Videos de mí en redes sociales</h3>
                <div class="videos-grid">
                    ${pet.socialVideos ? pet.socialVideos.map(video => `
                        <div class="video-card">
                            <h4>${video.title}</h4>
                            <p>${video.description}</p>
                            <div class="video-container">
                                <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </div>
                    `).join('') : ''}
                </div>
            </div>
            
            <div class="favorite-pet-shelter-info">
                <h3><i class="fas fa-home"></i> Mi Refugio</h3>
                <div class="shelter-card">
                    <h4>${pet.shelter.name}</h4>
                    <p>${pet.shelter.description}</p>
                    <div class="shelter-contact">
                        <p><i class="fas fa-map-marker-alt"></i> ${pet.shelter.address}</p>
                        <p><i class="fas fa-phone"></i> ${pet.shelter.phone}</p>
                        <div class="shelter-social">
                            <a href="#" target="_blank"><i class="fab fa-instagram"></i> ${pet.shelter.socialMedia.instagram}</a>
                            <a href="#" target="_blank"><i class="fab fa-facebook"></i> ${pet.shelter.socialMedia.facebook}</a>
                            <a href="#" target="_blank"><i class="fab fa-tiktok"></i> ${pet.shelter.socialMedia.tiktok}</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="favorite-pet-actions">
                <button class="btn btn-success btn-lg" onclick="sponsorIndividualPet(${pet.id})">
                    <i class="fas fa-heart"></i> Patrocinarme
                </button>
                <button class="btn btn-primary btn-lg" onclick="startChat(${pet.id})">
                    <i class="fas fa-comments"></i> Chatear conmigo
                </button>
                <button class="btn btn-outline-primary btn-lg" onclick="showAdoptionForm(${pet.id})">
                    <i class="fas fa-home"></i> Adoptarme
                </button>
            </div>
        `;
        favoritesGrid.appendChild(petCard);
    });
}

/**
 * Patrocina una mascota individual
 */
function sponsorIndividualPet(profileId) {
    const profile = profilesData.find(p => p.id === profileId);
    if (!profile) return;
    
    // Crear modal de patrocinio individual
    const modalHtml = `
        <div class="modal fade" id="individualSponsorModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-heart"></i> Patrocinar a ${profile.name}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="sponsor-pet-info">
                            <div class="sponsor-pet-image" style="background-image: url('${profile.image}')"></div>
                            <div class="sponsor-pet-details">
                                <h4>${profile.name}</h4>
                                <p>${profile.details.breed} - ${profile.age}</p>
                                <p class="sponsor-pet-description">${profile.bio}</p>
                            </div>
                        </div>
                        
                        <div class="sponsor-options">
                            <h5>Selecciona el tipo de patrocinio:</h5>
                            <div class="sponsor-amounts">
                                <button class="btn btn-outline-primary sponsor-amount-btn" onclick="selectSponsorAmount(25, ${profileId})">
                                    $25/mes
                                </button>
                                <button class="btn btn-outline-primary sponsor-amount-btn" onclick="selectSponsorAmount(50, ${profileId})">
                                    $50/mes
                                </button>
                                <button class="btn btn-outline-primary sponsor-amount-btn" onclick="selectSponsorAmount(100, ${profileId})">
                                    $100/mes
                                </button>
                            </div>
                            
                            <div class="sponsor-form mt-4">
                                <div class="form-group">
                                    <label for="sponsorName">Tu nombre</label>
                                    <input type="text" class="form-control" id="sponsorName" placeholder="Tu nombre completo">
                                </div>
                                <div class="form-group">
                                    <label for="sponsorEmail">Tu email</label>
                                    <input type="email" class="form-control" id="sponsorEmail" placeholder="tu@email.com">
                                </div>
                                <div class="form-group">
                                    <label for="sponsorMessage">Mensaje para ${profile.name} (opcional)</label>
                                    <textarea class="form-control" id="sponsorMessage" rows="3" placeholder="Escribe un mensaje de apoyo..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-success" onclick="confirmIndividualSponsorship(${profileId})">
                            <i class="fas fa-heart"></i> Confirmar Patrocinio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal anterior si existe
    const existingModal = document.getElementById('individualSponsorModal');
    if (existingModal) existingModal.remove();
    
    // Añadir nuevo modal al DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('individualSponsorModal'));
    modal.show();
}

/**
 * Selecciona el monto de patrocinio
 */
function selectSponsorAmount(amount, profileId) {
    // Remover selección anterior
    document.querySelectorAll('.sponsor-amount-btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });
    
    // Seleccionar nuevo monto
    event.target.classList.remove('btn-outline-primary');
    event.target.classList.add('btn-primary');
    
    // Guardar monto seleccionado
    event.target.dataset.selectedAmount = amount;
}

/**
 * Confirma el patrocinio individual
 */
function confirmIndividualSponsorship(profileId) {
    const profile = profilesData.find(p => p.id === profileId);
    if (!profile) return;
    
    const sponsorName = document.getElementById('sponsorName').value;
    const sponsorEmail = document.getElementById('sponsorEmail').value;
    const sponsorMessage = document.getElementById('sponsorMessage').value;
    const selectedAmount = document.querySelector('.sponsor-amount-btn.btn-primary')?.dataset.selectedAmount;
    
    if (!sponsorName || !sponsorEmail || !selectedAmount) {
        showToast('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    // Simular patrocinio
    console.log('Patrocinio individual confirmado:', {
        petId: profileId,
        petName: profile.name,
        sponsorName,
        sponsorEmail,
        sponsorMessage,
        amount: selectedAmount
    });
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('individualSponsorModal'));
    if (modal) modal.hide();
    
    showToast(`¡Patrocinio confirmado para ${profile.name}! Gracias por tu generosidad.`, 'success');
}

// ===========================================
// FIN DEL ARCHIVO
// ===========================================

console.log('Script.js cargado completamente');