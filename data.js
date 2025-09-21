/**
 * ARCHIVO DE DATOS - PetMatch
 * 
 * Este archivo contiene todos los datos de configuración, perfiles de mascotas,
 * refugios y configuraciones de la aplicación. Modifica este archivo para
 * agregar nuevas mascotas, refugios o cambiar configuraciones.
 */

// ===========================================
// CONFIGURACIÓN GENERAL DE LA APLICACIÓN
// ===========================================

// Configuración de la aplicación
const APP_CONFIG = {
    name: "PetMatch",
    version: "1.0.0",
    description: "Aplicación para conectar mascotas con sus futuros dueños",
    defaultLanguage: "es",
    maxProfilesPerLoad: 3,
    swipeThreshold: 150, // Píxeles necesarios para activar swipe
    animationDuration: 300 // Duración de animaciones en ms
};

// ===========================================
// PERFILES DE MASCOTAS
// ===========================================

// Array principal con todos los perfiles de mascotas disponibles
const profiles = [
    {
        id: 1,
        name: "Scar",
        age: "2 meses",
        bio: "Cachorro juguetón y cariñoso. Le encanta jugar y está listo para encontrar su familia para siempre.",
        image: "https://goldenretrieverperu.com/wp-content/uploads/2021/11/labrador-chocolate1.jpg",
        interests: ["Juguetón", "Lactante", "Inteligente"],
        shelter: {
            id: 1,
            name: "Refugio Esperanza Animal",
            address: "Av. Principal 123, Lima",
            phone: "+51 999 888 777",
            website: "https://refugioesperanza.org",
            description: "Refugio dedicado al rescate y cuidado de animales abandonados desde 2015."
        },
        details: {
            breed: "Labrador Retriever",
            size: "Mediano",
            gender: "Macho",
            vaccinated: true,
            sterilized: false,
            specialNeeds: "Ninguna",
            personality: "Juguetón, cariñoso, inteligente"
        }
    },
    {
        id: 2,
        name: "Carlos",
        age: "2 años",
        bio: "Perro adulto tranquilo y leal. Perfecto para familias que buscan un compañero fiel.",
        image: "https://companionsforeverllc.com/wp-content/uploads/2024/04/IMG_1648-300x300.jpg",
        interests: ["Tranquilo", "Leal", "Protector"],
        shelter: {
            id: 2,
            name: "Casa de Mascotas Felices",
            address: "Jr. Libertad 456, Arequipa",
            phone: "+51 999 777 666",
            website: "https://mascotasfelices.org",
            description: "Organización sin fines de lucro que rescata y rehabilita animales en situación de abandono."
        },
        details: {
            breed: "Mestizo",
            size: "Grande",
            gender: "Macho",
            vaccinated: true,
            sterilized: true,
            specialNeeds: "Ninguna",
            personality: "Tranquilo, leal, protector"
        }
    },
    {
        id: 3,
        name: "Valentina",
        age: "3 años",
        bio: "Gata independiente pero cariñosa. Ideal para personas que buscan un compañero tranquilo.",
        image: "https://www.webanimales.com/ficheros/2014/03/akita-webanimales.jpg",
        interests: ["Independiente", "Cariñosa", "Tranquila"],
        shelter: {
            id: 3,
            name: "Refugio Gatos del Corazón",
            address: "Calle Gatos 789, Cusco",
            phone: "+51 999 666 555",
            website: "https://gatosdelcorazon.org",
            description: "Especialistas en el rescate y cuidado de gatos, con más de 10 años de experiencia."
        },
        details: {
            breed: "Akita",
            size: "Grande",
            gender: "Hembra",
            vaccinated: true,
            sterilized: true,
            specialNeeds: "Ninguna",
            personality: "Independiente, cariñosa, tranquila"
        }
    },
    {
        id: 4,
        name: "Gaturro",
        age: "3 años",
        bio: "Gato curioso y aventurero. Le encanta explorar y jugar con juguetes interactivos.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/%D0%A2%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D0%BA%D0%BE%D1%82_%D0%9B%D1%83%D0%BB%D0%B0%D0%BC%D0%B5%D0%B9_%D0%A2%D0%B0%D0%B9%D1%81%D0%BA%D0%B0%D1%8F_%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%2C_%D0%A7%D0%B5%D0%BC%D0%BF%D0%B8%D0%BE%D0%BD_%D0%BC%D0%B8%D1%80%D0%B0_%D0%BF%D0%BE_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B5_WCF%2C_%D0%BE%D0%BA%D1%80%D0%B0%D1%81_%D0%B1%D0%BB%D1%8E_%D0%BF%D0%BE%D0%B8%D0%BD%D1%82_01_%28cropped%29.jpg",
        interests: ["Curioso", "Aventurero", "Juguetón"],
        shelter: {
            id: 4,
            name: "Refugio Felinos Unidos",
            address: "Av. Felinos 321, Trujillo",
            phone: "+51 999 555 444",
            website: "https://felinosunidos.org",
            description: "Refugio especializado en gatos, con programas de esterilización y adopción responsable."
        },
        details: {
            breed: "Siamés",
            size: "Mediano",
            gender: "Macho",
            vaccinated: true,
            sterilized: true,
            specialNeeds: "Ninguna",
            personality: "Curioso, aventurero, juguetón"
        }
    }
];

