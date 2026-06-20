const loginForm = document.getElementById('loginForm');
const loginAlert = document.getElementById('alertMessage');
const loginFields = {
    email: document.getElementById('email'),
    password: document.getElementById('password')
};
const GOOGLE_CLIENT_ID = 'REPLACE_WITH_GOOGLE_CLIENT_ID';

function clearLoginValidation() {
    loginAlert.className = 'alert-box hidden';
    loginAlert.textContent = '';
    Object.keys(loginFields).forEach((field) => {
        const group = document.getElementById(`group-${field}`);
        const error = document.getElementById(`${field}Error`);
        group.classList.remove('invalid');
        error.classList.add('hidden');
        error.textContent = '';
    });
}

function setFieldError(field, message) {
    const group = document.getElementById(`group-${field}`);
    const error = document.getElementById(`${field}Error`);
    group.classList.add('invalid');
    error.textContent = message;
    error.classList.remove('hidden');
}

async function submitLogin(email, password) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    loginAlert.textContent = data.message;
    loginAlert.className = 'alert-box';
    loginAlert.classList.remove('hidden');

    if (!response.ok) {
        loginAlert.classList.add('alert-error');
        return;
    }

    loginAlert.classList.add('alert-success');
    if (data.redirect_url) {
        setTimeout(() => {
            window.location.href = data.redirect_url;
        }, 900);
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginFields.email.value.trim();
    const password = loginFields.password.value;

    clearLoginValidation();

    if (!email) {
        setFieldError('email', 'Ingresa un correo electrónico.');
        return;
    }

    if (!password) {
        setFieldError('password', 'Ingresa tu contraseña.');
        return;
    }

    try {
        await submitLogin(email, password);
    } catch (error) {
        loginAlert.textContent = 'Error al conectar con el servidor.';
        loginAlert.className = 'alert-box alert-error';
        loginAlert.classList.remove('hidden');
    }
});

async function handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) {
        loginAlert.textContent = 'No se recibió el token de Google.';
        loginAlert.className = 'alert-box alert-error';
        loginAlert.classList.remove('hidden');
        return;
    }

    try {
        const result = await fetch('/api/login/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: response.credential })
        });
        const data = await result.json();

        loginAlert.textContent = data.message;
        loginAlert.className = 'alert-box';
        loginAlert.classList.remove('hidden');

        if (!result.ok) {
            loginAlert.classList.add('alert-error');
            return;
        }

        loginAlert.classList.add('alert-success');
        if (data.redirect_url) {
            setTimeout(() => window.location.href = data.redirect_url, 900);
        }
    } catch (error) {
        loginAlert.textContent = 'Error al iniciar sesión con Google.';
        loginAlert.className = 'alert-box alert-error';
        loginAlert.classList.remove('hidden');
    }
}

window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('googleButtonContainer');
    if (!container || !window.google || !google.accounts || !google.accounts.id) {
        return;
    }

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
    });

    google.accounts.id.renderButton(container, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        type: 'standard',
        shape: 'rectangular'
    });

    google.accounts.id.prompt();
});

function clearLoginValidation() {
    loginAlert.className = 'alert-box hidden';
    loginAlert.textContent = '';
    Object.keys(loginFields).forEach((field) => {
        const group = document.getElementById(`group-${field}`);
        const error = document.getElementById(`${field}Error`);
        group.classList.remove('invalid');
        error.classList.add('hidden');
        error.textContent = '';
    });
}

function setFieldError(field, message) {
    const group = document.getElementById(`group-${field}`);
    const error = document.getElementById(`${field}Error`);
    group.classList.add('invalid');
    error.textContent = message;
    error.classList.remove('hidden');
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginFields.email.value.trim();
    const password = loginFields.password.value;

    clearLoginValidation();

    if (!email) {
        setFieldError('email', 'Ingresa un correo electrónico.');
        return;
    }

    if (!password) {
        setFieldError('password', 'Ingresa tu contraseña.');
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        loginAlert.textContent = data.message;
        loginAlert.className = 'alert-box';
        loginAlert.classList.remove('hidden');

        if (!response.ok) {
            loginAlert.classList.add('alert-error');
        } else {
            loginAlert.classList.add('alert-success');
            if (data.redirect_url) {
                setTimeout(() => {
                    window.location.href = data.redirect_url;
                }, 900);
            }
        }
    } catch (error) {
        loginAlert.textContent = 'Error al conectar con el servidor.';
        loginAlert.className = 'alert-box alert-error';
        loginAlert.classList.remove('hidden');
    }
});
