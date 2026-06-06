let listaUsuariosReales = [];
let intentosFallidos = 0;

let idxNombre = 0;
let idxCorreo = 0;
let idxPassword = 0;

// Cargar todos los datos existentes de la base de datos al iniciar la página
async function cargarDatosExistentes() {
    try {
        const response = await fetch('/api/auth/usuarios');
        listaUsuariosReales = await response.json();
        
        if (listaUsuariosReales.length === 0) {
            const alertMessage = document.getElementById('alertMessage');
            alertMessage.textContent = 'La base de datos está vacía. Inserta usuarios en MySQL.';
            alertMessage.className = 'alert alert-error';
            alertMessage.classList.remove('hidden');
            return;
        }

        // Iniciar el bucle automático combinatorio
        iniciarBucleCombinatorio();
    } catch (error) {
        document.getElementById('alertMessage').textContent = 'Error al precargar los usuarios existentes desde el Backend.';
        document.getElementById('alertMessage').className = 'alert alert-error';
        document.getElementById('alertMessage').classList.remove('hidden');
    }
}

async function iniciarBucleCombinatorio() {
    if (listaUsuariosReales.length === 0) return;

    const alertMessage = document.getElementById('alertMessage');
    const btnSubmit = document.getElementById('btnSubmit');

    // Mezclar índices cruzados para obtener datos en lugares potencialmente incorrectos
    const nombreProbar = listaUsuariosReales[idxNombre].name;
    const correoProbar = listaUsuariosReales[idxCorreo].email;
    const passwordProbar = listaUsuariosReales[idxPassword].password;

    // Pintar los valores en los campos de texto
    document.getElementById('name').value = nombreProbar;
    document.getElementById('email').value = correoProbar;
    document.getElementById('password').value = passwordProbar;

    alertMessage.className = 'alert hidden';
    alertMessage.textContent = '';

    // Regla de negocio: Si ya se sumaron 3 intentos fallidos seguidos, congelar
    if (intentosFallidos >= 3) {
        alertMessage.textContent = '¡ACCESO BLOQUEADO! Máximo 3 errores seguidos. Restableciendo en 3 segundos...';
        alertMessage.className = 'alert alert-error';
        alertMessage.classList.remove('hidden');
        
        setTimeout(() => {
            intentosFallidos = 0;
            btnSubmit.disabled = false;
            btnSubmit.style.background = '#4f46e5';
            btnSubmit.style.cursor = 'pointer';
            avanzarCombinacion();
            iniciarBucleCombinatorio();
        }, 3000);
        return;
    }

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nombreProbar, email: correoProbar, password: passwordProbar })
        });

        const data = await response.json();

        if (!response.ok) {
            intentosFallidos++;
            if (intentosFallidos >= 3) {
                alertMessage.textContent = `Error (3/3): Combinación fallida. Interfaz Bloqueada.`;
                btnSubmit.disabled = true;
                btnSubmit.style.background = '#9ca3af';
                btnSubmit.style.cursor = 'not-allowed';
            } else {
                alertMessage.textContent = `${data.message} (Error ${intentosFallidos}/3)`;
            }
            alertMessage.className = 'alert alert-error';
            alertMessage.classList.remove('hidden');
        } else {
            // ÉXITO: Se topó con credenciales correctas coordinadas
            intentosFallidos = 0;
            alertMessage.textContent = `¡INICIO EXITOSO! Coincidencia exacta encontrada para: ${nombreProbar}`;
            alertMessage.className = 'alert alert-success';
            alertMessage.classList.remove('hidden');
        }

    } catch (error) {
        alertMessage.textContent = 'Error: Sin conexión con el servidor.';
        alertMessage.className = 'alert alert-error';
        alertMessage.classList.remove('hidden');
    }

    avanzarCombinacion();
    setTimeout(iniciarBucleCombinatorio, 2500); // Ejecución iterativa cada 2.5 segundos
}

// Alternar dinámicamente todos los índices de la base de datos
function avanzarCombinacion() {
    idxPassword++;
    if (idxPassword >= listaUsuariosReales.length) {
        idxPassword = 0;
        idxCorreo++;
        if (idxCorreo >= listaUsuariosReales.length) {
            idxCorreo = 0;
            idxNombre++;
            if (idxNombre >= listaUsuariosReales.length) {
                idxNombre = 0; // Bucle infinito completo restablecido
            }
        }
    }
}

window.onload = cargarDatosExistentes;
