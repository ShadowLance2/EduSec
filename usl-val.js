function validateForm() {
    var serviceName = document.getElementById('service-name').value;
    var clientName = document.getElementById('client-name').value;
    var clientEmail = document.getElementById('client-email').value;
    var clientPhone = document.getElementById('client-phone').value;
    var contactTime = document.getElementById('contact-time').value;
    var paymentMethod = document.getElementById('payment-method').value;

    if (clientName.trim() === "") {
        alert("Пожалуйста, введите ваше имя.");
        return false;
    }

    if (clientEmail.trim() === "" || !isValidEmail(clientEmail)) {
        alert("Пожалуйста, введите действительный Email адрес.");
        return false;
    }

    if (clientPhone.trim() === "" || !isValidPhone(clientPhone)) {
        alert("Пожалуйста, введите действительный номер телефона.");
        return false;
    }

    if (contactTime.trim() === "" || !isValidTime(contactTime)) {
        alert("Пожалуйста, введите удобное время для связи.");
        return false;
    }

    if (paymentMethod === "") {
        alert("Пожалуйста, выберите способ оплаты.");
        return false;
    }

    // Показать конфетти
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        var timeLeft = end - Date.now();

        if (timeLeft <= 0) {
            return;
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti({
            particleCount: particleCount,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: particleCount,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        requestAnimationFrame(frame);
    }());

    alert('Форма успешно отправлена!');
    document.getElementById('service-order-form').reset();
    return false;  // Предотвращение отправки формы
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\+[0-9]{11}$/.test(phone);
}

function isValidTime(time) {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}