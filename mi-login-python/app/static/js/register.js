const registerForm = document.getElementById('registerForm');
const registerAlert = document.getElementById('alertMessage');
const registerFields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirm: document.getElementById('confirm')
};

function clearRegisterValidation() {
    registerAlert.className = 'alert-box hidden';
    registerAlert.textContent = '';
    Object.keys(registerFields).forEach((field) => {
        const group = document.getElementById(`group-${field}`);
        const error = document.getElementById(`${field}Error`);
        group.classList.remove('invalid');
        error.classList.add('hidden');
        error.textContent = '';
    });
}

function setRegisterFieldError(field, message) {
    const group = document.getElementById(`group-${field}`);
    const error = document.getElementById(`${field}Error`);
    group.classList.add('invalid');
    error.textContent = message;
    error.classList.remove('hidden');
}

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = registerFields.name.value.trim();
    const email = registerFields.email.value.trim();
    const password = registerFields.password.value;
    const confirm = registerFields.confirm.value;

    clearRegisterValidation();

    if (!name) {
        setRegisterFieldError('name', 'Ingresa tu nombre completo.');
        return;
    }

    if (!email) {
        setRegisterFieldError('email', 'Ingresa un correo electrónico.');
        return;
    }

    if (!password) {
        setRegisterFieldError('password', 'Ingresa tu contraseña.');
        return;
    }

    if (!confirm) {
        setRegisterFieldError('confirm', 'Confirma tu contraseña.');
        return;
    }

    if (password !== confirm) {
        setRegisterFieldError('confirm', 'Las contraseñas no coinciden.');
        return;
    }

    if (password.length < 6) {
        setRegisterFieldError('password', 'La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirm })
        });

        const data = await response.json();
        registerAlert.textContent = data.message;
        registerAlert.className = 'alert-box';
        registerAlert.classList.remove('hidden');

        if (!response.ok) {
            registerAlert.classList.add('alert-error');
        } else {
            registerAlert.classList.add('alert-success');
            if (data.redirect_url) {
                setTimeout(() => {
                    window.location.href = data.redirect_url;
                }, 1200);
            }
        }
    } catch (error) {
        registerAlert.textContent = 'Error al conectar con el servidor.';
        registerAlert.className = 'alert-box alert-error';
        registerAlert.classList.remove('hidden');
    }
});
