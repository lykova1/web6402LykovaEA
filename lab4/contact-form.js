document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Остановим отправку формы

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Валидация полей
    if (!name || !email || !phone) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email.');
        return;
    }

    // Валидация телефона
    const phoneRegex = /^(\+7|8)?\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Введите корректный номер телефона (пример: +79991234567).');
        return;
    }

    // Если все проверки пройдены, отправляем данные
    const formData = new FormData(event.target);
    try {
        const response = await fetch('http://localhost:3001/messages', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            alert('Сообщение успешно отправлено!');
        } else {
            alert('Ошибка отправки сообщения.');
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});