// ===========================================
// DATOS DE REFUGIOS
// ===========================================

// Array con información detallada de refugios para la sección de donaciones
const shelters = [
    {
        id: 1,
        name: "Refugio Esperanza Animal",
        description: "Dedicado al rescate y cuidado de animales abandonados desde 2015.",
        address: "Av. Principal 123, Lima",
        phone: "+51 999 888 777",
        website: "https://refugioesperanza.org",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop",
        stats: {
            animalsRescued: 150,
            location: "Lima, Perú"
        },
        donationAmounts: [25, 50, 100]
    },
    {
        id: 2,
        name: "Casa de Mascotas Felices",
        description: "Organización sin fines de lucro que rescata y rehabilita animales en situación de abandono.",
        address: "Jr. Libertad 456, Arequipa",
        phone: "+51 999 777 666",
        website: "https://mascotasfelices.org",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=250&fit=crop",
        stats: {
            animalsRescued: 200,
            location: "Arequipa, Perú"
        },
        donationAmounts: [25, 50, 100]
    },
    {
        id: 3,
        name: "Refugio Gatos del Corazón",
        description: "Especialistas en el rescate y cuidado de gatos, con más de 10 años de experiencia.",
        address: "Calle Gatos 789, Cusco",
        phone: "+51 999 666 555",
        website: "https://gatosdelcorazon.org",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop",
        stats: {
            animalsRescued: 300,
            location: "Cusco, Perú"
        },
        donationAmounts: [25, 50, 100]
    }
];

// ===========================================
// SERVICIOS DE CUIDADO DE MASCOTAS
// ===========================================

// Array con servicios disponibles para mascotas
const petServices = [
    {
        id: 1,
        name: "Veterinarios",
        description: "Encuentra veterinarios cerca de ti para el cuidado de tu mascota",
        icon: "fas fa-user-md",
        category: "salud"
    },
    {
        id: 2,
        name: "Peluquería",
        description: "Servicios de grooming y cuidado estético para tu mascota",
        icon: "fas fa-cut",
        category: "belleza"
    },
    {
        id: 3,
        name: "Guardería",
        description: "Centros de cuidado diurno para cuando no puedas estar con tu mascota",
        icon: "fas fa-home",
        category: "cuidado"
    },
    {
        id: 4,
        name: "Paseadores",
        description: "Servicios de paseo y ejercicio para mantener a tu mascota activa",
        icon: "fas fa-walking",
        category: "ejercicio"
    }
];

// ===========================================
// TIENDAS DE MASCOTAS
// ===========================================

// Array con tiendas asociadas
const petStores = [
    {
        id: 1,
        name: "PetShop Central",
        description: "Alimentos, juguetes y accesorios para mascotas",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop",
        rating: 4.8,
        stars: 5
    },
    {
        id: 2,
        name: "Vet Supplies Pro",
        description: "Equipos médicos y suministros veterinarios",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop",
        rating: 4.2,
        stars: 4
    },
    {
        id: 3,
        name: "Pet Fashion",
        description: "Ropa y accesorios de moda para mascotas",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        rating: 4.9,
        stars: 5
    }
];

// ===========================================
// TIPS DE CUIDADO
// ===========================================

