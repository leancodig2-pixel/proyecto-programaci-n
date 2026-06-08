document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const alertBox = document.getElementById('alertMessage');
    const submitBtn = document.querySelector('.btn-submit');

    // Estado inicial de procesamiento seguro
    alertBox.className = "alert-box hidden"; 
    submitBtn.disabled = true;
    submitBtn.textContent = "Procesando autenticación...";

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        alertBox.textContent = data.message;
        alertBox.classList.remove('hidden');

        if (!response.ok) {
            alertBox.classList.add('alert-error');
            submitBtn.disabled = false;
            submitBtn.textContent = "Autenticar";
        } else {
            alertBox.classList.add('alert-success');
            submitBtn.textContent = "Acceso Concedido";
        }
    } catch (error) {
        alertBox.textContent = "Error de red: No se pudo conectar con el servidor.";
        alertBox.classList.remove('hidden');
        alertBox.classList.add('alert-error');
        submitBtn.disabled = false;
        submitBtn.textContent = "Autenticar";
    }
});
