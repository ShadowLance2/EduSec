function validateNewForm() {
    var clientName = document.getElementById('client-name').value;
    var clientEmail = document.getElementById('client-email').value;
    var clientPhone = document.getElementById('client-phone').value;

    if (clientName.trim() === "") {
        alert("Введите имя");
        return false;
    }

    if (clientEmail.trim() === "" || !isValidEmail(clientEmail)) {
        alert("Введите действительный Email адрес");
        return false;
    }

    if (clientPhone.trim() === "" || !isValidPhone(clientPhone)) {
        alert("Введите действительный номер телефона");
        return false;
    }

    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\+[0-9]{11}$/.test(phone);
}
