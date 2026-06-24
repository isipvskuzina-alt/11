// ========================================
// 1. ДАННЫЕ
// ========================================

let transactions = [];

// ========================================
// 2. DOM ЭЛЕМЕНТЫ
// ========================================

const balanceDisplay = document.getElementById('balanceDisplay');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');
const transactionsList = document.getElementById('transactionsList');

const transactionType = document.getElementById('transactionType');
const transactionCategory = document.getElementById('transactionCategory');
const transactionAmount = document.getElementById('transactionAmount');
const transactionDate = document.getElementById('transactionDate');
const transactionDescription = document.getElementById('transactionDescription');
const addBtn = document.getElementById('addBtn');

// ========================================
// 3. LOCALSTORAGE
// ========================================

function loadTransactions() {
    try {
        const saved = localStorage.getItem('expenseTracker');
        if (saved) {
            transactions = JSON.parse(saved);
            return true;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
    return false;
}

function saveTransactions() {
    try {
        localStorage.setItem('expenseTracker', JSON.stringify(transactions));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

// ========================================
// 4. РАСЧЁТЫ
// ========================================

function calculateBalance() {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        const amount = Number(t.amount);
        if (t.type === 'income') {
            income += amount;
        } else {
            expense += amount;
        }
    });

    const balance = income - expense;
    return { balance, income, expense };
}

// ========================================
// 5. РЕНДЕРИНГ
// ========================================

function renderTransactions() {
    const { balance, income, expense } = calculateBalance();

    // Обновляем баланс
    balanceDisplay.textContent = balance.toLocaleString('ru-RU') + ' ₽';
    totalIncome.textContent = income.toLocaleString('ru-RU') + ' ₽';
    totalExpense.textContent = expense.toLocaleString('ru-RU') + ' ₽';

    // Цвет баланса
    if (balance > 0) {
        balanceDisplay.style.color = '#00b894';
    } else if (balance < 0) {
        balanceDisplay.style.color = '#fd79a8';
    } else {
        balanceDisplay.style.color = 'white';
    }

    // Список операций
    if (transactions.length === 0) {
        transactionsList.innerHTML = `
            <div class="empty">
                <span class="emoji">📭</span>
                <p>Нет операций</p>
                <p style="font-size:13px;color:#dfe6e9;">Добавьте первую запись!</p>
            </div>
        `;
        return;
    }

    // Сортируем от новых к старым
    const sorted = [...transactions].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    transactionsList.innerHTML = sorted.map((t, index) => {
        const originalIndex = transactions.indexOf(t);
        const amount = Number(t.amount);
        const sign = t.type === 'income' ? '+' : '-';
        const typeClass = t.type === 'income' ? 'income' : 'expense';
        const date = new Date(t.date);
        
        return `
            <div class="transaction-item">
                <div class="transaction-info">
                    <div class="category">${escapeHtml(t.category)}</div>
                    ${t.description ? `<div class="description">${escapeHtml(t.description)}</div>` : ''}
                    <div class="date">
                        <time datetime="${t.date}">${date.toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}</time>
                    </div>
                </div>
                <div class="transaction-amount ${typeClass}">
                    ${sign} ${amount.toLocaleString('ru-RU')} ₽
                </div>
                <button class="transaction-delete" onclick="deleteTransaction(${originalIndex})">✕</button>
            </div>
        `;
    }).join('');
}

// ========================================
// 6. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function clearForm() {
    transactionAmount.value = '';
    transactionDescription.value = '';
    transactionAmount.focus();
}

function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    transactionDate.value = today;
}

function updateCategories() {
    const type = transactionType.value;
    const categorySelect = transactionCategory;
    
    // Очищаем
    categorySelect.innerHTML = '';
    
    // Категории для доходов
    const incomeCategories = ['Зарплата', 'Фриланс', 'Подарки', 'Инвестиции', 'Другое'];
    
    // Категории для расходов
    const expenseCategories = ['Еда', 'Транспорт', 'Жильё', 'Развлечения', 'Здоровье', 'Одежда', 'Другое'];
    
    const categories = type === 'income' ? incomeCategories : expenseCategories;
    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

// ========================================
// 7. ДОБАВЛЕНИЕ (с валидацией)
// ========================================

function addTransaction() {
    // Получаем значения
    const type = transactionType.value;
    const category = transactionCategory.value;
    const amount = parseFloat(transactionAmount.value);
    const date = transactionDate.value;
    const description = transactionDescription.value.trim();

    // ===== ВАЛИДАЦИЯ =====
    
    // Проверка суммы
    if (!amount || amount <= 0) {
        alert('Введите сумму!');
        transactionAmount.focus();
        return;
    }

    // Проверка даты
    if (!date) {
        alert('Выберите дату!');
        transactionDate.focus();
        return;
    }

    // Ограничение для описания
    if (description.length > 200) {
        alert('Описание не должно превышать 200 символов');
        transactionDescription.focus();
        return;
    }

    // Создаём запись
    const transaction = {
        id: Date.now().toString(),
        type: type,
        category: category,
        amount: amount,
        date: date,
        description: description,
        createdAt: new Date().toISOString()
    };

    // Добавляем
    transactions.push(transaction);
    saveTransactions();
    renderTransactions();
    clearForm();
    
    console.log(` Добавлена операция: ${type} ${amount}₽ (${category})`);
}

// ========================================
// 8. УДАЛЕНИЕ
// ========================================

function deleteTransaction(index) {
    if (!confirm('Удалить запись?')) return;
    
    const t = transactions[index];
    transactions.splice(index, 1);
    saveTransactions();
    renderTransactions();
    
    console.log(` Удалена операция: ${t.type} ${t.amount}₽`);
}

// ========================================
// 9. ИНИЦИАЛИЗАЦИЯ
// ========================================

function init() {
    console.log(' Запуск трекера расходов');
    
    // Загружаем данные
    loadTransactions();
    
    // Устанавливаем сегодняшнюю дату
    setDefaultDate();
    
    // Обновляем категории
    updateCategories();
    
    // Рендерим
    renderTransactions();
    
    console.log(` Загружено операций: ${transactions.length}`);

    // Обработчики
    
    // Смена типа → обновляем категории
    transactionType.addEventListener('change', updateCategories);
    
    // Добавление
    addBtn.addEventListener('click', addTransaction);
    
    // Добавление по Ctrl+Enter
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            addTransaction();
        }
    });
    
    // Enter в поле суммы → перейти к описанию
    transactionAmount.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            transactionDescription.focus();
        }
    });
    
    // Enter в описании → добавить
    transactionDescription.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTransaction();
        }
    });

    console.log(' Трекер готов!');
}

// ========================================
// 10. ЗАПУСК
// ========================================

document.addEventListener('DOMContentLoaded', init);