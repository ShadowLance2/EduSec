document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    document.getElementById('user-list-link').addEventListener('click', (event) => {
        event.preventDefault();
        displayUsers();
        toggleModal('user-list-modal');
    });

    document.getElementById('close-user-list').addEventListener('click', () => toggleModal('user-list-modal'));

    if (currentUser && currentUser.username === 'admin') {
        document.getElementById('admin-user-functions').style.display = 'block';
        document.getElementById('delete-user-form').addEventListener('submit', (event) => {
            event.preventDefault();
            deleteUser();
        });
    }

    function displayUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        users.forEach((user, index) => {
            if (user.username !== 'admin') {
                const listItem = document.createElement('li');
                listItem.innerText = `${index + 1}. ${user.username}: ${user.description}`;
                userList.appendChild(listItem);
            }
        });
    }

    function deleteUser() {
        const userNumber = document.getElementById('user-number').value;

        if (userNumber && !isNaN(userNumber)) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const index = userNumber - 1;

            if (index >= 0 && index < users.length && users[index].username !== 'admin') {
                users.splice(index, 1);
                localStorage.setItem('users', JSON.stringify(users));
                displayUsers();
                alert('Пользователь удален успешно!');
                document.getElementById('delete-user-form').reset();
            } else {
                alert('Пользователь с таким номером не существует или является администратором.');
            }
        } else {
            alert('Пожалуйста, введите корректный номер пользователя.');
        }
    }
});

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}
