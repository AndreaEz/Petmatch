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
// FUNCIONES DEL BOTÓN IA (Chat IA)
// ===========================================

/**
 * Alterna la visibilidad del botón de chat IA
 */
function toggleChatIA() {
    const chatButton = document.getElementById('chatIAButton');
    if (chatButton) {
        if (chatButton.style.display === 'none' || chatButton.style.display === '') {
            chatButton.style.display = 'flex';
        } else {
            chatButton.style.display = 'none';
        }
    }
}

/**
 * Oculta el botón de chat IA
 */
function hideChatIAButton() {
    const chatButton = document.getElementById('chatIAButton');
    if (chatButton) {
        chatButton.style.display = 'none';
    }
}

// ===========================================
// FUNCIONES DE NAVEGACIÓN (DISPONIBLES INMEDIATAMENTE)
// ===========================================

// Definir las funciones inmediatamente y asignarlas al objeto window

/**
 * Muestra la sección de swipe de tarjetas
 */
function showSwipeSection() {
    console.log('Navegando a sección de swipe...');
    try {
        // Ocultar todas las secciones
        const sections = ['welcomeScreen', 'likesSection', 'matchesSection', 'messagesSection', 'petCareSection', 'donationSection'];
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('d-none');
            }
        });
        
        // Mostrar sección de swipe
        const swipeContainer = document.getElementById('swipeContainer');
        if (swipeContainer) {
            swipeContainer.classList.remove('d-none');
            console.log('Sección de swipe mostrada');
        } else {
            console.error('Elemento swipeContainer no encontrado');
        }
    } catch (error) {
        console.error('Error en showSwipeSection:', error);
    }
}

/**
 * Muestra la sección de cuidado de mascotas
 */
