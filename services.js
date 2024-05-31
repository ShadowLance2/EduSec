document.addEventListener('DOMContentLoaded', () => {
    const defaultServices = [
        { name: 'Консультация по безопасности', price: '5000 руб.' },
        { name: 'Аудит безопасности', price: '15000 руб.' },
        { name: 'Тестирование на проникновение', price: '20000 руб.' },
        { name: 'Летняя школа ИБ', price: '115000 руб.' },
        { name: 'Наставничество', price: 'Договорная' },
        { name: 'Доступ к авторским курсам', price: '25000 руб.' }
    ];

    if (!localStorage.getItem('services')) {
        localStorage.setItem('services', JSON.stringify(defaultServices));
    }

    const servicesList = document.getElementById('services-list');
    const adminFunctions = document.getElementById('admin-functions');
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    document.getElementById('services-link').addEventListener('click', (event) => {
        event.preventDefault();
        displayServices();
        toggleModal('services-modal');
    });

    document.getElementById('close-services').addEventListener('click', () => toggleModal('services-modal'));

    if (currentUser && currentUser.username === 'admin') {
        adminFunctions.style.display = 'block';
        document.getElementById('new-service-form').addEventListener('submit', (event) => {
            event.preventDefault();
            addService();
        });
        document.getElementById('delete-service-form').addEventListener('submit', (event) => {
            event.preventDefault();
            deleteService();
        });
    }

    function displayServices() {
        const services = JSON.parse(localStorage.getItem('services'));
        servicesList.innerHTML = '';
        services.forEach((service, index) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${index + 1}. ${service.name}: ${service.price}`;
            servicesList.appendChild(listItem);
        });
    }

    function addService() {
        const serviceName = document.getElementById('service-name').value;
        const servicePrice = document.getElementById('service-price').value;

        if (serviceName && servicePrice) {
            const services = JSON.parse(localStorage.getItem('services'));
            services.push({ name: serviceName, price: servicePrice });
            localStorage.setItem('services', JSON.stringify(services));
            displayServices();
            alert('Услуга добавлена успешно!');
            document.getElementById('new-service-form').reset();
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    }

    function deleteService() {
        const serviceNumber = document.getElementById('service-number').value;

        if (serviceNumber && !isNaN(serviceNumber)) {
            const services = JSON.parse(localStorage.getItem('services'));
            const index = serviceNumber - 1;

            if (index >= 0 && index < services.length) {
                services.splice(index, 1);
                localStorage.setItem('services', JSON.stringify(services));
                displayServices();
                alert('Услуга удалена успешно!');
                document.getElementById('delete-service-form').reset();
            } else {
                alert('Услуга с таким номером не существует.');
            }
        } else {
            alert('Пожалуйста, введите корректный номер услуги.');
        }
    }
});

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}
