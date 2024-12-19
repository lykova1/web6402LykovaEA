async function loadCaloriesData() {
    try {
        const response = await fetch('http://localhost:3001/calories');
        const tableBody = document.querySelector('#caloriesTable tbody');
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const data = await response.json();
        const caloriesData = data.calories || data.get?.calories; // Извлекаем массив из объекта
        if (!caloriesData) throw new Error('Не удалось найти данные о калориях');
        caloriesData.forEach((item) => {
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td class = "align-right">${item.energy}</td>
                    <td class="align-center">${item.protein}</td>
                    <td class="align-center">${item.fat}</td>
                    <td class="align-center">${item.carbohydrates}</td>
                    <td>${item.weight}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

    } catch (error) {
        alert(`Произошла ошибка: ${error.message}`);
    }
}

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', loadCaloriesData);