// Array con consejos de cuidado para mascotas
const careTips = [
    {
        id: 1,
        title: "Alimentación Saludable",
        description: "Proporciona una dieta balanceada con alimentos de calidad. Evita dar comida humana que pueda ser tóxica para tu mascota.",
        icon: "fas fa-utensils",
        category: "alimentacion"
    },
    {
        id: 2,
        title: "Ejercicio Regular",
        description: "Mantén a tu mascota activa con paseos diarios y juegos. El ejercicio es esencial para su salud física y mental.",
        icon: "fas fa-dumbbell",
        category: "ejercicio"
    },
    {
        id: 3,
        title: "Vacunación",
        description: "Mantén al día las vacunas de tu mascota. Consulta con tu veterinario sobre el calendario de vacunación.",
        icon: "fas fa-shield-alt",
        category: "salud"
    },
    {
        id: 4,
        title: "Amor y Atención",
        description: "Dedica tiempo de calidad con tu mascota. El amor y la atención son fundamentales para su bienestar emocional.",
        icon: "fas fa-heart",
        category: "bienestar"
    }
];

// ===========================================
// CONFIGURACIÓN DE STARTER PACK
// ===========================================

// Configuración del paquete de bienvenida para adopciones
const starterPackConfig = {
    price: 50,
    items: [
        {
            name: "Collar personalizado",
            icon: "fas fa-dog"
        },
        {
            name: "Certificado de unión familiar",
            icon: "fas fa-certificate"
        },
        {
            name: "Kit de bienvenida",
            icon: "fas fa-heart"
        }
    ]
};

// ===========================================
// MENSAJES PREDEFINIDOS
// ===========================================

// Mensajes automáticos que puede enviar la mascota
const autoMessages = [
    "¡Hola! Me alegra conocerte 😊",
    "¿Te gustaría saber más sobre mí?",
    "¡Tengo muchas ganas de jugar contigo!",
    "¿Cuándo podemos conocernos?",
    "¡Espero que podamos ser grandes amigos!"
];

// ===========================================
// CONFIGURACIÓN DE ANIMACIONES
// ===========================================

// Configuración de animaciones y transiciones
const animationConfig = {
    cardSwipe: {
        duration: 500,
        easing: "ease-out"
    },
    modal: {
        duration: 300,
        easing: "ease-in-out"
    },
    toast: {
        duration: 3000,
        showDuration: 300,
        hideDuration: 300
    }
};

// ===========================================
// FUNCIONES DE UTILIDAD PARA DATOS
// ===========================================

/**
 * Obtiene un perfil por su ID
 * @param {number} id - ID del perfil
 * @returns {Object|null} - Perfil encontrado o null
 */
function getProfileById(id) {
    return profiles.find(profile => profile.id === id) || null;
}

/**
 * Obtiene un refugio por su ID
 * @param {number} id - ID del refugio
 * @returns {Object|null} - Refugio encontrado o null
 */
function getShelterById(id) {
    return shelters.find(shelter => shelter.id === id) || null;
}

/**
 * Obtiene perfiles por tipo de animal
 * @param {string} type - Tipo de animal (perro, gato, etc.)
 * @returns {Array} - Array de perfiles filtrados
 */
function getProfilesByType(type) {
    return profiles.filter(profile => 
        profile.details.breed.toLowerCase().includes(type.toLowerCase())
    );
}

/**
 * Obtiene perfiles por tamaño
 * @param {string} size - Tamaño (pequeño, mediano, grande)
 * @returns {Array} - Array de perfiles filtrados
 */
function getProfilesBySize(size) {
    return profiles.filter(profile => 
        profile.details.size.toLowerCase() === size.toLowerCase()
    );
}

/**
 * Obtiene un mensaje aleatorio de la lista de mensajes automáticos
 * @returns {string} - Mensaje aleatorio
 */
function getRandomAutoMessage() {
    const randomIndex = Math.floor(Math.random() * autoMessages.length);
    return autoMessages[randomIndex];
}

// ===========================================
// EXPORTAR DATOS (para uso en otros archivos)
// ===========================================

// Hacer disponibles los datos globalmente
window.PetMatchData = {
    APP_CONFIG,
    profiles,
    shelters,
    petServices,
    petStores,
    careTips,
    starterPackConfig,
    autoMessages,
    animationConfig,
    getProfileById,
    getShelterById,
    getProfilesByType,
    getProfilesBySize,
    getRandomAutoMessage
};
