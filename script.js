document.addEventListener('DOMContentLoaded', () => {
    // Éléments du DOM
    const loginPage = document.getElementById('login-page');
    const accountPage = document.getElementById('account-page');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');
    const logoutBtn = document.getElementById('logout-btn');
    const animatedBalanceSpan = document.getElementById('animated-balance'); // NOUVEAU : pour l'animation de frappe

    // Identifiants prédéfinis
    const correctUsername = 'schmidt.frieda';
    const correctPassword = 'mdp97000';
    const targetBalance = 97000.00; // Le solde cible

    // --- Fonction d'animation de frappe du solde (plus réaliste) ---
    function animateTypingBalance(targetValue, duration) {
        let currentValue = 0;
        const startTimestamp = performance.now(); // Temps de début de l'animation

        function updateBalance(timestamp) {
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1); // Progression de l'animation (0 à 1)

            // Calcul de la valeur actuelle
            // On peut utiliser une fonction d'accélération/décélération pour un effet plus doux
            const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Ease-in-out
            currentValue = startValue + (targetValue - startValue) * easedProgress;

            // Formater le nombre avec des milliers et deux décimales
            animatedBalanceSpan.textContent = currentValue.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            if (progress < 1) {
                requestAnimationFrame(updateBalance); // Continue l'animation
            } else {
                // S'assurer que la valeur finale est exacte et bien formatée
                animatedBalanceSpan.textContent = targetValue.toLocaleString('fr-FR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        }

        // Pour la première exécution, on initialise à 0 ou à la valeur actuelle
        let startValue = parseFloat(animatedBalanceSpan.textContent.replace(/[^0-9,-]+/g, "").replace(",", ".")) || 0;
        if (isNaN(startValue)) startValue = 0; // Au cas où la conversion échoue

        requestAnimationFrame(updateBalance); // Lance l'animation
    }


    // --- Fonction de gestion de la connexion ---
    loginBtn.addEventListener('click', () => {
        const enteredUsername = usernameInput.value;
        const enteredPassword = passwordInput.value;

        if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
            errorMessage.textContent = ''; // Efface le message d'erreur
            
            // Masque la page de connexion avec une transition
            loginPage.classList.remove('active');
            loginPage.classList.remove('fade-in-up'); // Pour pouvoir réappliquer à la déconnexion

            // Affiche la page du compte avec une transition
            setTimeout(() => { // Petit délai pour laisser la transition de sortie se faire
                accountPage.classList.add('active');
                accountPage.classList.add('fade-in-up'); // Applique l'animation d'entrée
                animateTypingBalance(targetBalance, 2000); // Lance l'animation de frappe du solde (2 secondes)
            }, 300); // Délai avant d'afficher la page suivante
            
        } else {
            errorMessage.textContent = 'Identifiant ou mot de passe incorrect. Veuillez réessayer.';
            // Ajouter une petite animation pour le message d'erreur
            errorMessage.style.opacity = '0';
            setTimeout(() => {
                errorMessage.style.transition = 'opacity 0.3s ease-in-out';
                errorMessage.style.opacity = '1';
            }, 50);
        }
    });

    // --- Fonction de gestion de la déconnexion ---
    logoutBtn.addEventListener('click', () => {
        // Masque la page du compte
        accountPage.classList.remove('active');
        accountPage.classList.remove('fade-in-up');

        // Affiche la page de connexion
        setTimeout(() => { // Petit délai pour laisser la transition de sortie se faire
            loginPage.classList.add('active');
            loginPage.classList.add('fade-in-up'); // Applique l'animation d'entrée
            // Réinitialiser les champs et le solde pour la prochaine connexion
            usernameInput.value = 'schmidt.frieda';
            passwordInput.value = 'mdp97000';
            animatedBalanceSpan.textContent = '0,00'; // Réinitialise l'affichage du solde
            errorMessage.textContent = ''; // Cache le message d'erreur
        }, 300);
    });

    // --- Mise à jour des couleurs pour les opérations (dépend du CSS) ---
    // S'assure que les couleurs positives/négatives sont appliquées au chargement
    document.querySelectorAll('.operation-item .op-amount').forEach(amountElement => {
        const amountText = amountElement.textContent.trim();
        if (amountText.startsWith('+')) {
            amountElement.classList.add('positive');
            amountElement.classList.remove('negative');
        } else if (amountText.startsWith('-')) {
            amountElement.classList.add('negative');
            amountElement.classList.remove('positive');
        } else {
            amountElement.classList.remove('positive', 'negative');
        }
    });

    // Initialisation : Afficher la page de login par défaut au chargement
    loginPage.classList.add('active');
    accountPage.classList.remove('active');
});
