document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const premiumLoginForm = document.getElementById('premiumLoginForm');
    const errorMessage = document.getElementById('errorMessage');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutButton = document.getElementById('logout');
    const studySetForm = document.getElementById('studySetForm');
    const formMessage = document.getElementById('formMessage');
    const studySetsContainer = document.getElementById('studySets');
    const practiceSetsContainer = document.getElementById('practiceSets');

    // Hardcoded user data
    const users = [
        { username: 'student', password: 'password' },
        { username: 'teacher', password: 'teach123' }
    ];

    const premiumUsers = [
        { username: 'premiumUser', password: 'premium123' }
    ];

    // Language translations
    const translations = {
        en: {
            title: "TurtleGo",
            subtitle: "Your Ultimate Study Companion",
            login: "Login",
            loginButton: "Login",
            premiumLogin: "Premium Login",
            premiumLoginButton: "Login",
            aboutTitle: "About TurtleGo",
            aboutText: "TurtleGo is your personal study assistant, allowing you to create, manage, and review your study sets easily. Whether you're a student or a teacher, TurtleGo has the tools you need to succeed.",
            newsTitle: "Latest News",
            news1: "New feature: Share your study sets with friends!",
            news2: "Improved user interface for a better experience.",
            news3: "Mobile app coming soon!",
            studySetSaved: "Study set saved successfully!",
            errorSavingStudySet: "Error saving study set.",
            invalidCredentials: "Invalid username or password.",
            logout: "Logout",
            yourStudySets: "Your Study Sets",
            createStudySet: "Create Study Set",
            saveSetButton: "Save Set",
            practiceSets: "Practice Sets",
            upgradeMessage: "You are not a premium user, upgrade your account."
        },
        nl: {
            title: "TurtleGo",
            subtitle: "Uw ultieme studiemaatje",
            login: "Inloggen",
            loginButton: "Inloggen",
            premiumLogin: "Premium Inloggen",
            premiumLoginButton: "Inloggen",
            aboutTitle: "Over TurtleGo",
            aboutText: "TurtleGo is uw persoonlijke studie-assistent waarmee u gemakkelijk studiepakketten kunt maken, beheren en bekijken. Of u nu een student of een leraar bent, TurtleGo heeft de tools die u nodig heeft om te slagen.",
            newsTitle: "Laatste Nieuws",
            news1: "Nieuwe functie: Deel je studiepakketten met vrienden!",
            news2: "Verbeterde gebruikersinterface voor een betere ervaring.",
            news3: "Mobiele app binnenkort beschikbaar!",
            studySetSaved: "Studiepakket succesvol opgeslagen!",
            errorSavingStudySet: "Fout bij het opslaan van het studiepakket.",
            invalidCredentials: "Ongeldige gebruikersnaam of wachtwoord.",
            logout: "Uitloggen",
            yourStudySets: "Uw Studiepakketten",
            createStudySet: "Maak Studiepakket",
            saveSetButton: "Opslaan",
            practiceSets: "Oefensets",
            upgradeMessage: "Je bent geen premium user, upgrade je account."
        },
        de: {
            title: "TurtleGo",
            subtitle: "Ihr ultimativer Studienbegleiter",
            login: "Anmelden",
            loginButton: "Anmelden",
            premiumLogin: "Premium Anmelden",
            premiumLoginButton: "Anmelden",
            aboutTitle: "Über TurtleGo",
            aboutText: "TurtleGo ist Ihr persönlicher Studienassistent, mit dem Sie Ihre Lernsätze einfach erstellen, verwalten und überprüfen können. Egal, ob Sie ein Schüler oder Lehrer sind, TurtleGo bietet Ihnen die Werkzeuge, die Sie zum Erfolg brauchen.",
            newsTitle: "Neueste Nachrichten",
            news1: "Neue Funktion: Teilen Sie Ihre Lernsätze mit Freunden!",
            news2: "Verbesserte Benutzeroberfläche für eine bessere Erfahrung.",
            news3: "Mobile App kommt bald!",
            studySetSaved: "Lernsatz erfolgreich gespeichert!",
            errorSavingStudySet: "Fehler beim Speichern des Lernsatzes.",
            invalidCredentials: "Ungültiger Benutzername oder Passwort.",
            logout: "Abmelden",
            yourStudySets: "Ihre Lernsätze",
            createStudySet: "Lernsatz erstellen",
            saveSetButton: "Speichern",
            practiceSets: "Übungssätze",
            upgradeMessage: "Sie sind kein Premium-Benutzer, aktualisieren Sie Ihr Konto."
        }
    };

    // Language selector
    const languageButtons = document.querySelectorAll('.language-selector button');

    const updateLanguage = (language) => {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = translations[language][key];
        });
    };

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const language = button.getAttribute('data-lang');
            updateLanguage(language);
            localStorage.setItem('language', language);
        });
    });

    const savedLanguage = localStorage.getItem('language') || 'en';
    updateLanguage(savedLanguage);

    // Check if the user is logged in
    const checkLoginStatus = () => {
        const username = localStorage.getItem('username');
        if (!username) {
            window.location.href = 'index.html';
        }
    };

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('username', username);
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = translations[savedLanguage]['invalidCredentials'];
            }
        });
    }

    if (premiumLoginForm) {
        premiumLoginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('premiumUsername').value;
            const password = document.getElementById('premiumPassword').value;

            const user = premiumUsers.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('username', username);
                localStorage.setItem('isPremium', true);
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = translations[savedLanguage]['invalidCredentials'];
            }
        });
    }

    if (usernameDisplay) {
        const username = localStorage.getItem('username');
        if (username) {
            usernameDisplay.textContent = username;
        } else {
            checkLoginStatus();
        }
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('username');
            localStorage.removeItem('isPremium');
            window.location.href = 'index.html';
        });
    }

    if (studySetForm) {
        studySetForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const setName = document.getElementById('setName').value;
            const setContent = document.getElementById('setContent').value;
            const username = localStorage.getItem('username');

            if (username) {
                const studySets = JSON.parse(localStorage.getItem(`studySets_${username}`)) || [];
                studySets.push({ name: setName, content: setContent });
                localStorage.setItem(`studySets_${username}`, JSON.stringify(studySets));

                formMessage.textContent = translations[savedLanguage]['studySetSaved'];
                document.getElementById('setName').value = '';
                document.getElementById('setContent').value = '';
            } else {
                formMessage.textContent = translations[savedLanguage]['errorSavingStudySet'];
            }
        });
    }

    if (studySetsContainer) {
        const username = localStorage.getItem('username');
        if (username) {
            const studySets = JSON.parse(localStorage.getItem(`studySets_${username}`)) || [];
            studySets.forEach((set, index) => {
                const div = document.createElement('div');
                div.classList.add('study-set');
                div.innerHTML = `
                    <h3 class="study-set-name" data-index="${index}">${set.name}</h3>
                    <p>${set.content}</p>
                    <button class="delete-button" data-index="${index}" data-i18n="delete">Delete</button>
                `;
                studySetsContainer.appendChild(div);
            });

            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const index = event.target.getAttribute('data-index');
                    const studySets = JSON.parse(localStorage.getItem(`studySets_${username}`)) || [];
                    studySets.splice(index, 1);
                    localStorage.setItem(`studySets_${username}`, JSON.stringify(studySets));
                    window.location.reload();
                });
            });

            // Add event listeners to study set names
            document.querySelectorAll('.study-set-name').forEach(name => {
                name.addEventListener('click', (event) => {
                    const index = event.target.getAttribute('data-index');
                    localStorage.setItem('currentSetIndex', index);
                    window.location.href = 'practice.html';
                });
            });

            // Create practice sets container
            studySets.forEach((set, index) => {
                const div = document.createElement('div');
                const isPremium = localStorage.getItem('isPremium') === 'true';
                div.classList.add('study-set');
                if (!isPremium) {
                    div.classList.add('premium-locked');
                }
                div.innerHTML = `
                    <h3 class="study-set-name" data-index="${index}">${set.name}</h3>
                    <p>${set.content}</p>
                `;
                if (!isPremium) {
                    div.addEventListener('click', () => {
                        alert(translations[savedLanguage]['upgradeMessage']);
                    });
                } else {
                    div.addEventListener('click', (event) => {
                        const index = event.target.getAttribute('data-index');
                        localStorage.setItem('currentSetIndex', index);
                        window.location.href = 'practice.html';
                    });
                }
                practiceSetsContainer.appendChild(div);
            });
        } else {
            checkLoginStatus();
        }
    }
});
