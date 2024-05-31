// Данные о проекте по умолчанию
const defaultAboutData = {
    title: "Школа информационной безопасности EduSec Kor&Ch",
    description: "Учебный проект по веб-разработке и информационной безопасности. Лэндинг сайта с простым и понятным дизайном для обучения ключевым навыкам."
};

// Сохранение данных в localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('aboutData')) {
        localStorage.setItem('aboutData', JSON.stringify(defaultAboutData));
    }

    // Обработчик для ссылки "О проекте" в навигации
    document.getElementById('about-link').addEventListener('click', (event) => {
        event.preventDefault();
        displayAboutData();
    });

    // Обработчик для ссылки "О проекте" в футере
    document.getElementById('about-link-footer').addEventListener('click', (event) => {
        event.preventDefault();
        displayAboutData();
    });

    // Обработчик для ссылки "Связаться с нами" в навигации
    document.getElementById('contact-link').addEventListener('click', (event) => {
        event.preventDefault();
        toggleModal('contact-modal');
    });

    // Обработчик для кнопки закрытия модального окна "О проекте"
    document.getElementById('close-about').addEventListener('click', () => {
        toggleModal('about-modal');
    });

    // Обработчик для кнопки закрытия модального окна "Связаться с нами"
    document.getElementById('close-contact').addEventListener('click', () => {
        toggleModal('contact-modal');
    });

    // Обработчик для кнопки закрытия модального окна "Админ"
    document.getElementById('close-admin').addEventListener('click', () => {
        toggleModal('admin-modal');
    });

    // Обработчик для формы "Связаться с нами"
    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        sendEmail();
    });

    // Обработчик для формы "Админ"
    document.getElementById('admin-form').addEventListener('submit', (event) => {
        event.preventDefault();
        saveAboutData();
    });

    // Обработчик для ссылки "Админ" в футере
    document.getElementById('admin-link-footer').addEventListener('click', (event) => {
        event.preventDefault();
        toggleModal('admin-modal');
    });
});

// Функция для отображения данных о проекте
function displayAboutData() {
    const aboutData = JSON.parse(localStorage.getItem('aboutData'));
    document.getElementById('about-title').innerText = aboutData.title;
    document.getElementById('about-text').innerText = aboutData.description;
    toggleModal('about-modal');
}

// Функция для открытия/закрытия модального окна
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Функция для отправки email с использованием EmailJS
function sendEmail() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send('service_rmgn02b', 'template_e9r6rws', templateParams)
        .then(response => {
            alert('Сообщение отправлено успешно!');
            toggleModal('contact-modal');
        }, error => {
            alert('Ошибка при отправке сообщения. Попробуйте позже.');
        });
}

// Функция для сохранения данных о проекте
function saveAboutData() {
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;

    const aboutData = { title, description };
    localStorage.setItem('aboutData', JSON.stringify(aboutData));

    alert('Данные о проекте сохранены!');
    toggleModal('admin-modal');
}
