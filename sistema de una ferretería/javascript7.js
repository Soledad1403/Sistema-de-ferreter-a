document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('claimForm');
    const nameInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('telefono');
    const claimTypeSelect = document.getElementById('tipo_reclamo');
    const claimDetailsTextarea = document.getElementById('detalle_reclamo');

    const nameError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('telefonoError');
    const tipoReclamoError = document.getElementById('tipoReclamoError');
    const detalleReclamoError = document.getElementById('detalleReclamoError');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    // Función para mostrar un mensaje de error
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    // Función para ocultar un mensaje de error
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // Validar nombre
    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameError, 'El nombre completo es obligatorio.');
            return false;
        } else {
            hideError(nameError);
            return true;
        }
    }

    // Validar email
    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailError, 'El correo electrónico es obligatorio.');
            return false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailError, 'Por favor, ingrese un correo electrónico válido.');
            return false;
        } else {
            hideError(emailError);
            return true;
        }
    }

    // Validar teléfono (opcional, pero con formato)
    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        // Permite vacío o un número de al menos 7 dígitos (común en Perú)
        const phonePattern = /^[0-9]{7,}$/;
        if (phoneValue !== '' && !phonePattern.test(phoneValue)) {
            showError(phoneError, 'Ingrese un número de teléfono válido (mínimo 7 dígitos).');
            return false;
        } else {
            hideError(phoneError);
            return true;
        }
    }

    // Validar tipo de reclamo
    function validateClaimType() {
        if (claimTypeSelect.value === '') {
            showError(tipoReclamoError, 'Por favor, seleccione un tipo de reclamo.');
            return false;
        } else {
            hideError(tipoReclamoError);
            return true;
        }
    }

    // Validar detalle del reclamo
    function validateClaimDetails() {
        if (claimDetailsTextarea.value.trim() === '') {
            showError(detalleReclamoError, 'El detalle de su reclamo es obligatorio.');
            return false;
        } else if (claimDetailsTextarea.value.trim().length < 20) {
            showError(detalleReclamoError, 'Por favor, sea más específico (mínimo 20 caracteres).');
            return false;
        }
        else {
            hideError(detalleReclamoError);
            return true;
        }
    }

    // Añadir listeners para validación en tiempo real al salir del campo
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    claimTypeSelect.addEventListener('change', validateClaimType);
    claimDetailsTextarea.addEventListener('blur', validateClaimDetails);

    // Listener para el envío del formulario
    form.addEventListener('submit', function(event) {
        // Ejecutar todas las validaciones al enviar
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isClaimTypeValid = validateClaimType();
        const isClaimDetailsValid = validateClaimDetails();

        // Si alguna validación falla, prevenir el envío del formulario
        if (!isNameValid || !isEmailValid || !isPhoneValid || !isClaimTypeValid || !isClaimDetailsValid) {
            event.preventDefault();
            formSuccessMessage.style.display = 'none'; // Ocultar mensaje de éxito si hay errores
        } else {
            // Si todas las validaciones pasan, puedes simular un envío exitoso o mostrar un mensaje
            event.preventDefault(); // Por ahora, prevenimos el envío real para demostrar el JS

            // Simulación de envío exitoso
            formSuccessMessage.textContent = '¡Su reclamo ha sido enviado con éxito! Nos pondremos en contacto pronto.';
            formSuccessMessage.style.display = 'block';
            form.reset(); // Limpiar el formulario después del envío exitoso
            
            // Opcional: Deshabilitar el botón para evitar múltiples envíos
            const submitButton = form.querySelector('.submit-button');
            submitButton.disabled = true; 
            setTimeout(() => {
                submitButton.disabled = false; // Habilitar después de un tiempo o una acción
                formSuccessMessage.style.display = 'none'; // Ocultar el mensaje de éxito
            }, 5000); // Ocultar mensaje de éxito después de 5 segundos

            // En un entorno real, aquí enviarías los datos al servidor usando fetch() o XMLHttpRequest
            // fetch('procesar_reclamo.php', {
            //     method: 'POST',
            //     body: new FormData(form)
            // })
            // .then(response => response.json()) // O response.text()
            // .then(data => {
            //     console.log('Respuesta del servidor:', data);
            //     // Mostrar mensaje de éxito o error basado en la respuesta del servidor
            //     formSuccessMessage.textContent = '¡Su reclamo ha sido enviado con éxito!';
            //     formSuccessMessage.style.display = 'block';
            //     form.reset();
            // })
            // .catch(error => {
            //     console.error('Error al enviar el formulario:', error);
            //     // Mostrar mensaje de error al usuario
            //     alert('Hubo un error al enviar su reclamo. Por favor, intente de nuevo.');
            // });
        }
    });
});