function showPetCareSection() {
    console.log('Navegando a sección de cuidado de mascotas...');
    try {
        // Ocultar todas las secciones
        const sections = ['welcomeScreen', 'swipeContainer', 'likesSection', 'matchesSection', 'messagesSection', 'donationSection'];
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
        const sections = ['welcomeScreen', 'swipeContainer', 'likesSection', 'matchesSection', 'messagesSection', 'petCareSection'];
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
        const sections = ['swipeContainer', 'likesSection', 'matchesSection', 'messagesSection', 'petCareSection', 'donationSection', 'adoptionSection', 'publishSection'];
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
        const sections = ['welcomeScreen', 'swipeContainer', 'likesSection', 'matchesSection', 'messagesSection', 'petCareSection', 'donationSection', 'publishSection'];
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
window.showSwipeSection = showSwipeSection;
window.showPetCareSection = showPetCareSection;
window.showDonationSection = showDonationSection;
window.showWelcomeScreen = showWelcomeScreen;
window.showAdoptionSection = showAdoptionSection;
window.showPublishSection = showPublishSection;

console.log('Funciones de navegación cargadas y disponibles globalmente');
console.log('showSwipeSection disponible:', typeof window.showSwipeSection);
console.log('showPetCareSection disponible:', typeof window.showPetCareSection);
console.log('showDonationSection disponible:', typeof window.showDonationSection);

// Verificación adicional después de un breve delay
setTimeout(function() {
    console.log('Verificación final de funciones:');
    console.log('showSwipeSection:', typeof window.showSwipeSection);
    console.log('showPetCareSection:', typeof window.showPetCareSection);
    console.log('showDonationSection:', typeof window.showDonationSection);
    
    if (typeof window.showSwipeSection === 'function') {
        console.log('✅ Todas las funciones están correctamente cargadas');
    } else {
        console.error('❌ Error: Las funciones no se cargaron correctamente');
    }
}, 100);

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
        console.log('Creando tarjetas de perfiles...');
        createProfileCards();
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

    // Asegurar que cada like tenga su chat correspondiente
    syncMatchesWithLikes();
}

/**
 * Sincroniza los matches con los likes existentes (usa la vista de adopciones)
 */
function syncMatchesWithLikes() {
    let matchesUpdated = false;

    likes.forEach(like => {
        const alreadyMatched = matches.some(match => match.id === like.id);
        if (alreadyMatched) {
            return;
        }

        const profile = profilesData.find(p => p.id === like.id);
        if (!profile) {
            return;
        }

        matches.push({
            id: profile.id,
            name: profile.name,
            image: profile.image,
            matchedAt: like.likedAt || new Date().toISOString()
        });
        matchesUpdated = true;
    });

    if (matchesUpdated) {
        saveMatches();
        updateCounters();
    }
}

/**
 * Configura todos los event listeners de la aplicación
 * Asocia eventos de botones con sus respectivas funciones
 */
function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    // Botones de acción principal (pass y like)
    const passBtn = document.getElementById('passBtn');
    const likeBtn = document.getElementById('likeBtn');
    
    if (passBtn) {
        passBtn.addEventListener('click', () => {
            console.log('Botón PASS clickeado');
            handleAction('pass');
        });
        console.log('Event listener de PASS configurado');
    } else {
        console.error('Botón passBtn no encontrado');
    }
    
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            console.log('Botón LIKE clickeado');
            handleAction('like');
        });
        console.log('Event listener de LIKE configurado');
    } else {
        console.error('Botón likeBtn no encontrado');
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
    window.resetProfiles = resetProfiles;
    
    console.log('Funciones adicionales asignadas globalmente');
    console.log('showAdoptionForm disponible:', typeof window.showAdoptionForm);
    
    console.log('Funciones globales configuradas');
    
    // Botones del menú principal (welcome screen)
    const swipeBtn = document.getElementById('swipeBtn');
    const careBtn = document.getElementById('careBtn');
    const donationBtn = document.getElementById('donationBtn');
    
    if (swipeBtn) {
        swipeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón Swipe clickeado');
            showSwipeSection();
        });
        console.log('Event listener de Swipe configurado');
    } else {
        console.error('Botón swipeBtn no encontrado');
    }
    
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
    document.getElementById('homeBtn').addEventListener('click', showWelcomeScreen);
    // Si el corazón es un enlace a favorites.html, no sobreescribir navegación SPA
    const likesBtn = document.getElementById('likesBtn');
    if (likesBtn && (!likesBtn.getAttribute('href') || likesBtn.getAttribute('href') === '#')) {
        likesBtn.addEventListener('click', showLikesSection);
    }
    document.getElementById('matchesBtn').addEventListener('click', showMatchesSection);
    document.getElementById('profileBtn').addEventListener('click', showProfile);
    document.getElementById('backToSwipeBtn').addEventListener('click', showSwipeSection);
    document.getElementById('backToSwipeFromLikesBtn').addEventListener('click', showSwipeSection);
    document.getElementById('backToMatchesBtn').addEventListener('click', showMatchesSection);
    document.getElementById('backToWelcomeBtn').addEventListener('click', showWelcomeScreen);
    document.getElementById('backToWelcomeFromDonationBtn').addEventListener('click', showWelcomeScreen);
    document.getElementById('backToWelcomeFromSwipeBtn').addEventListener('click', showWelcomeScreen);
    document.getElementById('backToWelcomeFromFavoritesBtn').addEventListener('click', showWelcomeScreen);
    
    // Event listeners para botones del modal de información
    document.getElementById('likeFromInfoBtn').addEventListener('click', function() {
        if (currentAdoptionPet) {
            likePet(currentAdoptionPet.id);
            const modal = bootstrap.Modal.getInstance(document.getElementById('petInfoModal'));
            if (modal) modal.hide();
        }
    });
    
    document.getElementById('chatFromInfoBtn').addEventListener('click', function() {
        if (currentAdoptionPet) {
            startChat(currentAdoptionPet.id);
            const modal = bootstrap.Modal.getInstance(document.getElementById('petInfoModal'));
            if (modal) modal.hide();
        }
    });
    
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
    document.getElementById('clearLikesBtn').addEventListener('click', showDeleteConfirmation);
    document.getElementById('confirmDeleteBtn').addEventListener('click', clearAllLikes);
    
    // Funcionalidad de mensajes
    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Modal de match - botón para enviar mensaje inmediatamente
    document.getElementById('sendMessageNowBtn').addEventListener('click', function() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('matchModal'));
        modal.hide();
        showMessagesSection(currentChat);
    });
    
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
    
    // Botones de navegación adicionales
    const backToWelcomeFromAdoptionBtn = document.getElementById('backToWelcomeFromAdoptionBtn');
    const backToWelcomeFromPublishBtn = document.getElementById('backToWelcomeFromPublishBtn');
    
    if (backToWelcomeFromAdoptionBtn) {
        backToWelcomeFromAdoptionBtn.addEventListener('click', showWelcomeScreen);
    }
    
    if (backToWelcomeFromPublishBtn) {
        backToWelcomeFromPublishBtn.addEventListener('click', showWelcomeScreen);
    }
}

