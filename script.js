document.addEventListener('DOMContentLoaded', () => {
    // Éléments du DOM
    const loginPage = document.getElementById('login-page');
    const accountPage = document.getElementById('account-page');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');
    const logoutBtn = document.getElementById('logout-btn');
    const animatedBalanceSpan = document.getElementById('animated-balance');

    // Identifiants (Profil Schneider Frieda)
    const correctUsername = 'schneider.frieda';
    const correctPassword = 'mdp97000';
    const targetBalance = 97000.00;

    function animateTypingBalance(targetValue, duration) {
        let currentValue = 0;
        const startTimestamp = performance.now();

        function updateBalance(timestamp) {
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
            currentValue = (targetValue * easedProgress);

            // Format allemand : de-DE
            animatedBalanceSpan.textContent = currentValue.toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) + " €";

            if (progress < 1) {
                requestAnimationFrame(updateBalance);
            }
        }
        requestAnimationFrame(updateBalance);
    }

    loginBtn.addEventListener('click', () => {
        if (usernameInput.value === correctUsername && passwordInput.value === correctPassword) {
            errorMessage.textContent = '';
            loginPage.classList.remove('active');
            setTimeout(() => {
                accountPage.classList.add('active');
                animateTypingBalance(targetBalance, 2000);
            }, 300);
        } else {
            errorMessage.textContent = 'Benutzername oder Passwort falsch. Bitte erneut versuchen.';
            errorMessage.style.opacity = '1';
        }
    });

    logoutBtn.addEventListener('click', () => {
        accountPage.classList.remove('active');
        setTimeout(() => {
            loginPage.classList.add('active');
            usernameInput.value = 'schneider.frieda';
            passwordInput.value = '';
            animatedBalanceSpan.textContent = '0,00 €';
        }, 300);
    });
});
