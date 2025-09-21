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
        const sections = ['swipeContainer', 'likesSection', 'matchesSection', 'messagesSection', 'petCareSection', 'donationSection'];
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

// Asignar las funciones al objeto window inmediatamente después de definirlas
window.showSwipeSection = showSwipeSection;
window.showPetCareSection = showPetCareSection;
window.showDonationSection = showDonationSection;
window.showWelcomeScreen = showWelcomeScreen;

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
    document.getElementById('likesBtn').addEventListener('click', showLikesSection);
    document.getElementById('matchesBtn').addEventListener('click', showMatchesSection);
    document.getElementById('profileBtn').addEventListener('click', showProfile);
    document.getElementById('backToSwipeBtn').addEventListener('click', showSwipeSection);
    document.getElementById('backToSwipeFromLikesBtn').addEventListener('click', showSwipeSection);
    document.getElementById('backToMatchesBtn').addEventListener('click', showMatchesSection);
    document.getElementById('backToWelcomeBtn').addEventListener('click', showWelcomeScreen);
    document.getElementById('backToWelcomeFromDonationBtn').addEventListener('click', showWelcomeScreen);
    
    // Botones de adopción y modales de perfil
    const adoptFromProfileBtn = document.getElementById('adoptFromProfileBtn');
    const adoptFromInfoBtn = document.getElementById('adoptFromInfoBtn');
    const adoptFromChatBtn = document.getElementById('adoptFromChatBtn');
    const submitAdoptionBtn = document.getElementById('submitAdoptionBtn');
    
    if (adoptFromProfileBtn) {
        adoptFromProfileBtn.addEventListener('click', showAdoptionForm);
        console.log('Event listener adoptFromProfileBtn configurado');
    } else {
        console.error('Botón adoptFromProfileBtn no encontrado');
    }
    
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
    document.getElementById('welcomeScreen').classList.add('d-none');
    document.getElementById('swipeContainer').classList.add('d-none');
    document.getElementById('likesSection').classList.remove('d-none');
    document.getElementById('matchesSection').classList.add('d-none');
    document.getElementById('messagesSection').classList.add('d-none');
    document.getElementById('petCareSection').classList.add('d-none');
    document.getElementById('donationSection').classList.add('d-none');
    
    displayLikes();
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
    document.getElementById('welcomeScreen').classList.add('d-none');
    document.getElementById('swipeContainer').classList.add('d-none');
    document.getElementById('likesSection').classList.add('d-none');
    document.getElementById('matchesSection').classList.add('d-none');
    document.getElementById('messagesSection').classList.remove('d-none');
    document.getElementById('petCareSection').classList.add('d-none');
    document.getElementById('donationSection').classList.add('d-none');
    
    currentChat = profile;
    document.getElementById('chatUserName').textContent = profile.name;
    const chatProfileImage = document.getElementById('chatProfileImage');
    chatProfileImage.style.backgroundImage = `url('${profile.image}')`;
    chatProfileImage.style.cursor = 'pointer';
    chatProfileImage.title = 'Click para ver información detallada';
    chatProfileImage.onclick = () => showPetInfoModal(profile.id);
    displayMessages(profile.id);
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
                <h3>No tienes matches aún</h3>
                <p>¡Sigue swipeando para encontrar tu match perfecto!</p>
                <button class="btn btn-primary" onclick="showSwipeSection()">
                    <i class="fas fa-fire"></i> Empezar a Swipear
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
        messagesContainer.innerHTML = '<p class="text-center text-muted">¡Envía el primer mensaje!</p>';
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
    
    const content = document.getElementById('detailedProfileContent');
    content.innerHTML = `
        <div class="detailed-profile-content">
            <div class="profile-image-large" style="background-image: url('${profile.image}')"></div>
            <div class="profile-details">
                <h3>${profile.name}</h3>
                <div class="detail-item">
                    <span class="detail-label">Edad:</span>
                    <span class="detail-value">${profile.details.age}</span>
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
    
    console.log('Perfil seleccionado para adopción:', profile);
    
    currentAdoptionPet = profile;
    
    // Fill form with pet info
    document.getElementById('adoptionPetImage').style.backgroundImage = `url('${profile.image}')`;
    document.getElementById('adoptionPetName').textContent = profile.name;
    document.getElementById('adoptionPetBreed').textContent = profile.details.breed;
    
    const modal = new bootstrap.Modal(document.getElementById('adoptionModal'));
    modal.show();
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
                    <span class="detail-value-info">${profile.details.age}</span>
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
// FIN DEL ARCHIVO
// ===========================================

console.log('Script.js cargado completamente');