/**
 * Crea las tarjetas de perfiles para mostrar en el stack
 * Genera hasta 3 tarjetas apiladas con efecto de profundidad
 */
function createProfileCards() {
    const cardStack = document.getElementById('cardStack');
    cardStack.innerHTML = '';
    
    // Crear tarjetas para los próximos 3 perfiles (máximo)
    for (let i = 0; i < Math.min(appConfig.maxProfilesPerLoad, profilesData.length - currentCardIndex); i++) {
        const profile = profilesData[currentCardIndex + i];
        const card = createProfileCard(profile, i);
        cardStack.appendChild(card);
    }
    
    // Configurar funcionalidad de swipe para la tarjeta superior
    // Esperar un poco para asegurar que las tarjetas estén completamente renderizadas
    setTimeout(() => {
        setupSwipeFunctionality();
    }, 100);
}

/**
 * Crea una tarjeta individual de perfil con toda su información
 * @param {Object} profile - Datos del perfil de la mascota
 * @param {number} index - Índice de la tarjeta en el stack (0 = superior)
 * @returns {HTMLElement} - Elemento HTML de la tarjeta creada
 */
function createProfileCard(profile, index) {
    const card = document.createElement('div');
    card.className = 'profile-card';
    
    // Configurar z-index y transformaciones para efecto de apilamiento
    card.style.zIndex = 3 - index;
    card.style.transform = `scale(${1 - index * 0.05}) translateY(${index * 10}px)`;
    card.dataset.profileId = profile.id;
    
    // Desactivar animaciones CSS automáticas
    card.style.animation = 'none';
    card.style.opacity = '1';
    card.style.transition = 'none';
    
    // Aplicar animación manual solo si es necesario
    if (index === 0) {
        // Solo la primera tarjeta tiene una animación suave de entrada
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease-out';
            card.style.opacity = '1';
        }, 50);
    }
    
    // Generar HTML de la tarjeta con imagen, información y overlays
    card.innerHTML = `
        <div class="profile-image" style="background-image: url('${profile.image}')"></div>
        <div class="profile-info">
            <div class="profile-name">${profile.name}</div>
            <div class="profile-age">${profile.age}</div>
            <div class="profile-bio">${profile.bio}</div>
        </div>
        <div class="like-overlay">LIKE</div>
        <div class="pass-overlay">PASS</div>
    `;
    
    return card;
}

/**
 * Configura la funcionalidad de swipe para la tarjeta superior
 * Utiliza Hammer.js para detectar gestos de deslizamiento
 */
