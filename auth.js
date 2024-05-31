document.addEventListener('DOMContentLoaded', () => {
    function hashPassword(password) {
        return CryptoJS.SHA256(password).toString();
    }

    const defaultUser = {
        username: 'admin',
        password: hashPassword('admin'),
        description: 'Администратор'
    };

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([defaultUser]));
    }

    // Отображение текущего пользователя
    const currentUserSpan = document.getElementById('current-user');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    currentUserSpan.innerText = loggedInUser ? loggedInUser.username : 'anonymous';

    // Обработчики для модальных окон
    document.getElementById('register-link').addEventListener('click', (event) => {
        event.preventDefault();
        toggleModal('register-modal');
    });

    document.getElementById('login-link').addEventListener('click', (event) => {
        event.preventDefault();
        toggleModal('login-modal');
    });

    document.getElementById('user-list-link').addEventListener('click', (event) => {
        event.preventDefault();
        displayUserList();
        toggleModal('user-list-modal');
    });

    document.getElementById('close-register').addEventListener('click', () => toggleModal('register-modal'));
    document.getElementById('close-login').addEventListener('click', () => toggleModal('login-modal'));
    document.getElementById('close-user-list').addEventListener('click', () => toggleModal('user-list-modal'));

    // Регистрация пользователя
    document.getElementById('register-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const description = document.getElementById('register-description').value;
        const hashedPassword = hashPassword(password);

        const users = JSON.parse(localStorage.getItem('users'));
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Пользователь с таким логином уже существует.');
        } else {
            users.push({ username, password: hashedPassword, description });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Регистрация успешна!');
            toggleModal('register-modal');
        }
    });

    // Вход пользователя
    document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const hashedPassword = hashPassword(password);

        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(user => user.username === username && user.password === hashedPassword);

        if (user) {
            alert('Вход выполнен успешно!');
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            currentUserSpan.innerText = user.username;
            toggleModal('login-modal');
        } else {
            alert('Неправильный логин или пароль.');
        }
    });

    // Отображение списка пользователей
    function displayUserList() {
        const users = JSON.parse(localStorage.getItem('users'));
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        users.forEach(user => {
            if (user.username !== 'admin') {
                const listItem = document.createElement('li');
                listItem.innerText = `${user.username}: ${user.description}`;
                userList.appendChild(listItem);
            }
        });
    }
});

// Функция для открытия/закрытия модального окна
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}
