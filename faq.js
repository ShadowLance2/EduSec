document.addEventListener('DOMContentLoaded', () => {
    function hashPassword(password) {
        return CryptoJS.SHA256(password).toString();
    }

    const faqList = document.getElementById('faq-list');
    const adminAddFaq = document.getElementById('admin-add-faq');
    const adminRemoveFaq = document.getElementById('admin-remove-faq');
    const currentUserSpan = document.getElementById('current-user');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Отображение текущего пользователя
    currentUserSpan.innerText = loggedInUser ? loggedInUser.username : 'anonymous';

    // Инициализация списка FAQ
    const faqs = JSON.parse(localStorage.getItem('faqs')) || [
        {
            question: "Как зарегистрироваться?",
            answer: "Для регистрации нажмите на кнопку 'Регистрация' в правом верхнем углу."
        },
        {
            question: "Как восстановить пароль?",
            answer: "Свяжитесь с администратором для восстановления пароля."
        },
        {
            question: "Какие услуги вы предлагаете?",
            answer: "Мы предлагаем консультации, аудит безопасности и тестирование на проникновение."
        }
    ];

    // Сохранение FAQ в localStorage
    localStorage.setItem('faqs', JSON.stringify(faqs));

    // Отображение FAQ
    faqs.forEach((faq, index) => {
        const div = document.createElement('div');
        div.className = 'list-group-item';
        div.innerHTML = `<strong>${index + 1}. ${faq.question}</strong><p>${faq.answer}</p>`;
        faqList.appendChild(div);
    });

    // Проверка на администратора
    if (loggedInUser && loggedInUser.username === 'admin') {
        adminAddFaq.style.display = 'block';
        adminRemoveFaq.style.display = 'block';
    }
});

function addFaq() {
    const newQuestion = document.getElementById('new-question').value.trim();
    const newAnswer = document.getElementById('new-answer').value.trim();
    if (newQuestion !== "" && newAnswer !== "") {
        const faqs = JSON.parse(localStorage.getItem('faqs')) || [];
        faqs.push({ question: newQuestion, answer: newAnswer });
        localStorage.setItem('faqs', JSON.stringify(faqs));
        location.reload();  // Перезагрузка страницы для обновления списка
    }
}

function removeFaq() {
    const removeIndex = parseInt(document.getElementById('remove-faq-number').value.trim()) - 1;
    const faqs = JSON.parse(localStorage.getItem('faqs')) || [];
    if (!isNaN(removeIndex) && removeIndex >= 0 && removeIndex < faqs.length) {
        faqs.splice(removeIndex, 1);
        localStorage.setItem('faqs', JSON.stringify(faqs));
        location.reload();  // Перезагрузка страницы для обновления списка
    } else {
        alert('Неверный номер вопроса');
    }
}