function setupSwipeFunctionality() {
    const topCard = document.querySelector('.profile-card');
    if (!topCard) {
        console.log('No hay tarjeta superior para configurar swipe');
        return;
    }
    
    // Asegurar que la tarjeta esté en posición inicial sin animaciones
    topCard.style.transform = '';
    topCard.style.opacity = '1';
    topCard.style.transition = 'none';
    topCard.style.animation = 'none';
    
    // Esperar un poco antes de configurar el swipe para evitar conflictos
    setTimeout(() => {
        topCard.style.transition = 'all 0.3s ease-out';
        
        const hammer = new Hammer(topCard);
        
        // Configurar dirección de pan (solo horizontal para evitar movimientos accidentales)
        hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        
        console.log('Swipe configurado para la tarjeta superior');
        
        // Evento cuando comienza el swipe
        hammer.on('panstart', function(e) {
            topCard.classList.add('swiping');
        });
        
        // Evento durante el movimiento del swipe
        hammer.on('panmove', function(e) {
            const deltaX = e.deltaX;
            const deltaY = e.deltaY;
            const rotation = deltaX * 0.1;
            
            // Aplicar transformación en tiempo real
            topCard.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
            
            // Mostrar overlay según la dirección del swipe
            const likeOverlay = topCard.querySelector('.like-overlay');
            const passOverlay = topCard.querySelector('.pass-overlay');
            
            if (deltaX > 50) {
                likeOverlay.classList.add('show');
                passOverlay.classList.remove('show');
            } else if (deltaX < -50) {
                passOverlay.classList.add('show');
                likeOverlay.classList.remove('show');
            } else {
                likeOverlay.classList.remove('show');
                passOverlay.classList.remove('show');
            }
        });
        
        // Evento cuando termina el swipe
        hammer.on('panend', function(e) {
            topCard.classList.remove('swiping');
            
            const deltaX = e.deltaX;
            const threshold = appConfig.swipeThreshold;
            
            // Si el swipe supera el umbral, procesar la acción
            if (Math.abs(deltaX) > threshold) {
                const action = deltaX > 0 ? 'like' : 'pass';
                handleSwipeAction(action, topCard);
            } else {
                // Si no supera el umbral, regresar al centro
                topCard.style.transform = '';
                topCard.querySelector('.like-overlay').classList.remove('show');
                topCard.querySelector('.pass-overlay').classList.remove('show');
            }
        });
    }, 100);
}

function handleAction(action) {
    const topCard = document.querySelector('.profile-card');
    if (!topCard) return;
    
    // Animate the action
    animateAction(action, topCard);
    
    setTimeout(() => {
        handleSwipeAction(action, topCard);
    }, 300);
}

function animateAction(action, card) {
    const likeOverlay = card.querySelector('.like-overlay');
    const passOverlay = card.querySelector('.pass-overlay');
    
    // Add pulse animation to the card
    card.classList.add('pulse-animation');
    
    if (action === 'like') {
        likeOverlay.classList.add('show');
        card.style.transform = 'translate(100px, 0) rotate(15deg)';
        card.style.transition = 'all 0.3s ease-out';
    } else if (action === 'pass') {
        passOverlay.classList.add('show');
        card.style.transform = 'translate(-100px, 0) rotate(-15deg)';
        card.style.transition = 'all 0.3s ease-out';
    }
    
    // Remove pulse animation after it completes
    setTimeout(() => {
        card.classList.remove('pulse-animation');
    }, 600);
}

function handleSwipeAction(action, card) {
    const profileId = parseInt(card.dataset.profileId);
    const profile = profilesData.find(p => p.id === profileId);
    
    // Remove the card with animation
    card.style.transition = 'all 0.5s ease-out';
    card.style.transform = action === 'like'
        ? 'translate(100vw, 0) rotate(30deg)' 
        : 'translate(-100vw, 0) rotate(-30deg)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.remove();
        currentCardIndex++;
        
        // Handle like/pass
        if (action === 'like') {
            addToLikes(profile, action);
            checkForMatch(profile);
        }
        
        // Create new cards if needed
        createProfileCards();
        
        // Check if we're out of profiles
        if (currentCardIndex >= profilesData.length) {
            showOutOfProfiles();
        }
    }, 500);
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

