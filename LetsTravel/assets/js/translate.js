async function loadTranslations(lang) {
    try {
        const response = await fetch("translations.json");
        const translations = await response.json();

        if (translations[lang]) {
            document.documentElement.lang = lang;
            document.querySelectorAll("[data-lang]").forEach(el => {
                const key = el.getAttribute("data-lang");
                if (translations[lang][key]) {
                    el.innerHTML = translations[lang][key]; // Affiche correctement les balises HTML
                }
            });

            localStorage.setItem("language", lang);
            updateFont(lang); // Met à jour la police après le changement de langue
        }
    } catch (error) {
        console.error("Erreur de chargement des traductions :", error);
    }
}

// Fonction pour mettre à jour la police selon la langue
function updateFont(lang) {
    if (lang === "ar") {
        document.documentElement.style.fontFamily = "Changa, sans-serif";

        // Appliquer Tajawal aux titres et textes importants
        document.querySelectorAll(".hero-title, .hero-text, .section-title, .section-subtitle, .about-text, .about-item-title, .about-item-text").forEach(el => {
            el.style.fontFamily = "Changa, sans-serif";
        });

    } else {
        document.documentElement.style.fontFamily = "Poppins, sans-serif";

        // Remettre les polices normales en français
        document.querySelectorAll(".hero-title").forEach(el => {
            el.style.fontFamily = "Gabarito, serif";
        });

        document.querySelectorAll(".hero-text, .section-title, .section-subtitle, .about-text, .about-item-title, .about-item-text").forEach(el => {
            el.style.fontFamily = "Poppins, sans-serif";
        });
    }
}

// Changer de langue avec un bouton
document.querySelector("[data-lang-toggle]").addEventListener("click", function () {
    const currentLang = localStorage.getItem("language") || "fr";
    const newLang = currentLang === "fr" ? "ar" : "fr";
    loadTranslations(newLang);
});

// Charger la langue sauvegardée au démarrage
const savedLanguage = localStorage.getItem("language") || "fr";
loadTranslations(savedLanguage);
updateFont(savedLanguage); // Appliquer la police au chargement