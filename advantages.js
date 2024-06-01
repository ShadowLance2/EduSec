document.addEventListener('DOMContentLoaded', () => {
    function hashPassword(password) {
        return CryptoJS.SHA256(password).toString();
    }

    const advantagesList = document.getElementById('advantages-list');
    const adminAddAdvantage = document.getElementById('admin-add-advantage');
    const adminRemoveAdvantage = document.getElementById('admin-remove-advantage');
    const currentUserSpan = document.getElementById('current-user');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Отображение текущего пользователя
    currentUserSpan.innerText = loggedInUser ? loggedInUser.username : 'anonymous';

    // Инициализация списка преимуществ
    const advantages = JSON.parse(localStorage.getItem('advantages')) || [
        "Высококвалифицированные специалисты",
        "Современные методики обучения",
        "Индивидуальный подход к каждому клиенту"
    ];

    // Сохранение преимуществ в localStorage
    localStorage.setItem('advantages', JSON.stringify(advantages));

    // Отображение преимуществ
    advantages.forEach((advantage, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${advantage}`;
        li.className = 'list-group-item';
        advantagesList.appendChild(li);
    });

    // Проверка на администратора
    if (loggedInUser && loggedInUser.username === 'admin') {
        adminAddAdvantage.style.display = 'block';
        adminRemoveAdvantage.style.display = 'block';
    }
});

function addAdvantage() {
    const newAdvantage = document.getElementById('new-advantage').value.trim();
    if (newAdvantage !== "") {
        const advantages = JSON.parse(localStorage.getItem('advantages')) || [];
        advantages.push(newAdvantage);
        localStorage.setItem('advantages', JSON.stringify(advantages));
        location.reload();  // Перезагрузка страницы для обновления списка
    }
}

function removeAdvantage() {
    const removeIndex = parseInt(document.getElementById('remove-advantage-number').value.trim()) - 1;
    const advantages = JSON.parse(localStorage.getItem('advantages')) || [];
    if (!isNaN(removeIndex) && removeIndex >= 0 && removeIndex < advantages.length) {
        advantages.splice(removeIndex, 1);
        localStorage.setItem('advantages', JSON.stringify(advantages));
        location.reload();  // Перезагрузка страницы для обновления списка
    } else {
        alert('Неверный номер преимущества');
    }
}