function checkForMatch(profile, options = {}) {
    const { showModal = true } = options;
    if (!profile) return;

    const existingMatch = matches.find(match => match.id === profile.id);
    if (existingMatch) {
        if (showModal) {
            showMatchModal(profile);
        }
        return;
    }

    const match = {
        id: profile.id,
        name: profile.name,
        image: profile.image,
        matchedAt: new Date().toISOString()
    };
    
    matches.push(match);
    saveMatches();
    updateCounters();
    
    if (showModal) {
        showMatchModal(profile);
    }
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
    document.getElementById('welcomeScreen').classList.add('d-none');
    document.getElementById('swipeContainer').classList.add('d-none');
    document.getElementById('likesSection').classList.add('d-none');
    document.getElementById('matchesSection').classList.remove('d-none');
    document.getElementById('messagesSection').classList.add('d-none');
    document.getElementById('petCareSection').classList.add('d-none');
    document.getElementById('donationSection').classList.add('d-none');
    
    displayMatches();
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
                <button class="btn btn-primary" onclick="showSwipeSection()">
                    <i class="fas fa-fire"></i> Empezar a Swipear
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
                <h3>No tienes chats activos</h3>
                <p>Dale me gusta a una mascota en la sección de adopciones para comenzar a conversar.</p>
                <button class="btn btn-primary" onclick="showAdoptionSection()">
                    <i class="fas fa-heart"></i> Ver mascotas para adoptar
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

function showOutOfProfiles() {
    const cardStack = document.getElementById('cardStack');
    cardStack.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-heart-broken"></i>
            <h3>¡No hay más perfiles!</h3>
            <p>Has visto todos los perfiles disponibles. ¡Vuelve más tarde para ver nuevos perfiles!</p>
            <button class="btn btn-primary" onclick="resetProfiles()">
                <i class="fas fa-refresh"></i> Reiniciar
            </button>
        </div>
    `;
}

function resetProfiles() {
    currentCardIndex = 0;
    createProfileCards();
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
                <button type="button" class="btn btn-success" onclick="submitAdoptionFormDynamic(${profile.id})">
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
        petId: currentAdoptionPet ? currentAdoptionPet.id : null,
        petName: currentAdoptionPet ? currentAdoptionPet.name : null,
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
    console.log('Adoption form submitted:', formData);

    // Show a small green confirmation box so the user sees success clearly
    const successBox = document.createElement('div');
    successBox.id = 'adoptionSuccessBox';
    successBox.className = 'alert alert-success';
    successBox.style.position = 'fixed';
    successBox.style.bottom = '20px';
    successBox.style.right = '20px';
    successBox.style.zIndex = 2000;
    successBox.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
    successBox.innerText = `¡Solicitud enviada con éxito para ${formData.petName || 'la mascota'}! Te contactaremos pronto.`;
    document.body.appendChild(successBox);

    setTimeout(() => {
        if (successBox) successBox.remove();
    }, 3500);

    // Close modal if open
    const modalEl = document.getElementById('adoptionModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }

    // In a real app, this would send the data to a server
    
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
        checkForMatch(profile, { showModal: false });
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
window.toggleChatIA = toggleChatIA;
window.sendChatIAMessage = sendChatIAMessage;
window.closeChatIA = closeChatIA;

/**
 * Inicia un chat con una mascota
 */
function startChat(profileId) {
    const profile = profilesData.find(p => p.id === profileId);
    if (!profile) return;
    
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

// === Chat IA (conectado a Gemini API) ===
// Historial de conversación para mantener contexto
let chatHistory = [];

function toggleChatIA() {
    const win = document.getElementById('chatIAWindow');
    const btn = document.getElementById('chatIAButton');
    if (!win) return;
    if (win.style.display === 'none' || win.style.display === '') {
        win.style.display = 'flex';
        if (btn) btn.classList.add('active');
        const input = document.getElementById('chatAIInput');
        if (input) input.focus();
        
        // Mostrar mensaje de bienvenida si es la primera vez
        const messages = document.getElementById('chatIAMessages');
        if (messages && messages.children.length === 0) {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'chat-msg bot';
            welcomeMsg.innerText = '¡Hola! Soy tu asistente virtual de PetMatch. ¿En qué puedo ayudarte hoy?';
            messages.appendChild(welcomeMsg);
        }
    } else {
        win.style.display = 'none';
        if (btn) btn.classList.remove('active');
    }
}

function closeChatIA() {
    const win = document.getElementById('chatIAWindow');
    const btn = document.getElementById('chatIAButton');
    if (win) win.style.display = 'none';
    if (btn) btn.classList.remove('active');
}

async function sendChatIAMessage() {
    const input = document.getElementById('chatAIInput');
    const messages = document.getElementById('chatIAMessages');
    const sendBtn = document.getElementById('sendChatAIBtn');
    
    if (!input || !messages) return;
    const text = input.value.trim();
    if (!text) return;

    // Deshabilitar input y botón mientras se procesa
    input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    // Agregar mensaje del usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerText = text;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;
    input.value = '';

    // Agregar mensaje al historial
    chatHistory.push({ role: 'user', text: text });

    // Mostrar indicador de escritura
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot';
    botMsg.innerText = 'Escribiendo...';
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;

    try {
        // Determinar la URL de la API (funciona tanto en desarrollo como en producción)
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3000/api/chat'  // Desarrollo local
            : '/api/chat';  // Producción en Vercel

        // Llamar a la API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: text,
                conversationHistory: chatHistory
            })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.reply) {
            // Actualizar mensaje del bot con la respuesta real
            botMsg.innerText = data.reply;
            
            // Agregar respuesta al historial
            chatHistory.push({ role: 'bot', text: data.reply });
            
            // Limitar el historial a los últimos 20 mensajes para no exceder límites
            if (chatHistory.length > 20) {
                chatHistory = chatHistory.slice(-20);
            }
        } else {
            throw new Error(data.error || 'No se recibió una respuesta válida');
        }

    } catch (error) {
        console.error('Error al comunicarse con el chat:', error);
        botMsg.innerText = 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.';
        
        // Si es un error de conexión, sugerir verificar la configuración
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            botMsg.innerText += ' (Verifica que la API esté configurada correctamente)';
        }
    } finally {
        // Rehabilitar input y botón
        input.disabled = false;
        if (sendBtn) sendBtn.disabled = false;
        input.focus();
        messages.scrollTop = messages.scrollHeight;
    }
}

// Permitir enviar mensaje con Enter
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatAIInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatIAMessage();
            }
        });
    }
});

/**
 * Envía el formulario de adopción
 */
function submitAdoptionFormDynamic(profileId) {
    const profile = profilesData.find(p => p.id === profileId);
    if (!profile) return;

    // Recopilar datos del formulario DENTRO del modal dinámico para evitar conflictos por IDs duplicados
    const modalEl = document.getElementById('adoptionFormModal');
    const get = (sel) => {
        if (!modalEl) return null;
        return modalEl.querySelector(sel);
    };

    const formData = {
        petId: profileId,
        petName: profile.name,
        adopterName: get('#adopterName') ? get('#adopterName').value.trim() : '',
        adopterEmail: get('#adopterEmail') ? get('#adopterEmail').value.trim() : '',
        adopterPhone: get('#adopterPhone') ? get('#adopterPhone').value.trim() : '',
        adopterAddress: get('#adopterAddress') ? get('#adopterAddress').value.trim() : '',
        adoptionReason: get('#adoptionReason') ? get('#adoptionReason').value.trim() : '',
        petExperience: get('#petExperience') ? get('#petExperience').value.trim() : '',
        starterPack: (get('input[name="starterPack"]:checked') || {}).value || ''
    };

    // Validar campos requeridos
    if (!formData.adopterName || !formData.adopterEmail || !formData.adopterPhone || !formData.adopterAddress || !formData.adoptionReason) {
        // Mostrar un mensaje claro en rojo
        const errBox = document.createElement('div');
        errBox.className = 'alert alert-danger';
        errBox.style.position = 'fixed';
        errBox.style.bottom = '20px';
        errBox.style.right = '20px';
        errBox.style.zIndex = 2000;
        errBox.innerText = 'Por favor completa todos los campos requeridos para enviar la solicitud.';
        document.body.appendChild(errBox);
        setTimeout(() => { if (errBox) errBox.remove(); }, 3500);
        return;
    }

    // Simular envío del formulario
    console.log('Formulario de adopción enviado (dinámico):', formData);

    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('adoptionFormModal'));
    if (modal) modal.hide();

    // Mostrar éxito
    const successBox = document.createElement('div');
    successBox.className = 'alert alert-success';
    successBox.style.position = 'fixed';
    successBox.style.bottom = '20px';
    successBox.style.right = '20px';
    successBox.style.zIndex = 2000;
    successBox.innerText = `¡Solicitud de adopción enviada para ${profile.name}! Te contactaremos pronto.`;
    document.body.appendChild(successBox);
    setTimeout(() => { if (successBox) successBox.remove(); }, 3500);
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
                    <button class="btn btn-primary btn-lg" onclick="showSwipeSection()">
                        <i class="fas fa-fire"></i> Empezar a Swipear
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