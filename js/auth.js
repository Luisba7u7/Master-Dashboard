// Inicializar Firebase con la configuración privada del archivo js/config.js
if (!window.FIREBASE_CONFIG) {
    alert("CRITICAL ERROR: No se encontró la configuración de Firebase (js/config.js)");
    throw new Error("Missing Firebase Configuration");
}
firebase.initializeApp(window.FIREBASE_CONFIG);
const auth = firebase.auth();

// Referencias de UI
const authOverlay = document.getElementById('auth-overlay');
const appContainer = document.getElementById('app');
const loginBtn = document.getElementById('do-login');
const emailInput = document.getElementById('login-email');
const passInput = document.getElementById('login-pass');
const authError = document.getElementById('auth-error');

// Escuchar cambios de sesión
auth.onAuthStateChanged(user => {
    if (user) {
        authOverlay.style.opacity = '0';
        setTimeout(() => {
            authOverlay.style.display = 'none';
            appContainer.style.display = 'flex';
            window.dispatchEvent(new Event('auth-ready'));
        }, 500);
    } else {
        authOverlay.style.display = 'flex';
        appContainer.style.display = 'none';
    }
});

// Configuración de Identidad Maestra (Extraída de config.js)
const MASTER_EMAIL = window.FIREBASE_CONFIG.MASTER_EMAIL; 
const EMAILJS_CONFIG = window.FIREBASE_CONFIG.EMAILJS;

async function sendIntruderAlert(intruderEmail) {
    if (!EMAILJS_CONFIG || !EMAILJS_CONFIG.serviceID) return;
    try {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, {
            to_name: "devbernix",
            email: MASTER_EMAIL,
            intruder_email: intruderEmail,
            time: new Date().toLocaleString(),
            project: "Master Dashboard"
        });
    } catch (e) {
        // Silencio absoluto en errores
    }
}

// Función de Login con Google
const googleBtn = document.getElementById('google-login');
if (googleBtn) {
    googleBtn.onclick = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        authError.style.display = 'none';
        
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;
            
            // FILTRO DE SEGURIDAD MÁXIMA
            if (user.email !== MASTER_EMAIL) {
                authError.style.display = 'block';
                authError.innerText = "ACCESO DENEGADO";
                
                // Enviar alerta silenciosa
                sendIntruderAlert(user.email);
                
                // Expulsar al intruso de inmediato
                setTimeout(() => auth.signOut(), 1500);
            }
        } catch (error) {
            console.error(error);
            authError.style.display = 'block';
            authError.innerText = "Error: " + error.message;
        }
    };
}

// Función de Login con Correo (Existente)
if (loginBtn) {
    loginBtn.onclick = async () => {
        const email = emailInput.value;
        const pass = passInput.value;
        
        if (email !== MASTER_EMAIL) {
            authError.style.display = 'block';
            authError.innerText = "Correo no autorizado.";
            return;
        }

        loginBtn.disabled = true;
        loginBtn.innerText = "VERIFICANDO...";
        authError.style.display = 'none';

        try {
            await auth.signInWithEmailAndPassword(email, pass);
        } catch (error) {
            console.error(error);
            authError.style.display = 'block';
            authError.innerText = "Error: " + error.message;
            loginBtn.disabled = false;
            loginBtn.innerText = "INICIAR SESIÓN SEGURA";
        }
    };
}

// Cerrar sesión
window.logout = () => {
    auth.signOut();
};
