// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const modal = document.getElementById('authModal');
    const showLoginBtn = document.getElementById('showLogin');
    const showRegisterBtn = document.getElementById('showRegister');
    const closeModal = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const successMessage = document.getElementById('success-message');

    // Expresiones regulares para validación
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Mostrar modal
    function showModal(formType) {
        modal.classList.add('active');
        // Activar el tab correspondiente
        document.querySelector(`[data-tab="${formType}"]`).click();
    }

    // Ocultar modal
    function hideModal() {
        modal.classList.remove('active');
        // Resetear formularios
        loginForm.reset();
        registerForm.reset();
        // Ocultar mensajes de error
        document.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'none');
    }

    // Event Listeners para mostrar/ocultar modal
    showLoginBtn.addEventListener('click', () => showModal('login'));
    showRegisterBtn.addEventListener('click', () => showModal('register'));
    closeModal.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    // Cambio de tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los tabs y forms
            tabBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // Activar el tab y form correspondiente
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}Form`).classList.add('active');
        });
    });

    // Función para mostrar mensajes de error
    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('error');
    }

    // Función para ocultar mensajes de error
    function hideError(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.style.display = 'none';
        input.classList.remove('error');
    }

    // Validación del formulario de login
    function validateLoginForm() {
        let isValid = true;
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');

        // Validar email
        if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Por favor, ingresa un email válido');
            isValid = false;
        } else {
            hideError(email);
        }

        // Validar contraseña
        if (password.value.trim().length < 8) {
            showError(password, 'La contraseña debe tener al menos 8 caracteres');
            isValid = false;
        } else {
            hideError(password);
        }

        return isValid;
    }

    // Validación del formulario de registro
    function validateRegisterForm() {
        let isValid = true;
        const name = document.getElementById('registerName');
        const email = document.getElementById('registerEmail');
        const phone = document.getElementById('registerPhone');
        const password = document.getElementById('registerPassword');
        const passwordConfirm = document.getElementById('registerPasswordConfirm');

        // Validar nombre
        if (name.value.trim().length < 3) {
            showError(name, 'El nombre debe tener al menos 3 caracteres');
            isValid = false;
        } else {
            hideError(name);
        }

        // Validar email
        if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Por favor, ingresa un email válido');
            isValid = false;
        } else {
            hideError(email);
        }

        // Validar teléfono (opcional)
        if (phone.value.trim() !== '' && !phoneRegex.test(phone.value.trim())) {
            showError(phone, 'El teléfono debe tener 10 dígitos');
            isValid = false;
        } else {
            hideError(phone);
        }

        // Validar contraseña
        if (!passwordRegex.test(password.value)) {
            showError(password, 'La contraseña debe tener al menos 8 caracteres, una letra y un número');
            isValid = false;
        } else {
            hideError(password);
        }

        // Validar confirmación de contraseña
        if (password.value !== passwordConfirm.value) {
            showError(passwordConfirm, 'Las contraseñas no coinciden');
            isValid = false;
        } else {
            hideError(passwordConfirm);
        }

        return isValid;
    }

    // Event listener para el formulario de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateLoginForm()) {
            // Aquí iría la lógica para enviar los datos al servidor
            successMessage.textContent = '¡Inicio de sesión exitoso!';
            successMessage.style.display = 'block';
            hideModal();
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });

    // Event listener para el formulario de registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateRegisterForm()) {
            // Aquí iría la lógica para enviar los datos al servidor
            successMessage.textContent = '¡Registro exitoso! Ya puedes iniciar sesión';
            successMessage.style.display = 'block';
            hideModal();
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });

    // Validación en tiempo real para el teléfono
    document.getElementById('registerPhone').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}); 